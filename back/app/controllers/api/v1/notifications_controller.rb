module Api
  module V1
    class NotificationsController < ApplicationController
      before_action :set_current_user
      before_action :set_user, only: [:enable, :status]

      def enable
        notification_type = params[:notification_type]
        enabled = params[:enabled] == 'true'

        if notification_type == 'weather'
          @user.update(receive_notifications_weather: enabled)
        elsif notification_type == 'expiration_date'
          @user.update(receive_notifications_expiration_date: enabled)
        else
          return render json: { message: '無効な通知タイプです。' }, status: :bad_request
        end

        render json: { message: '通知設定が更新されました。' }, status: :ok
      rescue => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      def status
        render json: {
          receive_notifications_weather: @user.receive_notifications_weather,
          receive_notifications_expiration_date: @user.receive_notifications_expiration_date
        }
      end

      private

      def set_user
        @user = current_user
      end
    end
  end
end