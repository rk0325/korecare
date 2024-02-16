class WeatherNotificationJob < ApplicationJob
  queue_as :default

  # リトライ回数を1回に設定
  sidekiq_options retry: 1

  # リトライ間隔を3分後に設定
  sidekiq_retry_in do |count|
    180 # 秒単位で指定（3分 = 180秒）
  end

  def perform
    # すべてのユーザーを対象にループ
    User.includes(:profile).find_each do |user|
      next unless user.profile # プロファイルが存在しない場合はスキップ

      # ユーザーのプロファイルから都道府県名を取得
      prefecture_name = user.profile.prefecture

      # 天気情報の取得
      weather_info = WeatherService.fetch_weather_data(prefecture_name)

      # 通知メッセージの生成
      message = WeatherMessageGenerator.generate_message(prefecture_name, weather_info)

      # LINE通知の送信
      LineNotifyService.send_message(user.line_id, message) if user.line_id.present?
    end
  end
end