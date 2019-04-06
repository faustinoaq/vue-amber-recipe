require "./spec_helper"

def comment_hash
  {"body" => "Fake", "product_id" => "1"}
end

def comment_params
  params = [] of String
  params << "body=#{comment_hash["body"]}"
  params << "product_id=#{comment_hash["product_id"]}"
  params.join("&")
end

def create_comment
  model = Comment.new(comment_hash)
  model.save
  model
end

class CommentControllerTest < GarnetSpec::Controller::Test
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

describe CommentControllerTest do
  subject = CommentControllerTest.new

  it "renders comment index template" do
    Comment.clear
    response = subject.get "/comments"

    response.status_code.should eq(200)
    response.body.should contain("comments")
  end

  it "renders comment show template" do
    Comment.clear
    model = create_comment
    location = "/comments/#{model.id}"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("id") # Show view is rendered on front-end by Vue.js
  end

  it "renders comment new template" do
    Comment.clear
    location = "/comments/new"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("csrf") # CSRF Token used by new form rendered on front-end by Vue.js
  end

  it "renders comment edit template" do
    Comment.clear
    model = create_comment
    location = "/comments/#{model.id}/edit"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("comment")
  end

  it "creates a comment" do
    Comment.clear
    response = subject.post "/comments", body: comment_params

    p! response.body
    response.status_code.should eq(200)
    response.body.should contain("Created")
  end

  it "updates a comment" do
    Comment.clear
    model = create_comment
    response = subject.patch "/comments/#{model.id}", body: comment_params

    response.status_code.should eq(200)
    response.body.should contain("Updated")
  end

  it "deletes a comment" do
    Comment.clear
    model = create_comment
    response = subject.delete "/comments/#{model.id}"

    response.status_code.should eq(200)
  end
end
