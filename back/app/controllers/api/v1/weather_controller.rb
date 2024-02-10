module Api
  module V1
    class WeatherController < ApplicationController
      def show
        prefecture_name = params[:prefecture_name]
        weather_info = WeatherService.fetch_weather_data(prefecture_name)

        # ここでLINE通知を送信する処理を追加する
        LineNotifyService.send_message(user.line_id, message)

        render json: weather_info
      end
    end
  end
end