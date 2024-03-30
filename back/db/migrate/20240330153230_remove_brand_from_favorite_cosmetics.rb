class RemoveBrandFromFavoriteCosmetics < ActiveRecord::Migration[7.0]
  def change
    remove_column :favorite_cosmetics, :brand, :string
  end
end
