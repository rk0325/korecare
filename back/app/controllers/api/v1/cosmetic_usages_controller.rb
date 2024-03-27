# frozen_string_literal: true

module Api
  module V1
    class CosmeticUsagesController < ApplicationController
      before_action :set_current_user

      def create
        if cosmetic_usage_params.values.any?(&:blank?)
          render json: { message: '新規作成をスキップしました。' }, status: :ok
          return
        end

        existing_cosmetic_usage = @current_user.cosmetic_usages.find_by(
          item_type: cosmetic_usage_params[:item_type],
          open_date: cosmetic_usage_params[:open_date],
          expiry_date: cosmetic_usage_params[:expiry_date]
        )

        if existing_cosmetic_usage
          render json: { message: '同じ使用期限設定が既に存在します。' }, status: :ok
          return
        end

        cosmetic_usage = @current_user.cosmetic_usages.build(cosmetic_usage_params)

        if cosmetic_usage.save
          render json: cosmetic_usage, status: :created
        else
          render json: cosmetic_usage.errors, status: :unprocessable_entity
        end
      end

      def index
        cosmetic_usages = @current_user.cosmetic_usages
        render json: cosmetic_usages
      end

      def update
        cosmetic_usage = @current_user.cosmetic_usages.find(params[:id])

        if cosmetic_usage_params.values.any?(&:blank?)
          render json: { message: '更新をスキップしました。' }, status: :ok
          return
        end

        if cosmetic_usage.update(cosmetic_usage_params)
          render json: cosmetic_usage
        else
          render json: cosmetic_usage.errors, status: :unprocessable_entity
        end
      end

      def destroy
        cosmetic_usage = @current_user.cosmetic_usages.find(params[:id])
        if cosmetic_usage.destroy
          render json: { message: '通知設定を削除しました。' }, status: :ok
        else
          render json: { error: '通知設定の削除に失敗しました。' }, status: :unprocessable_entity
        end
      end

      private

      def cosmetic_usage_params
        params.require(:cosmetic_usage).permit(:item_type, :open_date, :expiry_date)
      end
    end
  end
end
