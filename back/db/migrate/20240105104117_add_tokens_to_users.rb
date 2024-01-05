class AddTokensToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :tokens, :text
  end
end
