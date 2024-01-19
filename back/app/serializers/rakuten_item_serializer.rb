class RakutenItemSerializer < ActiveModel::Serializer
  attributes :itemName, :itemPrice, :itemUrl, :mediumImageUrls, :shopName, :smallImageUrls
end
