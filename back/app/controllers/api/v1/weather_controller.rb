module Api
  module V1
    class WeatherController < ApplicationController
      before_action :set_current_user

      def create
        prefecture_name = params[:address] # ユーザーから入力された都道府県名

        # 対応する緯度経度情報の取得
        address_record = Address.find_by(address: prefecture_name)
        if address_record.nil?
          render json: { error: '都道府県が見つかりません' }, status: :not_found
          return
        end

        # 天気情報の取得
        weather_info = fetch_weather_data(prefecture_name)

        # 住所情報をaddressesテーブルに保存
        current_user.addresses.create(address: prefecture_name)

        head :ok
      end

      def show
        prefecture_name = params[:prefecture_name]
        weather_info = fetch_weather_data(prefecture_name)

        render json: weather_info
      end

      private

      def fetch_weather_data(prefecture_name)
        WeatherService.fetch_weather_data(prefecture_name)
      end
    end
  end
end
