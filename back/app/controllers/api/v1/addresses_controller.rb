module Api
  module V1
    class AddressesController < ApplicationController
      def create
        prefecture_name = params[:address] # ユーザーから入力された都道府県名

        # 対応する緯度経度情報の取得
        address_record = Address.find_by(address: prefecture_name)
        if address_record.nil?
          render json: { error: '都道府県が見つかりません' }, status: :not_found
          return
        end

        # 天気情報の取得
        weather_info = WeatherService.fetch_weather_by_coordinates(address_record.latitude, address_record.longitude)

        # LINE通知の送信
        LineNotifyService.send_weather_notification(current_user.line_token, weather_info)

        # 住所情報をaddressesテーブルに保存
        save_address(prefecture_name)

        head :ok
      end

      private

      def save_address(prefecture_name)
        Address.create(address: prefecture_name)
      end
    end
  end
end