require "./spec_helper"

def item_hash
  {"enabled" => "1"}
end

def item_params
  params = [] of String
  params << "enabled=#{item_hash["enabled"]}"
  params.join("&")
end

def create_item
  model = Item.new(item_hash)
  model.save
  model
end

class ItemControllerTest < GarnetSpec::Controller::Test
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

describe ItemControllerTest do
  subject = ItemControllerTest.new

  it "renders item index template" do
    Item.clear
    response = subject.get "/items"

    response.status_code.should eq(200)
    response.body.should contain("items")
  end

  it "renders item show template" do
    Item.clear
    model = create_item
    location = "/items/#{model.id}"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("id") # Show view is rendered on front-end by Vue.js
  end

  it "renders item new template" do
    Item.clear
    location = "/items/new"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("csrf") # CSRF Token used by new form rendered on front-end by Vue.js
  end

  it "renders item edit template" do
    Item.clear
    model = create_item
    location = "/items/#{model.id}/edit"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("item")
  end

  it "creates a item" do
    Item.clear
    response = subject.post "/items", body: item_params

    p! response.body
    response.status_code.should eq(200)
    response.body.should contain("Created")
  end

  it "updates a item" do
    Item.clear
    model = create_item
    response = subject.patch "/items/#{model.id}", body: item_params

    response.status_code.should eq(200)
    response.body.should contain("Updated")
  end

  it "deletes a item" do
    Item.clear
    model = create_item
    response = subject.delete "/items/#{model.id}"

    response.status_code.should eq(200)
  end
end
