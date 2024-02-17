module WeatherMessageGenerator
  def self.generate_message(prefecture_name, weather_info)
    text = "おはようございます！\n今日の#{prefecture_name}の天気情報をお届けします✉️\n\n"
    text += "☀️現在のUV指数は#{weather_info[:current_uvi]}、最高UV指数は#{weather_info[:daily_max_uvi]}です。\n"
    text += uv_index_advice(weather_info[:current_uvi], weather_info[:daily_max_uvi])
    text += "💧現在の湿度は#{weather_info[:current_humidity]}%、最低湿度は#{weather_info[:daily_min_humidity]}%です。\n"
    text += humidity_advice(weather_info[:current_humidity], weather_info[:daily_min_humidity])
    text += "今日もKoreCareをご利用いただき、ありがとうございます。"
  end

  def self.uv_index_advice(current_uvi, daily_max_uvi)
    if current_uvi >= 6
      "UV指数が高いです。日焼けを防ぐために、日傘や日焼け止めの使用をお勧めします。\n\n"
    elsif daily_max_uvi >= 6
      "現在はUV指数は通常範囲内ですが、これからUV指数が高くなるので、日傘や日焼け止めを使用しましょう。\n\n"
    else
      "UV指数は通常範囲内です。\n\n"
    end
  end

  def self.humidity_advice(current_humidity, daily_min_humidity)
    if current_humidity <= 30 || daily_min_humidity <= 30
      "空気が乾燥しています。ミスト化粧水やクリームを活用して、適宜うるおいを補給することをお勧めします。\n\n"
    else
      "湿度は通常範囲内です。\n\n"
    end
  end
end
