# frozen_string_literal: true

class AddSkinTypeAndSkinTroubleToReviews < ActiveRecord::Migration[7.0]
  def change
    add_column :reviews, :skin_type, :string
    add_column :reviews, :skin_trouble, :string
  end
end
