class Api::V1::Current::UsersController < Api::V1::BaseController
  before_action :authenticate_user!

  def show
    render json: current_user, serializer: CurrentUserSerializer
  end
end