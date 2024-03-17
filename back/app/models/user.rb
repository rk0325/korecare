class User < ApplicationRecord
  has_one :profile
  has_many :favorite_cosmetics
  has_many :cosmetic_usages, dependent: :destroy
  has_many :reviews

  validates :uid, uniqueness: { scope: :provider }
end
