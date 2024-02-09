class CreateAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses do |t|
      t.references :user, foreign_key: true
      t.text :address

      t.timestamps
    end
  end
end
