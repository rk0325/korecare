module Api
  module V1
    class UsersController < ApplicationController
      rescue_from StandardError, with: :handle_standard_error

      def create
        # find_or_initialize_byを使用して、ユーザーが存在しない場合は新しいインスタンスを初期化
        user = User.find_or_initialize_by(provider: user_params[:provider], uid: user_params[:uid])
        # ユーザー情報を更新
        user.name = user_params[:name]
        user.avatar = user_params[:avatar]

        if user.save
          head :ok
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end

      private

      def user_params
        params.require(:user).permit(:provider, :uid, :name, :avatar)
      end

      def handle_standard_error(e)
        logger.error "Internal Server Error: #{e.message}"
        e.backtrace.each { |line| logger.error line }
        render json: { error: '内部サーバーエラーが発生しました。' }, status: :internal_server_error
      end
    end
  end
end