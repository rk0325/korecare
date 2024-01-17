require 'net/http'
require 'uri'
require 'json'

module Api
  module V1
    class PreferencesController < ApplicationController
      def search_cosmetics
        skin_type = cosmetic_params[:skin_type]
        age_group = cosmetic_params[:age_group]
        skin_trouble = cosmetic_params[:skin_trouble]

        # 楽天市場検索APIを呼び出す
        uri = URI("https://楽天市場検索APIのURL")
        params = { skin_type: skin_type, age_group: age_group, skin_trouble: skin_trouble }
        uri.query = URI.encode_www_form(params)
        response = Net::HTTP.get_response(uri)

        # コスメ情報を取得
        cosmetics = JSON.parse(response.body)

        # コスメ情報をレスポンスとして返す
        render json: cosmetics
      end

      private

      def cosmetic_params
        params.permit(:skin_type, :age_group, :skin_trouble)
      end
    end
  end
end