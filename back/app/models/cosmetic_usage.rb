class CosmeticUsage < ApplicationRecord
  belongs_to :user

  enum item_type: { lotion: 0, serum: 1, cream: 2 }
end
