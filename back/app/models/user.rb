class User < ApplicationRecord
  include DeviseTokenAuth::Concerns::User
  # mount_uploader :avatar, AvatarUploader

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  # validates :password, confirmation: true
  # validates :email, presence: true, uniqueness: true
  # validates :avatar, allow_blank: true
end
