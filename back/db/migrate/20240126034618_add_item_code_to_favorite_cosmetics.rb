class AddItemCodeToFavoriteCosmetics < ActiveRecord::Migration[7.0]
  def change
    add_column :favorite_cosmetics, :item_code, :string
    add_index :favorite_cosmetics, [:user_id, :item_code], unique: true
  end
end
