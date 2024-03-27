# frozen_string_literal: true

require 'net/http'
require 'uri'
require 'json'

class LineNotifyService
  def self.send_message(uid, message)
    uri = URI.parse('https://api.line.me/v2/bot/message/push')
    request = Net::HTTP::Post.new(uri)
    request.content_type = 'application/json'
    request['Authorization'] = "Bearer #{ENV['LINE_CHANNEL_TOKEN']}"
    request.body = JSON.dump({
                               to: uid,
                               messages: [{ type: 'text', text: message }]
                             })

    begin
      req_options = { use_ssl: uri.scheme == 'https', read_timeout: 10, open_timeout: 5 }
      response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
      end

      handle_response(response)
    rescue Net::ReadTimeout, Net::OpenTimeout
      Rails.logger.error 'LINE通知: タイムアウトエラー'
    rescue SocketError => e
      Rails.logger.error "LINE通知: ネットワーク接続エラー: #{e.message}"
    rescue StandardError => e
      Rails.logger.error "LINE通知: 予期せぬエラー: #{e.message}"
    end
  end

  def self.handle_response(response)
    case response
    when Net::HTTPSuccess
      Rails.logger.info 'LINE通知 送信成功'
    when Net::HTTPUnauthorized
      Rails.logger.error 'LINE通知 送信失敗: 認証エラー'
    when Net::HTTPNotFound
      Rails.logger.error 'LINE通知 送信失敗: リソースが見つかりません'
    else
      Rails.logger.error "LINE通知 送信失敗: #{response.code} #{response.message}"
      Rails.logger.error "レスポンスボディ: #{response.body}"
    end
  end
end
