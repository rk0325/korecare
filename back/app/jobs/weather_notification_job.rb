class WeatherNotificationJob < ApplicationJob
  queue_as :default

  sidekiq_options retry: 1

  sidekiq_retry_in do |count|
    60
  end

  def perform
    User.includes(:profile).find_each do |user|
      next unless user.profile

      prefecture_name = user.profile.prefecture

      if prefecture_name.blank?
        next
      end

      weather_info = WeatherService.fetch_weather_data(prefecture_name)

      if weather_info.blank?
        next
      end

      message = WeatherMessageGenerator.generate_message(prefecture_name, weather_info)

      LineNotifyService.send_message(user.uid, message) if user.uid.present?
    end
  end
end
