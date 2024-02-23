module WeatherMessageGenerator
  def self.generate_message(prefecture_name, weather_info)
    text = "おはようございます！\n今日の#{prefecture_name}の天気情報をお届けします✉️\n\n"
    text += "☀️UV指数\n"
    text += "・現在のUV指数: #{weather_info[:current_uvi]}\n"
    text += "・最高UV指数: #{weather_info[:daily_max_uvi]}\n"
    text += uv_index_advice(weather_info[:current_uvi], weather_info[:daily_max_uvi])
    text += "💧湿度\n"
    text += "・現在の湿度: #{weather_info[:current_humidity]}%\n"
    text += "・最低湿度: #{weather_info[:daily_min_humidity]}%\n"
    text += humidity_advice(weather_info[:current_humidity], weather_info[:daily_min_humidity])
    text += "✔︎UV指数や湿度の目安をご覧になりたい方は、「目安」と送信していただけますと幸いです。"
  end

  def self.uv_index_advice(current_uvi, daily_max_uvi)
    return "UV指数情報が利用できません。" if current_uvi.nil? || daily_max_uvi.nil?

    advice = ""
    if current_uvi.between?(3, 5)
      advice += "現在UV指数は中程度です。日焼けを防ぐために日傘や日焼け止めの利用、長袖や帽子の着用をお勧めします。\n\n"
    end

    if daily_max_uvi >= 6
      advice += "これからUV指数が高くなる予報が出ています。日焼けを防ぐために日傘や日焼け止めの利用、長袖や帽子の着用をお勧めします。\n\n"
    end

    if advice.empty?
      advice = "UV指数は通常範囲内です。\n\n"
    end

    advice
  end

  def self.humidity_advice(current_humidity, daily_min_humidity)
    return "湿度情報が利用できません。" if current_humidity.nil? || daily_min_humidity.nil?

    if current_humidity >= 70 && daily_min_humidity > 30
      "現在湿度が高く、お肌のトラブルが起こりやすい状態です。適度な保湿を心がけるとともに、肌を清潔に保つことをお勧めします。\n\n"
    elsif current_humidity >= 70 && daily_min_humidity <= 30
      "現在は湿度が高いですが、日中の最低湿度が低いため、お肌の乾燥に注意してください。保湿を心がけ、肌を清潔に保つことをお勧めします。\n\n"
    elsif current_humidity <= 30 || daily_min_humidity <= 30
      "現在空気が乾燥しています。ミスト化粧水やクリームを活用して、適宜うるおいを補給することをお勧めします。\n\n"
    elsif current_humidity.between?(30, 50)
      "現在空気がやや乾燥しています。ミスト化粧水やクリームを活用して、適宜うるおいを補給することをお勧めします。\n\n"
    elsif daily_min_humidity < 50
      "最低湿度が50%を下回る予報が出ています。お肌の乾燥が気になった際はミスト化粧水やクリームを活用して、適宜うるおいを補給することをお勧めします。\n\n"
    else
      "現在湿度は通常範囲内ですが、お肌の乾燥が気になった際はミスト化粧水やクリームを活用して、うるおいを補給することをお勧めします。\n\n"
    end
  end
end
