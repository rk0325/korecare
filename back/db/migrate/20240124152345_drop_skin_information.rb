class DropSkinInformation < ActiveRecord::Migration[7.0]
  def change
    drop_table :skin_information
  end
end
