class Address < ApplicationRecord
  has_many :profiles
  validates :address, uniqueness: true
end
