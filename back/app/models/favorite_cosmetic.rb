class FavoriteCosmetic < ApplicationRecord
  belongs_to :user
  validates :item_code, presence: true
  validates :user_id, uniqueness: { scope: :item_code }
end
