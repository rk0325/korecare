# frozen_string_literal: true

class RemoveNullFalseFromFields < ActiveRecord::Migration[7.0]
  def change
    change_column_null :reviews, :favorite_cosmetic_id, true
    change_column_null :reviews, :profile_id, true
    change_column_null :reviews, :user_id, true
  end
end
