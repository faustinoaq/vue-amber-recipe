class ItemController < ApplicationController
  @item = Item.new

  before_action do
    only [:show, :edit, :destroy] do
      @item = Item.find! params["id"]
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
      items: Item.all,
      csrf:  csrf_token,
    }
    respond_with do
      json data.to_json
      html render "home/spa.slang"
    end
  end

  def show
    data = {
      item: @item,
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
    item = Item.new(item_params.validate!)
    if item.save
      message = {
        flash: {success: "Created Item successfully."},
      }
      respond_with do
        json message.to_json
      end
    else
      raise "Could not create item!"
    end
  rescue ex
    message = {
      flash: {danger: ex.message},
      errors: item.try(&.errors.map(&.to_s))
    }
    respond_with 500 do
      json message.to_json
    end
  end

  def edit
    show
  end

  def update
    valid_params = item_params.validate!
    item = Item.find! params["id"]
    item.set_attributes(valid_params)
    if item.save
      message = {
        flash: {success: "Updated Item successfully."},
      }
      respond_with do
        json message.to_json
      end
    else
      raise "Could not update item!"
    end
  rescue ex
    message = {
      flash: {danger: ex.message},
      errors: item.try(&.errors.map(&.to_s))
    }
    respond_with 500 do
      json message.to_json
    end
  end

  def destroy
    @item.destroy
  end

  def item_params
    params.validation do
      required(:enabled) do |enabled|
        if enabled.nil?
          false # validation fails
        else
          true # validation pass
        end
      end
    end
  end
end
