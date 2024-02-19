module Api
  module V1
    class WeatherController < ApplicationController
      def show
        prefecture_name = params[:prefecture_name]
        weather_info = WeatherService.fetch_weather_data(prefecture_name)
        render json: weather_info
      end
    end
  end
end