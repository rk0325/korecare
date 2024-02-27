class AddMenuPositionToProfiles < ActiveRecord::Migration[7.0]
  def change
    add_column :profiles, :menu_position, :string, default: 'left'
  end
end
