class AddAddressIdToProfiles < ActiveRecord::Migration[7.0]
  def change
    add_reference :profiles, :address, foreign_key: true
  end
end
