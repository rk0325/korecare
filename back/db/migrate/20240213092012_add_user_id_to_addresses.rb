# frozen_string_literal: true

class AddUserIdToAddresses < ActiveRecord::Migration[7.0]
  def change
    add_reference :addresses, :user, foreign_key: true
  end
end
