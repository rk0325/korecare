class Address < ApplicationRecord
  has_many :profiles
  belongs_to :user
end
