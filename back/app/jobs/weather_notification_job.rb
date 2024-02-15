class WeatherNotificationJob < ApplicationJob
  queue_as :default

  def perform(user_id, prefecture_name)
    # ユーザーの取得
    user = User.find(user_id)

    # 天気情報の取得
    weather_info = WeatherService.fetch_weather_data(prefecture_name)

    # 通知メッセージの生成
    message = WeatherMessageGenerator.generate_message(prefecture_name, weather_info)

    # LINE通知の送信
    LineNotifyService.send_message(user.line_id, message)
  end
end