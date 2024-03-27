# frozen_string_literal: true

class AddMenuPositionToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :menu_position, :string, default: 'left'
  end
end
