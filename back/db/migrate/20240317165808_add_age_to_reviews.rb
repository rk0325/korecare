class AddAgeToReviews < ActiveRecord::Migration[7.0]
  def change
    add_column :reviews, :age, :integer
  end
end
