#bin/rails generate model Picksdata quarter_id:integer quarter_name:string ...

class CreatePicksdata < ActiveRecord::Migration[8.0]
    def change
        create_table :picksdata do |t|
            t.integer :quarter_id
            t.string :quarter_name
            t.timestamps
        end
    end
end


#Can do this vvv
#store(dev)> picksdata = Picksdata.new(quarter_id: 0, quarter_name: "WQ24") #Makes a new entry
#store(dev)> picksdata.save #Saves the db (INSERT SQL function)

#Or just this vvv
# SQL: INSERT
#store(dev)> Picksdata.create(quarter_id: 0, quarter_name: "WQ24") #Makes new entry and saves

# SQL: SELECT *
#store(dev)> Picksdata.all # Gives you back all of the data entries (SELECT SQL function)

# SQL: SELECT ... WHERE ...
#store(dev)> Picksdata.where(quarter_name: "WQ24") # Gives me back only when the Quarter is WQ24

#SQL: ORDER
#store(dev)> Picksdata.order(quarter_name: :asc)

#SQL: WHERE "id" = 1 LIMIT 1
#store(dev)> Picksdata.find(1)




#UPDATING RECORDS
#1) Using .update
#store(dev)> picksdata = Picksdata.find(1) 
#store(dev)> picksdata.update(quarter_name: "SQ24")

#2) Assigning attributes directly
#store(dev)> picksdata = Picksdata.find(1) #Or any ID number
#store(dev)> picksdata = "SQ24"
#store(dev)> picksdata.save


#DELETING RECORDS
#store(dev)> picksdata.destroy # Deletes the first entry in our database


#VALIDATIONS - ensure data is inserted into db adheres to rules
#This ensures that every entry must have a quarter_name field
class Picksdata < ApplicationRecord
    validates :quarter_name, presence: true
end

#If console is running when you make updates, you need to manually reload
#store(dev)> reload!

#If I tried to do the following, it'd return false 
#store(dev)> picksdata = Picksdata.new
#store(dev)> picksdata.save
#=> false

# You can ask it why it failed:
#store(dev)> picksdata.errors
# => #<ActiveModel::Errors [#<ActiveModel::Error attribute=quarter_name, type=blank, options={}>]>

# You can ask it why it failed in a friendlier way by saying:
#store(dev)> picksdata.errors.full_messages
#=> ["Name can't be blank"]

# To leave the console:
#exit






