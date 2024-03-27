# frozen_string_literal: true

class CreateCosmeticUsages < ActiveRecord::Migration[7.0]
  def change
    create_table :cosmetic_usages do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :item_type
      t.date :open_date
      t.date :expiry_date

      t.timestamps
    end
  end
end
