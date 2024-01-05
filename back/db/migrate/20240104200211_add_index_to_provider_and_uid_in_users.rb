class AddIndexToProviderAndUidInUsers < ActiveRecord::Migration[7.0]
  def change
    add_index :users, [:provider, :uid], unique: true
  end
end
