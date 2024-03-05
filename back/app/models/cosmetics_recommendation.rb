class CosmeticsRecommendation

  COMMON_NG_KEYWORDS = '詰め替え マスク パッド ミスト セット %洗顔% 日焼け止め 下地 パッチ オールインワン 10枚 まつ毛% ボディ% アイクリーム スポット リップ% シャンプー %落とし ブースター %タブレット ヘザーカーミングエッセンス'.freeze

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
  '化粧水単品' => ['化粧水', 'トナー'],
  '美容液単品' => ['セラム', '美容液', 'アンプル'],
  'クリーム単品' => ['クリーム']
  }.freeze

  PRODUCT_TYPE_NG_KEYWORDS = {
    '化粧水単品' => ['%エッセンス', '%セラム%', 'ヘザーカーミングエッセンス'],
    '美容液単品' => ['ブレミッシュ', '%クリーム%', '%クリーム', '%トナー%', '%化粧水%'],
    'クリーム単品' => ['エナジーアンプル', '美容液'],
    '化粧水・美容液・クリームセット' => ['フェイスクリーム'],
  }.freeze

  def self.search_cosmetics_for_guests(skin_type, skin_trouble)
    genre_id = "562084"
    tag_id = SKIN_TYPE_TAGS[skin_type]
    elements = "itemCode,itemName,itemPrice,imageUrl,itemUrl"
    ng_keywords = COMMON_NG_KEYWORDS
    results = []
    ["化粧水", "セラム", "クリーム"].each do |item|
      keyword = "公式 #{item}"
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
    end

    results.map! do |item|
      {
        id: item['itemCode'],
        itemName: item['itemName'],
        itemPrice: item['itemPrice'],
        itemUrl: item['itemUrl'],
        mediumImageUrl: item['mediumImageUrls'].first,
      }
    end
    results
  end

  def self.search_cosmetics_for_logged_in_users(skin_type, skin_trouble, price_range, product_type)
    genre_id = "562084"
    tag_id = SKIN_TYPE_TAGS[skin_type]
    trouble_tag_ids = Array(SKIN_TROUBLE_TAGS[skin_trouble])
    ng_keywords = COMMON_NG_KEYWORDS
    elements = "itemCode,itemName,itemPrice,itemUrl,imageUrl,shopName"
    results = []

    min_price, max_price = nil, nil
    if price_range.include?('〜')
      min_price, max_price = price_range.split('〜').map do |price|
        next if price.nil?
        price = price.gsub('円以内', '').gsub(',', '')
        if price.include?('万')
          (price.gsub('万', '').to_f * 10000).to_i
        else
          price.to_i
        end
      end
    elsif price_range.include?('円以上')
      min_price = price_range.gsub('円以上', '').gsub(',', '').to_i
    end

    if product_type == '化粧水・美容液・クリームセット'
      return search_cosmetic_sets(skin_type, skin_trouble, min_price, max_price)
    end

    items = PRODUCT_TYPE_KEYWORDS[product_type] || [product_type]
    product_ng_keywords = PRODUCT_TYPE_NG_KEYWORDS[product_type]
    product_ng_keywords.each do |ng_keyword|
      ng_keywords += " #{ng_keyword}"
    end

    items.each do |item|
      keyword = "公式 #{item}"
      trouble_tag_ids.each do |trouble_tag_id|
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
        id: item['itemCode'],
        itemName: item['itemName'],
        itemPrice: item['itemPrice'],
        itemUrl: item['itemUrl'],
        mediumImageUrl: item['mediumImageUrls'].first,
        shopName: item['shopName'],
      }
    end
    results
  end

  def self.search_cosmetic_sets(skin_type, skin_trouble, min_price, max_price)
    genre_id = "562084"
    tag_id = SKIN_TYPE_TAGS[skin_type]
    ng_keywords = COMMON_NG_KEYWORDS
    elements = "itemCode,itemName,itemPrice,itemUrl,imageUrl,shopName"

    lotion_results = search_items_by_category("化粧水", genre_id, tag_id, ng_keywords, elements)
    serum_results = search_items_by_category("美容液", genre_id, tag_id, ng_keywords, elements)
    cream_results = search_items_by_category("クリーム", genre_id, tag_id, ng_keywords, elements)

    lotion_results.each do |lotion|
      lotion_price = lotion[:itemPrice].to_i
    end

    serum_results.each do |selum|
      selum_price = selum[:itemPrice].to_i
    end

    cream_results.each do |cream|
      cream_price = cream[:itemPrice].to_i
    end

    lotion_total_price = lotion_results.sum { |lotion| lotion[:itemPrice] }
    serum_total_price = serum_results.sum { |serum| serum[:itemPrice] }
    cream_total_price = cream_results.sum { |cream| cream[:itemPrice] }

    sets = lotion_results.product(serum_results, cream_results).map do |lotion, serum, cream|
      lotion_price = lotion[:itemPrice].to_i
      serum_price = serum[:itemPrice].to_i
      cream_price = cream[:itemPrice].to_i

      total_price = lotion_price + serum_price + cream_price
      if max_price.nil? || total_price.between?(min_price, max_price)
        { lotion: lotion, serum: serum, cream: cream, total_price: total_price }
      else
        nil
      end
    end.compact

    sets
  end

  def self.search_items_by_category(item_category, genre_id, tag_id, ng_keywords, elements)
    keyword = "公式 #{item_category}"
    RakutenWebService::Ichiba::Item.search(
      keyword: keyword,
      genreId: genre_id,
      tagId: tag_id,
      NGKeyword: ng_keywords,
      elements: elements,
      formatVersion: 2,
      sort: 'standard',
      hits: 1,
      purchaseType: 0
    ).to_a.map do |item|
      {
        id: item['itemCode'],
        itemName: item['itemName'],
        itemPrice: item['itemPrice'],
        itemUrl: item['itemUrl'],
        mediumImageUrl: item['mediumImageUrls'].first,
        shopName: item['shopName'],
      }
    end
  end
end
