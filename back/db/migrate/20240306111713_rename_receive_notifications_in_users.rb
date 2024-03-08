class RenameReceiveNotificationsInUsers < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :receive_notifications, :receive_notifications_weather
  end
end
