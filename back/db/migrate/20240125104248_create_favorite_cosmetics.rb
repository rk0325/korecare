class CreateFavoriteCosmetics < ActiveRecord::Migration[7.0]
  def change
    create_table :favorite_cosmetics do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.string :brand
      t.string :price
      t.string :item_url
      t.string :image_url

      t.timestamps
    end
  end
end
