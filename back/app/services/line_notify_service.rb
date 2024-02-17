require 'net/http'
require 'uri'
require 'json'

class LineNotifyService
  def self.send_message(line_id, message)
    uri = URI.parse("https://api.line.me/v2/bot/message/push")
    request = Net::HTTP::Post.new(uri)
    request.content_type = "application/json"
    request["Authorization"] = "Bearer #{ENV['LINE_CHANNEL_TOKEN']}"
    request.body = JSON.dump({
      to: line_id,
      messages: [{ type: "text", text: message }]
    })

    begin
      req_options = { use_ssl: uri.scheme == "https" }
      response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
      end

      # レスポンスのステータスコードをチェック
      if response.is_a?(Net::HTTPSuccess)
        Rails.logger.info "LINE message 送信成功"
      else
        Rails.logger.error "LINE message 送信失敗: #{response.code} #{response.message}"
        Rails.logger.error "レスポンスボディ: #{response.body}"
      end
    rescue => e
      Rails.logger.error "LINE message 送信エラー: #{e.message}"
    end
  end
end