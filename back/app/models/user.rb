class User < ApplicationRecord
  has_one :skin_information
  has_one :profile
end
