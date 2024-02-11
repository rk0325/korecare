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
        weather_info = WeatherService.fetch_weather_data(prefecture_name)

        # LINE通知の送信
        if current_user && current_user.line_id.present?
          message = "今日の天気情報: #{weather_info}"
          LineNotifyService.send_message(current_user.line_id, message)
        else
          # line_idがnil、またはcurrent_userがnilの場合の処理
          Rails.logger.warn "LINEメッセージを送信できませんでした。ユーザーが認証されていないか、line_idが設定されていません。"
        end

        # 住所情報をaddressesテーブルに保存
        save_address(prefecture_name)

        head :ok
      end

      private

      def save_address(prefecture_name)
        # 現在のユーザーに紐づくAddressインスタンスを作成
        current_user.addresses.create(address: prefecture_name)
      end
    end
  end
end