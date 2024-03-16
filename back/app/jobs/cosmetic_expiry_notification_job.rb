class CosmeticExpiryNotificationJob < ApplicationJob
  queue_as :default

  sidekiq_retry_in do |count|
    60
  end

  def perform
    CosmeticExpiryNotificationService.send_notification
  end
end