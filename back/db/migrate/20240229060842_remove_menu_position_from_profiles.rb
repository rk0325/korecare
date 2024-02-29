class RemoveMenuPositionFromProfiles < ActiveRecord::Migration[7.0]
  def change
    remove_column :profiles, :menu_position, :string
  end
end
