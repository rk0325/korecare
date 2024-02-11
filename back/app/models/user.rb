class User < ApplicationRecord
  has_one :profile
  has_many :addresses
  has_many :favorite_cosmetics

  validates :email, uniqueness: true
  validates :provider, uniqueness: true
  validates :uid, uniqueness: true
  validates :line_id, uniqueness: true, allow_nil: true
end
