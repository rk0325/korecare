module Api
  module V1
    class UsersController < ApplicationController
      def create
        user = User.find_or_create_by(provider: params[:provider], uid: params[:uid])
        user.name = params[:name]
        user.email = params[:email]
        user.avatar = params[:avatar]
        if user.save
          head :ok
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end
    end
  end
end