class AddLineIdToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :line_id, :string, unique: true
    add_index :users, :line_id, unique: true
  end
end
