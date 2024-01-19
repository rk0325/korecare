class RenamePreferencesToSkinInformation < ActiveRecord::Migration[7.0]
  def change
    rename_table :preferences, :skin_information
  end
end
