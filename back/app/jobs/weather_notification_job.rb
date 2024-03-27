# frozen_string_literal: true

class WeatherNotificationJob < ApplicationJob
  queue_as :default

  sidekiq_options retry: 1

  sidekiq_retry_in do |_count|
    60
  end

  def perform
    User.includes(:profile).find_each do |user|
      next unless user.profile
      next unless user.receive_notifications_weather

      prefecture_name = user.profile.prefecture
      next if prefecture_name.blank?

      weather_info = WeatherService.fetch_weather_data(prefecture_name)
      next if weather_info.blank?

      message = WeatherMessageGenerator.generate_message(prefecture_name, weather_info)
      LineNotifyService.send_message(user.uid, message) if user.uid.present?
    end
  end
end
