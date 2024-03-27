# frozen_string_literal: true

class AddIndexToProviderAndUidInUsers < ActiveRecord::Migration[7.0]
  def change
    add_index :users, %i[provider uid], unique: true
  end
end
