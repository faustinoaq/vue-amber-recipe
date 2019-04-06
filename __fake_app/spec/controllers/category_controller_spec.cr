require "./spec_helper"

def category_hash
  {"title" => "Fake"}
end

def category_params
  params = [] of String
  params << "title=#{category_hash["title"]}"
  params.join("&")
end

def create_category
  model = Category.new(category_hash)
  model.save
  model
end

class CategoryControllerTest < GarnetSpec::Controller::Test
  getter handler : Amber::Pipe::Pipeline

  def initialize
    @handler = Amber::Pipe::Pipeline.new
    @handler.build :web do
      plug Amber::Pipe::Error.new
      plug Amber::Pipe::Session.new
      plug Amber::Pipe::Flash.new
    end
    @handler.prepare_pipelines
  end
end

describe CategoryControllerTest do
  subject = CategoryControllerTest.new

  it "renders category index template" do
    Category.clear
    response = subject.get "/categories"

    response.status_code.should eq(200)
    response.body.should contain("categories")
  end

  it "renders category show template" do
    Category.clear
    model = create_category
    location = "/categories/#{model.id}"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("id") # Show view is rendered on front-end by Vue.js
  end

  it "renders category new template" do
    Category.clear
    location = "/categories/new"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("csrf") # CSRF Token used by new form rendered on front-end by Vue.js
  end

  it "renders category edit template" do
    Category.clear
    model = create_category
    location = "/categories/#{model.id}/edit"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("category")
  end

  it "creates a category" do
    Category.clear
    response = subject.post "/categories", body: category_params

    p! response.body
    response.status_code.should eq(200)
    response.body.should contain("Created")
  end

  it "updates a category" do
    Category.clear
    model = create_category
    response = subject.patch "/categories/#{model.id}", body: category_params

    response.status_code.should eq(200)
    response.body.should contain("Updated")
  end

  it "deletes a category" do
    Category.clear
    model = create_category
    response = subject.delete "/categories/#{model.id}"

    response.status_code.should eq(200)
  end
end
