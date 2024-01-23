class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.string :skin_trouble
      t.string :skin_type
      t.integer :age
      t.timestamps
    end
  end
end
