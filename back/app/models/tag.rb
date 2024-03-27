# frozen_string_literal: true

class Tag < ApplicationRecord
  has_many :review_tags
  has_many :reviews, through: :review_tags
end
