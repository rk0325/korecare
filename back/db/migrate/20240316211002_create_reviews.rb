class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.references :favorite_cosmetic, null: false, foreign_key: true
      t.integer :rating
      t.string :title
      t.text :body
      t.boolean :visibility

      t.timestamps
    end
  end
end
