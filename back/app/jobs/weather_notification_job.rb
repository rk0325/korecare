class WeatherNotificationJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # ユーザーの住所に基づいて天気情報を取得
    weather_info = WeatherService.fetch_weather(lat, lon)
    # 天気情報に基づいて通知メッセージを作成
    message = "今日の天気に注意しましょう。紫外線が強いです。日傘をさしたり、日焼け止めを塗りましょう。"
    # LINEで通知
    LineNotifyService.send_message(user.line_token, message)
  end
end