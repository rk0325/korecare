module Api
  module V1
    class ReviewsController < ApplicationController
      before_action :set_current_user
      before_action :set_review, only: [:show, :update, :destroy]

      def index
        @reviews = Review.where(visibility: true)
                        .or(Review.where(user_id: current_user.id, visibility: false))
        render json: @reviews, include: [:user]
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
          params.require(:review).permit(:title, :body, :visibility, :rating, :skin_type, :skin_trouble, :age, :favorite_cosmetic_id, :profile_id, :user_id)
        end
    end
  end
end

