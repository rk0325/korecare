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
        skin_type = recommendation_params[:skinType]
        skin_trouble = recommendation_params[:skinTrouble]
        @recommendations = SearchCosmetics.recommendations(skin_type, skin_trouble)
        render json: @recommendations
      end

      def profile_recommendations
        skin_type = profile_params[:skin_type]
        skin_trouble = profile_params[:skin_trouble]
        @recommendations = SearchCosmetics.profile_recommendations(skin_type, skin_trouble)
        render json: @recommendations
      end

      private

      def cosmetic_params
        params.permit(:skin_type, :skin_trouble, :price_range, :product_type)
      end

      def recommendation_params
        params.permit(:skinType, :skinTrouble, :priceRange, :productType)
      end

      def profile_params
        params.permit(:skin_type, :skin_trouble, :price_range, :product_type, :id, :user_id, :name, :age, :created_at, :updated_at, :avatar, :address_id, :prefecture)
      end
    end
  end
end