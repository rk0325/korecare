class AddNotNullToCosmeticUsages < ActiveRecord::Migration[7.0]
  def change
    change_column :cosmetic_usages, :item_type, :integer, null: false
    change_column :cosmetic_usages, :open_date, :date, null: false
    change_column :cosmetic_usages, :expiry_date, :date, null: false
  end
end
