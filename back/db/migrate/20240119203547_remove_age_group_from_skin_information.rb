class RemoveAgeGroupFromSkinInformation < ActiveRecord::Migration[7.0]
  def change
    remove_column :skin_information, :age_group
  end
end
