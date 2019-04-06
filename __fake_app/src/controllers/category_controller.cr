class CategoryController < ApplicationController
  @category = Category.new

  before_action do
    only [:show, :edit, :destroy] do
      @category = Category.find! params["id"]
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
      categories: Category.all,
      csrf:  csrf_token,
    }
    respond_with do
      json data.to_json
      html render "home/spa.slang"
    end
  end

  def show
    data = {
      category: @category,
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
    category = Category.new(category_params.validate!)
    if category.save
      message = {
        flash: {success: "Created Category successfully."},
      }
      respond_with do
        json message.to_json
      end
    else
      raise "Could not create category!"
    end
  rescue ex
    message = {
      flash: {danger: ex.message},
      errors: category.try(&.errors.map(&.to_s))
    }
    respond_with 500 do
      json message.to_json
    end
  end

  def edit
    show
  end

  def update
    valid_params = category_params.validate!
    category = Category.find! params["id"]
    category.set_attributes(valid_params)
    if category.save
      message = {
        flash: {success: "Updated Category successfully."},
      }
      respond_with do
        json message.to_json
      end
    else
      raise "Could not update category!"
    end
  rescue ex
    message = {
      flash: {danger: ex.message},
      errors: category.try(&.errors.map(&.to_s))
    }
    respond_with 500 do
      json message.to_json
    end
  end

  def destroy
    @category.destroy
  end

  def category_params
    params.validation do
      required(:title) do |title|
        if title.nil?
          false # validation fails
        else
          true # validation pass
        end
      end
    end
  end
end
