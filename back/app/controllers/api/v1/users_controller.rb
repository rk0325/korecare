module Api
  module V1
    class UsersController < ApplicationController
      rescue_from StandardError, with: :handle_standard_error

      def create
        user = User.find_or_initialize_by(user_params.slice(:provider, :uid))
        user.assign_attributes(user_params.except(:provider, :uid))

        if user.save
          render json: user, status: :ok
        else
          render json: { errors: user.errors.full_messages }, status: :bad_request
        end
      end

      private

      def user_params
        params.require(:user).permit(:provider, :uid, :name, :avatar)
      end

      def handle_standard_error(e)
        Rails.logger.error "Internal Server Error: #{e.message}"
        e.backtrace.each { |line| Rails.logger.error line }
        render json: { error: '内部サーバーエラーが発生しました。' }, status: :internal_server_error
      end
    end
  end
end