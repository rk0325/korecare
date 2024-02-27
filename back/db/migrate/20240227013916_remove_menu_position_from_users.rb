class RemoveMenuPositionFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :menu_position, :string, default: 'left'
  end
end
