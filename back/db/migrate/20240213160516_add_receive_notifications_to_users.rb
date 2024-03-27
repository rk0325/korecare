# frozen_string_literal: true

class AddReceiveNotificationsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :receive_notifications, :boolean, default: false
  end
end
