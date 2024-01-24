module Api
  module V1
    class CosmeticsRecommendationController < ApplicationController

      def search_cosmetics_for_guests
        skin_type = cosmetic_params[:skin_type]
        skin_trouble = cosmetic_params[:skin_trouble]
        @results = CosmeticsRecommendation.search_cosmetics_for_guests(skin_type, skin_trouble)
        render json: @results
      end

      def search_cosmetics_for_logged_in_users
        skin_type = cosmetic_params[:skin_type]
        skin_trouble = cosmetic_params[:skin_trouble]
        price_range = cosmetic_params[:price_range]
        product_type = cosmetic_params[:product_type]
        @results = CosmeticsRecommendation.search_cosmetics_for_logged_in_users(skin_type, skin_trouble, price_range, product_type)
        render json: @results
      end

      private

      def cosmetic_params
        params.permit(:skin_type, :skin_trouble, :price_range, :product_type)
      end
    end
  end
end