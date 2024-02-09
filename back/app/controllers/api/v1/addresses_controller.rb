module Api
  module V1
    class AddressesController < ApplicationController
      def create
        prefecture_name = params[:address] # ユーザーから入力された都道府県名

        # 天気情報の取得とLINE通知の送信
        weather_info = WeatherService.fetch_weather_for_prefecture(prefecture_name)
        LineNotifyService.send_weather_notification(weather_info)

        # 住所情報をaddressesテーブルに保存
        save_address(prefecture_name)

        head :ok
      end

      private

      def save_address(prefecture_name)
        # Addressモデルを使用して都道府県名を保存
        Address.create(address: prefecture_name)
      end
    end
  end
end
