module Api
  module V1
    class LineWebhooksController < ApplicationController
      require 'line/bot'

      # LINEからのWebhookを受け取るアクション
      def callback
        body = request.body.read
        events = client.parse_events_from(body)

        events.each do |event|
          case event
          when Line::Bot::Event::Follow
            # ユーザーがボットを友達に追加した場合
            user_id = event['source']['userId']
            # ユーザーIDとproviderをデータベースに保存する
            User.find_or_create_by(line_id: user_id) do |user|
              user.provider = 'google'
            end
          end
        end
      end

      private

      def client
        @client ||= Line::Bot::Client.new { |config|
          config.channel_secret = ENV["LINE_CHANNEL_SECRET"]
          config.channel_token = ENV["LINE_CHANNEL_TOKEN"]
        }
      end
    end
  end
end
