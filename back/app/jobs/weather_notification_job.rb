class WeatherNotificationJob < ApplicationJob
  queue_as :default

  # リトライ回数を1回に設定
  sidekiq_options retry: 1

  # リトライ間隔を1分後に設定
  sidekiq_retry_in do |count|
    60
  end

  def perform
    # すべてのユーザーを対象にループ
    User.includes(:profile).find_each do |user|
      next unless user.profile # プロフィールが存在しない場合はスキップ

      # ユーザーのプロフィールから都道府県名を取得
      prefecture_name = user.profile.prefecture
      Rails.logger.debug "ユーザー #{user.id} の都道府県: #{prefecture_name}"

      # 天気情報の取得
      weather_info = WeatherService.fetch_weather_data(prefecture_name)
      Rails.logger.debug "ユーザー #{user.id} の天気情報: #{weather_info.inspect}"

      if weather_info.blank?
        Rails.logger.error "ユーザー #{user.id} の weather_info が nil または空: #{prefecture_name}"
        next
      end

      message = WeatherMessageGenerator.generate_message(prefecture_name, weather_info)
      Rails.logger.debug "ユーザー #{user.id} に送信されるメッセージ: #{message}"

      # LINE通知の送信
      LineNotifyService.send_message(user.line_id, message) if user.line_id.present?
    end
  end
end
