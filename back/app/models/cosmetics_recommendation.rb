class CosmeticsRecommendation

  COMMON_NG_KEYWORDS = '%詰め替え% ミスト マスク パッド セット %洗顔% 日焼け止め 下地 パッチ オールインワン 10枚 まつ毛美容 ボディクリーム アイクリーム スポット リップクリーム シャンプー'.freeze

  SKIN_TYPE_TAGS = {
    '乾燥肌' => '1001296',
    '敏感肌' => '1001297',
    '脂性肌' => '1001298',
    '混合肌' => '1001299',
    '普通肌' => '1025940'
  }.freeze

  SKIN_TROUBLE_TAGS = {
    '保湿' => '1025987',
    '肌のハリ・弾力' => ['1001304', '1001303'],
    '毛穴・黒ずみ' => '1001300',
    'ニキビ' => '1001301',
    '美白' => ['1001311', '1001313']
  }.freeze

  PRODUCT_TYPE_KEYWORDS = {
  '化粧水・美容液・クリームセット' => ['化粧水', '%化粧水', 'トナー', '%トナー', 'セラム', '%セラム', '美容液', '%美容液', 'アンプル', '%アンプル', 'クリーム', '%クリーム'],
  '化粧水単品' => ['化粧水', '%化粧水', 'トナー', '%トナー'],
  '美容液単品' => ['セラム', '%セラム', '美容液', '%美容液', 'アンプル', '%アンプル'],
  'クリーム単品' => ['クリーム', '%クリーム']
  }.freeze

  def self.search_cosmetics_for_guests(skin_type, skin_trouble)
    # 未ログインユーザー向けの検索ロジック
    genre_id = "562084" # 「韓国スキンケア」のジャンルID
    tag_id = SKIN_TYPE_TAGS[skin_type]
    # trouble_tag_ids = Array(SKIN_TROUBLE_TAGS[skin_trouble]) # trouble_tag_idsを配列として扱う
    ng_keywords = COMMON_NG_KEYWORDS
    elements = "itemCode,itemName,itemPrice,imageUrl"
    results = []
    ["化粧水", "セラム", "クリーム"].each do |item|
      keyword = "公式 #{item}"
      # trouble_tag_ids.each do |trouble_tag_id| # trouble_tag_idsの各要素に対して検索を行う
        search_results = RakutenWebService::Ichiba::Item.search(
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
        results.concat(search_results)
      # end
    end

    results.map! do |item|
      {
        id: item['itemCode'], # 楽天市場の商品コードをidとして使用
        itemName: item['itemName'],
        itemPrice: item['itemPrice'],
        mediumImageUrl: item['mediumImageUrls'].first,
      }
    end
    results
  end

  def self.search_cosmetics_for_logged_in_users(skin_type, skin_trouble, price_range, product_type)
    # ログインユーザー向けの検索ロジック
    genre_id = "562084" # 「韓国スキンケア」のジャンルID
    tag_id = SKIN_TYPE_TAGS[skin_type]
    trouble_tag_ids = Array(SKIN_TROUBLE_TAGS[skin_trouble]) # trouble_tag_idsを配列として扱う
    ng_keywords = COMMON_NG_KEYWORDS
    elements = "itemCode,itemName,itemPrice,itemUrl,imageUrl,shopName"
    results = []

    min_price, max_price = price_range.split('〜').map do |price|
      next if price.nil?
      price = price.gsub('円以内', '').gsub('円以上', '').gsub(',', '')
      if price.include?('万')
        (price.gsub('万', '').to_f * 10000).to_i
      else
        price.to_i
      end
    end

    # 「1万円以上」の場合、max_priceはnilになる
    max_price = nil if price_range.include?('以上')

    if product_type == '化粧水・美容液・クリームセット'
      max_price /= 3
    end

    items = PRODUCT_TYPE_KEYWORDS[product_type] || [product_type]
    items.each do |item|
      keyword = "公式 #{item}"
      trouble_tag_ids.each do |trouble_tag_id| # trouble_tag_idsの各要素に対して検索を行う
      search_results = RakutenWebService::Ichiba::Item.search(
        keyword: keyword,
        genreId: genre_id,
        tagId: tag_id,
        NGKeyword: ng_keywords,
        elements: elements,
        formatVersion: 2,
        sort: 'standard',
        minPrice: min_price,
        maxPrice: max_price,
        hits: 5,
        purchaseType: 0
      ).to_a
      results.concat(search_results)
      end
    end

    results.uniq! { |item| item['itemCode'] }

    results.map! do |item|
      {
        id: item['itemCode'], # 楽天市場の商品コードをidとして使用
        itemName: item['itemName'],
        itemPrice: item['itemPrice'],
        itemUrl: item['itemUrl'],
        mediumImageUrl: item['mediumImageUrls'].first,
        shopName: item['shopName'],
      }
    end
    results
  end
end
