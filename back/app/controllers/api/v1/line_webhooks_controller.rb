module Api
  module V1
    class LineWebhooksController < ApplicationController
      require 'json'

      def callback
        body = request.body.read
        events = JSON.parse(body)["events"]

        events.each do |event|
          case event["type"]
          when "message"
            handle_message_event(event)
          when "follow"
            handle_follow_event(event)
          # 他のイベントタイプに対する処理もここに追加
          end
        end

        head :ok
      end

      private

      def handle_message_event(event)
        # メッセージイベントの処理
        user_id = event["source"]["userId"]
        received_message = event["message"]["text"]

        # 受け取ったメッセージに応じて何らかの処理をする
        # 例: "こんにちは"というメッセージに対して応答する
        if received_message == "こんにちは"
          response_message = "こんにちは！何かお手伝いできることはありますか？"
          send_reply_message(user_id, response_message)
        end
      end

      def handle_follow_event(event)
        # フォローイベントの処理
        # 例えば、新規フォロワーに対するウェルカムメッセージを送るなど
      end

      def send_reply_message(user_id, text)
        # LINE Messaging APIを使用してメッセージを送信する
        message = {
          type: "text",
          text: text
        }
        LineNotifyService.send_message(user_id, message)
      end
    end
  end
end
