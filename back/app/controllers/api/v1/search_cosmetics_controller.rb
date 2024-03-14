module Api
  module V1
    class SearchCosmeticsController < ApplicationController

      def for_guests
        skin_type = cosmetic_params[:skin_type]
        skin_trouble = cosmetic_params[:skin_trouble]
        @results = SearchCosmetics.for_guests(skin_type, skin_trouble)
        render json: @results
      end

      def for_logged_in_users
        skin_type = cosmetic_params[:skin_type]
        skin_trouble = cosmetic_params[:skin_trouble]
        price_range = cosmetic_params[:price_range]
        product_type = cosmetic_params[:product_type]
        @results = SearchCosmetics.for_logged_in_users(skin_type, skin_trouble, price_range, product_type)
        render json: @results
      end

      def recommendations
        skin_type = params[:skin_type]
        skin_trouble = params[:skin_trouble]
        @recommendations = SearchCosmetics.recommendations(skin_type, skin_trouble)
        render json: @recommendations
      end

      private

      def cosmetic_params
        params.permit(:skin_type, :skin_trouble, :price_range, :product_type)
      end
    end
  end
end