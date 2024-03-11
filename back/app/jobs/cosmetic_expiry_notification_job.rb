class CosmeticExpiryNotificationJob < ApplicationJob
  queue_as :default

  def perform
    CosmeticExpiryNotificationService.send_notification
  end
end