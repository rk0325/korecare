module Api
  module V1
    class SkinInformationController < ApplicationController
      COMMON_NG_KEYWORDS = 'ミスト マスク パッド セット 洗顔料 日焼け止め 下地 パッチ オールインワン 10枚 まつ毛美容 ボディクリーム アイクリーム スポット リップクリーム シャンプー'.freeze

      SKIN_TYPE_TAGS = {
        '乾燥肌' => '1001296',
        '敏感肌' => '1001297',
        '脂性肌' => '1001298',
        '混合肌' => '1001299',
        '普通肌' => '1025940'
      }.freeze

      SKIN_TROUBLE_NG_KEYWORDS = {
        '保湿' => 'ニキビ 毛穴 トーンアップ 美白 バーム シミ しわ ハリ シワ 弾力 エイジングケア ' + COMMON_NG_KEYWORDS,
        'ニキビ' => '毛穴 角質 トーンアップ 美白 バーム シミ しわ ハリ シワ 弾力 エイジングケア ' + COMMON_NG_KEYWORDS,
        '毛穴・黒ずみ' => 'ニキビ トーンアップ 美白 バーム シミ しわ ハリ シワ 弾力 エイジングケア ' + COMMON_NG_KEYWORDS,
        '美白' => 'ニキビ 毛穴 角質 バーム しわ ハリ シワ 弾力 エイジングケア ' + COMMON_NG_KEYWORDS,
        '肌のハリ・弾力' => 'ニキビ 毛穴 トーンアップ 美白 バーム シミ ' + COMMON_NG_KEYWORDS
      }.freeze

      def search_cosmetics
        skin_type = cosmetic_params[:skin_type]
        skin_trouble = cosmetic_params[:skin_trouble]

        # 楽天市場検索APIを呼び出す
        genre_id = "562084" # 「韓国コスメ」のジャンルID
        tag_id = SKIN_TYPE_TAGS[skin_type]
        ng_keywords = SKIN_TROUBLE_NG_KEYWORDS[skin_trouble]
        elements = "itemName,itemPrice,itemUrl,imageUrl,shopName"
        @results = []
        ["化粧水", "セラム", "クリーム"].each do |item|
          keyword = "公式 #{item}" # "公式"とitemをキーワードとして使用
          results = RakutenWebService::Ichiba::Item.search(
            keyword: keyword,
            genreId: genre_id,
            tagId: tag_id,
            NGKeyword: ng_keywords,
            elements: elements,
            formatVersion: 2,
            sort: 'standard',
            hits: 1,
            purchaseType: 0
          ).to_a
          @results.concat(results)
          end

          @results.map! do |item|
            {
              itemName: item['itemName'],
              itemPrice: item['itemPrice'],
              itemUrl: item['itemUrl'],
              mediumImageUrl: item['mediumImageUrls'].first,
              shopName: item['shopName'],
            }
          end

        # コスメ情報をレスポンスとして返す
        render json: @results
      end

      private

      def cosmetic_params
        params.permit(:skin_type, :skin_trouble)
      end
    end
  end
end