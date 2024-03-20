class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :favorite_cosmetic_id, :rating, :title, :body, :visibility, :created_at, :updated_at, :profile_id, :age, :skin_type, :skin_trouble

  belongs_to :user
  belongs_to :favorite_cosmetic

  attribute :user_name do
    object.user&.name
  end
end