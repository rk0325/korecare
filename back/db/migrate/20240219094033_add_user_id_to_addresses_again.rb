class AddUserIdToAddressesAgain < ActiveRecord::Migration[7.0]
  def up
    add_reference :addresses, :user, index: true, foreign_key: true
  end

  def down
    remove_reference :addresses, :user, index: true, foreign_key: true
  end
end