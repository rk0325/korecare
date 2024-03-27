# frozen_string_literal: true

class Profile < ApplicationRecord
  belongs_to :user
  belongs_to :address

  has_many :reviews, dependent: :destroy

  enum age: { '10代': 10, '20代': 20, '30代': 30, '40代': 40, '50代': 50, '60代以上': 60 }
end
