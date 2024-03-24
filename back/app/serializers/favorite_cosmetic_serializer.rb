class FavoriteCosmeticSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :price, :item_url, :image_url, :item_code
end