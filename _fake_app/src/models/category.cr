class Category < Granite::Base
  adapter sqlite
  table_name categories
  
  # id : Int64 primary key is created for you
  field title : String

  validate_min_length :title, 5
end
