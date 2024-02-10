require 'net/http'

class LineNotifyService
  def self.send_message(user_line_id, message)
    uri = URI.parse('https://api.line.me/v2/bot/message/push')
    request = Net::HTTP::Post.new(uri)
    request.content_type = 'application/json'
    request['Authorization'] = "Bearer #{ENV['LINE_CHANNEL_TOKEN']}"
    request.body = { to: user_id, messages: [{ type: 'text', text: message }] }.to_json

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
      http.request(request)
    end

    if response.is_a?(Net::HTTPSuccess)
      puts "メッセージ送信成功したよー"
    else
      puts "メッセージ送信失敗したよー: #{response.body}"
    end
  end
end