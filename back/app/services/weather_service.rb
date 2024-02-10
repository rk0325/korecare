class WeatherService
  def self.fetch_weather_data(prefecture_name)
    latitude, longitude = get_lat_lon_for_prefecture(prefecture_name)

    api_key = ENV['OPENWEATHERMAP_API_KEY']
    url = "https://api.openweathermap.org/data/3.0/onecall?lat=#{latitude}&lon=#{longitude}&exclude=minutely,alerts&appid=#{api_key}"
    response = Net::HTTP.get_response(URI(url))
    data = JSON.parse(response.body)

    {
      current_uvi: data['current']['uvi'],
      daily_uvi: data['daily'][0]['uvi'],
      daily_humidity: data['daily'][0]['humidity']
    }
  end

  private

  def self.get_lat_lon_for_prefecture(prefecture_name)
    address = Address.find_by(address: prefecture_name)
    raise "都道府県名が見つかりません: #{prefecture_name}" unless address

    [address.latitude, address.longitude]
  end
end