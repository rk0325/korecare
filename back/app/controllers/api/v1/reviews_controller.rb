module Api
  module V1
    class ReviewsController < ApplicationController
      before_action :set_current_user
      before_action :set_review, only: [:show, :update, :destroy]

      def index
        if params[:tags].present?
          tags = params[:tags].split(',')
          @reviews = Review.joins(:tags).where(tags: { tag_name: tags }).includes(:user, :favorite_cosmetic)
        else
          @reviews = Review.where(visibility: true).includes(:user, :favorite_cosmetic)
        end

        render json: @reviews, include: [:user, :favorite_cosmetic]
      end

      def show
        render json: @review
      end

      def create
        @review = current_user.reviews.new(review_params)
        if @review.save
          %w(age skin_type skin_trouble).each do |tag_name|
            tag = Tag.find_by(tag_name: review_params[tag_name])
            @review.tags << tag if tag
          end

          render json: @review, status: :created
        else
          render json: @review.errors, status: :unprocessable_entity
        end
      end

      def update
        if @review.user_id == current_user.id
          if @review.update(review_params)
            render json: @review
          else
            render json: @review.errors, status: :unprocessable_entity
          end
        else
          render json: { error: 'You are not authorized to update this review.' }, status: :forbidden
        end
      end

      def destroy
        if @review.user_id == current_user.id
          @review.destroy
          render json: { message: 'Review was successfully deleted.' }, status: :ok
        else
          render json: { error: 'You are not authorized to delete this review.' }, status: :forbidden
        end
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

