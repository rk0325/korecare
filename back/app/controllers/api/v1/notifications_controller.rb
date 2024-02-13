module Api
  module V1
    class NotificationsController < ApplicationController
      before_action :authenticate_user!
      before_action :set_user, only: [:enable, :status]

      def enable
        if @user.update(receive_notifications: params[:enabled])
          render json: { message: '通知設定が更新されました。' }, status: :ok
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      def status
        render json: { receive_notifications: @user.receive_notifications }
      end

      private

      def set_user
        @user = current_user
      end

      def authenticate_user!
        unless current_user
          render json: { error: '認証されていません。' }, status: :unauthorized
          return
        end
      end
    end
  end
end