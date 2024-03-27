# frozen_string_literal: true

class CosmeticUsage < ApplicationRecord
  belongs_to :user

  validates :item_type, presence: true
  validates :open_date, presence: true
  validates :expiry_date, presence: true

  enum item_type: { lotion: 0, serum: 1, cream: 2 }
end
