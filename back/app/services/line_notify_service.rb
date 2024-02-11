require 'net/http'
require 'uri'
require 'json'

class LineNotifyService
  def self.send_message(user_line_id, message)
    # LINEに通知を送る
    uri = URI.parse("https://api.line.me/v2/bot/message/push")
    request = Net::HTTP::Post.new(uri)
    request.content_type = "application/json"
    request["Authorization"] = "Bearer #{ENV['LINE_CHANNEL_TOKEN']}"
    request.body = JSON.dump({
      to: user_line_id,
      messages: [{ type: 'text', text: message }]
    })

    req_options = { use_ssl: uri.scheme == "https" }
    response = Net::HTTP.start(uri.hostname, uri.port, req_options) { |http| http.request(request) }
  end
end