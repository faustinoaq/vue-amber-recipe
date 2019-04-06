class Product < Granite::Base
  adapter sqlite
  table_name products
  
  belongs_to :category
  # id : Int64 primary key is created for you
  field title : String
  field description : String
end
