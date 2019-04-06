class CommentController < ApplicationController
  @comment = Comment.new

  before_action do
    only [:show, :edit, :destroy] do
      @comment = Comment.find! params["id"]
    rescue ex
      message = {
        flash: {danger: ex.message},
      }
      respond_with 500 do
        json message.to_json
        html render "home/spa.slang"
      end
    end
  end

  def index
    data = {
      comments: Comment.all,
      csrf:  csrf_token,
    }
    respond_with do
      json data.to_json
      html render "home/spa.slang"
    end
  end

  def show
    data = {
      comment: @comment,
      csrf:     csrf_token,
    }
    respond_with do
      json data.to_json
      html render "home/spa.slang"
    end
  end

  def new
    respond_with do
      json csrf: csrf_token
      html render "home/spa.slang"
    end
  end

  def create
    comment = Comment.new(comment_params.validate!)
    if comment.save
      message = {
        flash: {success: "Created Comment successfully."},
      }
      respond_with do
        json message.to_json
      end
    else
      raise "Could not create comment!"
    end
  rescue ex
    message = {
      flash: {danger: ex.message},
      errors: comment.try(&.errors.map(&.to_s))
    }
    respond_with 500 do
      json message.to_json
    end
  end

  def edit
    show
  end

  def update
    valid_params = comment_params.validate!
    comment = Comment.find! params["id"]
    comment.set_attributes(valid_params)
    if comment.save
      message = {
        flash: {success: "Updated Comment successfully."},
      }
      respond_with do
        json message.to_json
      end
    else
      raise "Could not update comment!"
    end
  rescue ex
    message = {
      flash: {danger: ex.message},
      errors: comment.try(&.errors.map(&.to_s))
    }
    respond_with 500 do
      json message.to_json
    end
  end

  def destroy
    @comment.destroy
  end

  def comment_params
    params.validation do
      required(:body) do |body|
        if body.nil?
          false # validation fails
        else
          true # validation pass
        end
      end
      required(:product_id) do |product|
        if product.nil?
          false # validation fails
        else
          true # validation pass
        end
      end
    end
  end
end
