# frozen_string_literal: true

class FavoriteCosmetic < ApplicationRecord
  belongs_to :user
  has_many :review

  validates :item_code, presence: true
  validates :item_code, uniqueness: { scope: :user_id }
end
