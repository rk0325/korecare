require 'net/http'

class LineNotifyService
  def self.send_weather_notification(user_line_token, weather_info)
    message = "今日の最高UV指数は#{weather_info[:daily_uvi]}です。紫外線に注意してください。\n今日の最低湿度は#{weather_info[:daily_humidity]}%です。乾燥に注意してください。"
    uri = URI.parse('https://notify-api.line.me/api/notify')
    request = Net::HTTP::Post.new(uri)
    request['Authorization'] = "Bearer #{user_line_token}"
    request.set_form_data('message' => message)

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
      http.request(request)
    end
  end
end