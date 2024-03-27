# frozen_string_literal: true

class AllowNullInUsers < ActiveRecord::Migration[7.0]
  def change
    change_column_null :users, :provider, true
    change_column_null :users, :uid, true
    change_column_null :users, :name, true
    # change_column_null :users, :email, true
  end
end
