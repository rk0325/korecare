class WeatherNotificationJob
  include Sidekiq::Worker

  def perform(user_id)
    user = User.find(user_id)
    # ユーザーの位置情報（都道府県名）を取得
    prefecture_name = user.prefecture_name

    # WeatherServiceを使用して天気情報を取得
    weather_info = WeatherService.fetch_weather_data(prefecture_name)

    # LINE通知を送信するロジックを実装
    send_line_notification(user.line_user_id, weather_info)
  end

  private

  def send_line_notification(user_line_id, weather_info)
    message = build_weather_message(weather_info)
    LineNotifyService.send_message(user_line_id, message)
  end

  def build_weather_message(weather_info)
    # 天気情報からメッセージを作成
    "今日の最高UV指数は#{weather_info[:daily_uvi]}です。紫外線に注意してください。\n今日の最低湿度は#{weather_info[:daily_humidity]}%です。乾燥に注意してください。"
  end
end