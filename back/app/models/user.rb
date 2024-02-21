class User < ApplicationRecord
  has_one :profile
  has_many :favorite_cosmetics
end
