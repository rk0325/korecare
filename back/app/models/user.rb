class User < ApplicationRecord
  has_one :profile
  has_many :favorite_cosmetics
  has_many :addresses

  validates :email, uniqueness: true
  validates :line_id, uniqueness: true, allow_nil: true
end
