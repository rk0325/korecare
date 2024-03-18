class Review < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :favorite_cosmetic, optional: true
  belongs_to :profile, optional: true

  has_many :review_tags
  has_many :tags, through: :review_tags

  enum rating: { very_bad: 1, bad: 2, medium: 3, good: 4, very_good: 5 }
  enum age: { '10代': 10, '20代': 20, '30代': 30, '40代': 40, '50代': 50, '60代以上': 60 }
end
