module Api
  module V1
    class WeatherController < ApplicationController
      def show
        prefecture_name = params[:prefecture_name]
        weather_info = WeatherService.fetch_weather_data(prefecture_name)

        message = "今日の#{prefecture_name}の天気情報です。\n最高UV指数: #{weather_info[:daily_uvi]}\n最低湿度: #{weather_info[:daily_humidity]}%"
        LineNotifyService.send_message(user.line_id, message)

        render json: weather_info
      end
    end
  end
end