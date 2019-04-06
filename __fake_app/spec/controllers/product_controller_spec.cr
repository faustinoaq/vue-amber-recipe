require "./spec_helper"

def product_hash
  {"title" => "Fake", "description" => "Fake", "category_id" => "1"}
end

def product_params
  params = [] of String
  params << "title=#{product_hash["title"]}"
  params << "description=#{product_hash["description"]}"
  params << "category_id=#{product_hash["category_id"]}"
  params.join("&")
end

def create_product
  model = Product.new(product_hash)
  model.save
  model
end

class ProductControllerTest < GarnetSpec::Controller::Test
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

describe ProductControllerTest do
  subject = ProductControllerTest.new

  it "renders product index template" do
    Product.clear
    response = subject.get "/products"

    response.status_code.should eq(200)
    response.body.should contain("products")
  end

  it "renders product show template" do
    Product.clear
    model = create_product
    location = "/products/#{model.id}"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("id") # Show view is rendered on front-end by Vue.js
  end

  it "renders product new template" do
    Product.clear
    location = "/products/new"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("csrf") # CSRF Token used by new form rendered on front-end by Vue.js
  end

  it "renders product edit template" do
    Product.clear
    model = create_product
    location = "/products/#{model.id}/edit"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("product")
  end

  it "creates a product" do
    Product.clear
    response = subject.post "/products", body: product_params

    p! response.body
    response.status_code.should eq(200)
    response.body.should contain("Created")
  end

  it "updates a product" do
    Product.clear
    model = create_product
    response = subject.patch "/products/#{model.id}", body: product_params

    response.status_code.should eq(200)
    response.body.should contain("Updated")
  end

  it "deletes a product" do
    Product.clear
    model = create_product
    response = subject.delete "/products/#{model.id}"

    response.status_code.should eq(200)
  end
end
