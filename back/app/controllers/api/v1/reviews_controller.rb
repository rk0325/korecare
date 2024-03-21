module Api
  module V1
    class ReviewsController < ApplicationController
      before_action :set_current_user
      before_action :set_review, only: [:show, :update, :destroy]

      def index
        @reviews = Review.where(visibility: true).includes(:favorite_cosmetic)
        render json: @reviews, include: [:user, :favorite_cosmetic]
      end

      def show
        render json: @review
      end

      def create
        @review = current_user.reviews.new(review_params)
        if @review.save
          render json: @review, status: :created
        else
          render json: @review.errors, status: :unprocessable_entity
        end
      end

      def update
        if @review.update(review_params)
          render json: @review
        else
          render json: @review.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @review.destroy
      end

      private

      def set_review
        @review = Review.find(params[:id])
      end

      def review_params
        params.require(:review).permit(:user_id, :favorite_cosmetic_id, :rating, :title, :body, :visibility, :profile_id, :age, :skin_type, :skin_trouble, cosmetic_attributes: [:id, :user_id, :name, :brand, :price, :item_url, :image_url, :item_code])
      end
    end
  end
end

