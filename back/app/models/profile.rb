class Profile < ApplicationRecord
  belongs_to :user
  belongs_to :address
  enum age: { '10代': 10, '20代': 20, '30代': 30, '40代': 40, '50代': 50, '60代以上': 60 }
  enum menu_position: { left: 'left', right: 'right' }
end