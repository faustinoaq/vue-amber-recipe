class Data < Granite::Base
  adapter sqlite
  table_name data
  
  # id : Int64 primary key is created for you
  field title : String
  field body : String
end
