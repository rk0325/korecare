class WeatherService
  def self.fetch_weather_data(prefecture_name)
    latitude, longitude = get_lat_lon_for_prefecture(prefecture_name)
    api_key = ENV['OPENWEATHERMAP_API_KEY']
    url = "https://api.openweathermap.org/data/3.0/onecall?lat=#{latitude}&lon=#{longitude}&exclude=minutely,alerts&appid=#{api_key}"

    begin
      response = Net::HTTP.get_response(URI(url))

      if response.code == '401'
        Rails.logger.error "APIリクエスト失敗: #{response.code} #{response.message}"
        return nil
      end

      data = JSON.parse(response.body)

      # 必要なキーの存在を確認
      unless data['current'] && data['daily']
        Rails.logger.error "APIレスポンスに必要なキーが含まれていません"
        return nil
      end

      # 必要なデータを抽出
      current_uvi = data.dig('current', 'uvi')
      daily_max_uvi = data.dig('daily', 0, 'uvi')
      current_humidity = data.dig('current', 'humidity')
      daily_min_humidity = data['daily'].map { |day| day['humidity'] }.min

      {
        current_uvi: current_uvi,
        daily_max_uvi: daily_max_uvi,
        current_humidity: current_humidity,
        daily_min_humidity: daily_min_humidity
      }
    rescue JSON::ParserError => e
      Rails.logger.error "JSONを解析できませんでした: #{e.message}"
      nil
    rescue => e
      Rails.logger.error "データ取得できませんでした: #{e.message}"
      nil
    end
  end

  private

  def self.get_lat_lon_for_prefecture(prefecture_name)
    address = Address.where.not(latitude: nil, longitude: nil).find_by(address: prefecture_name)
    raise "都道府県名が見つかりません: #{prefecture_name}" unless address

    [address.latitude, address.longitude]
  end
end