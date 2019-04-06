class Item < Granite::Base
  adapter sqlite
  table_name items
  
  # id : Int64 primary key is created for you
  field enabled : Int64
end
