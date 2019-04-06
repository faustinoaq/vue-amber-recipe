class ProductController < ApplicationController
  @product = Product.new

  before_action do
    only [:show, :edit, :destroy] do
      @product = Product.find! params["id"]
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
      products: Product.all,
      csrf:  csrf_token,
    }
    respond_with do
      json data.to_json
      html render "home/spa.slang"
    end
  end

  def show
    data = {
      product: @product,
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
    product = Product.new(product_params.validate!)
    if product.save
      message = {
        flash: {success: "Created Product successfully."},
      }
      respond_with do
        json message.to_json
      end
    else
      raise "Could not create product!"
    end
  rescue ex
    message = {
      flash: {danger: ex.message},
      errors: product.try(&.errors.map(&.to_s))
    }
    respond_with 500 do
      json message.to_json
    end
  end

  def edit
    show
  end

  def update
    valid_params = product_params.validate!
    product = Product.find! params["id"]
    product.set_attributes(valid_params)
    if product.save
      message = {
        flash: {success: "Updated Product successfully."},
      }
      respond_with do
        json message.to_json
      end
    else
      raise "Could not update product!"
    end
  rescue ex
    message = {
      flash: {danger: ex.message},
      errors: product.try(&.errors.map(&.to_s))
    }
    respond_with 500 do
      json message.to_json
    end
  end

  def destroy
    @product.destroy
  end

  def product_params
    params.validation do
      required(:title) do |title|
        if title.nil?
          false # validation fails
        else
          true # validation pass
        end
      end
      required(:description) do |description|
        if description.nil?
          false # validation fails
        else
          true # validation pass
        end
      end
      required(:category_id) do |category|
        if category.nil?
          false # validation fails
        else
          true # validation pass
        end
      end
    end
  end
end
