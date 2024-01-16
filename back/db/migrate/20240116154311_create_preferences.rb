class CreatePreferences < ActiveRecord::Migration[7.0]
  def change
    create_table :preferences do |t|
      t.references :user, foreign_key: true
      t.string "skin_type", null: false
      t.string "skin_trouble", null: false
      t.integer "age_group", null: false
      t.timestamps
    end
  end
end
