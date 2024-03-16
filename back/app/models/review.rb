class Review < ApplicationRecord
  belongs_to :user
  belongs_to :favorite_cosmetic

  has_many :review_tags
  has_many :tags, through: :review_tags

  enum rating: { very_bad: 1, bad: 2, average: 3, good: 4, very_good: 5 }
end
