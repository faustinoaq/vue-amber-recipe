class Comment < Granite::Base
  adapter sqlite
  table_name comments
  
  belongs_to :product
  # id : Int64 primary key is created for you
  field body : String
end
