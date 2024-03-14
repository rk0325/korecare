class CosmeticExpiryNotificationJob < ApplicationJob
  queue_as :default

  sidekiq_retry_in do |count|
    60
  end

  def perform
    User.find_each do |user|
      next unless user.receive_notifications_expiration_date

      CosmeticExpiryNotificationService.send_notification(user)
    end
  end
end