class AddPrefectureToProfiles < ActiveRecord::Migration[7.0]
  def change
    add_column :profiles, :prefecture, :string
  end
end
