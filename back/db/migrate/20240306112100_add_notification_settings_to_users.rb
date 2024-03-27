# frozen_string_literal: true

class AddNotificationSettingsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :receive_notifications_expiration_date, :boolean, default: false
  end
end
