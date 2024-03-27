# frozen_string_literal: true

class CreateReviewTags < ActiveRecord::Migration[7.0]
  def change
    create_table :review_tags do |t|
      t.references :review, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
