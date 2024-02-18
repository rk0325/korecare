class WeatherNotificationJob < ApplicationJob
  queue_as :default

  # リトライ回数を1回に設定
  sidekiq_options retry: 3

  # リトライ間隔を1分後に設定
  sidekiq_retry_in do |count|
    60
  end

  def perform
    # すべてのユーザーを対象にループ
    User.includes(:profile).find_each do |user|
      next unless user.profile # プロファイルが存在しない場合はスキップ

      # ユーザーのプロファイルから都道府県名を取得
      prefecture_name = user.profile.prefecture

      # 天気情報の取得
      weather_info = WeatherService.fetch_weather_data(prefecture_name)
      # weather_infoの値をログに出力
      Rails.logger.debug "Fetched weather_info: #{weather_info.inspect}"

      if weather_info.blank?
        Rails.logger.error "weather_info is nil or empty for prefecture: #{prefecture_name}"
        next
      end

      message = WeatherMessageGenerator.generate_message(prefecture_name, weather_info)
      # 生成されたメッセージをログに出力
      Rails.logger.debug "Generated message: #{message}"

      # LINE通知の送信
      LineNotifyService.send_message(user.line_id, message) if user.line_id.present?
    end
  end
end