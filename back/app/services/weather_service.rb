require 'net/http'
require 'json'

class WeatherService
  def show
    api_key = ENV['OPENWEATHERMAP_API_KEY']
    url = "https://api.openweathermap.org/data/3.0/onecall?lat=#{@latitude}&lon=#{@longitude}&exclude=minutely,alerts&appid=#{api_key}"
    response = Net::HTTP.get_response(URI(url))
    data = JSON.parse(response.body)
    @current_uvi = data['current']['uvi']
    @daily_uvi = data['daily'][0]['uvi']
    @daily_humidity = data['daily'][0]['humidity'] # 最低湿度の取得

    {
      current_uvi: data['current']['uvi'],
      daily_uvi: data['daily'][0]['uvi'],
      daily_humidity: data['daily'][0]['humidity']
    }
  end

  private

  def self.get_lat_lon_for_prefecture(prefecture_name)
    # addressesテーブルから都道府県名に対応する緯度と経度を検索
    address = Address.find_by(address: prefecture_name)
    return [address.latitude, address.longitude] if address
    # 該当する都道府県が見つからない場合は、デフォルトの値を返すか、エラーを発生させる
    raise "都道府県名が見つかりません: #{prefecture_name}"
  end
end