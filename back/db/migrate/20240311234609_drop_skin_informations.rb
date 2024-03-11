class DropSkinInformations < ActiveRecord::Migration[7.0]
  def change
    drop_table :skin_informations do |t|
      t.string :name
      t.integer :value
      t.string :age_group
    end
  end
end
