# frozen_string_literal: true

class FixUserIdInAddresses < ActiveRecord::Migration[7.0]
  def up
    return if column_exists?(:addresses, :user_id)

    add_reference :addresses, :user, index: true, foreign_key: true
  end

  def down
    remove_reference :addresses, :user, index: true, foreign_key: true if column_exists?(:addresses, :user_id)
  end
end
