module Api
  module V1
    class ProfilesController < ApplicationController
      before_action :set_current_user

      def update
        profile = @current_user.profile || @current_user.build_profile

        if profile.nil?
          render json: { status: 'failure', message: 'Profile not found', data: {} }, status: :not_found
          return
        end

        if profile.update(profile_params)
          render json: { status: 'success', message: 'Profile updated successfully', data: profile }, status: :ok
        else
          render json: { status: 'failure', message: profile.errors.full_messages.to_sentence, data: {} }, status: :unprocessable_entity
        end
      end

      def show
        profile = @current_user.profile

        if profile.nil?
          render json: { status: 'failure', message: 'Profile not found', data: {} }, status: :not_found
        else
          render json: { status: 'success', data: profile }, status: :ok
        end
      end

      private

      def profile_params
        params.permit(:name, :age, :skin_type, :skin_trouble, :avatar)
      end
    end
  end
end