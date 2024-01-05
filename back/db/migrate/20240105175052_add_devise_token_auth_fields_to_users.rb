class AddDeviseTokenAuthFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :confirmation_token, :string
    add_column :users, :confirmed_at, :datetime
    add_column :users, :confirmation_sent_at, :datetime
    add_column :users, :unconfirmed_email, :string
    add_column :users, :allow_password_change, :boolean, default: false

    add_index :users, :confirmation_token,   unique: true
  end
end
