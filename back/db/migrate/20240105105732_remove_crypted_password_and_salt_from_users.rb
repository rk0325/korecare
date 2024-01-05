class RemoveCryptedPasswordAndSaltFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :crypted_password, :string
    remove_column :users, :salt, :string
  end
end
