module Api
  module V1
    class FavoriteCosmeticsController < ApplicationController
      before_action :set_current_user
      before_action :set_favorite_cosmetic, only: [:destroy]

      def index
        @favorite_cosmetics = current_user.favorite_cosmetics
        render json: @favorite_cosmetics.as_json(only: [:id, :user_id, :name, :brand, :price, :item_url, :image_url, :item_code])
      end

      def create
        favorite_cosmetic = current_user.favorite_cosmetics.find_or_initialize_by(item_code: favorite_cosmetic_params[:item_code])

        if favorite_cosmetic.new_record?
          if favorite_cosmetic.update(favorite_cosmetic_params)
            render json: favorite_cosmetic.as_json(only: [:id, :user_id, :name, :brand, :price, :item_url, :image_url, :item_code]), status: :created
          else
            render json: favorite_cosmetic.errors, status: :unprocessable_entity
          end
        else
          render json: { message: "Favorite cosmetic already exists." }, status: :ok
        end
      end

      def destroy
        @favorite_cosmetic.destroy
        head :no_content
      end

      private

      def favorite_cosmetic_params
        params.require(:favorite_cosmetic).permit(:name, :brand, :price, :item_url, :image_url, :item_code)
      end

      def set_favorite_cosmetic
        @favorite_cosmetic = current_user.favorite_cosmetics.find_by(item_code: params[:id])
        raise ActiveRecord::RecordNotFound unless @favorite_cosmetic
      end
    end
  end
end