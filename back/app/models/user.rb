class User < ApplicationRecord
  has_one :profile
  has_one :addresses
  has_many :favorite_cosmetics
  validates :email, uniqueness: true
end
