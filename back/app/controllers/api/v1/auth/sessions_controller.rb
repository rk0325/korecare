module Api
  module V1
    module Auth
      class SessionsController < ApplicationController
        def index
          if current_user
            render json: { is_login: true, data: current_user }
          else
            render json: { is_login: false, message: 'ユーザーが存在しません' }
          end
        end
      end
    end
  end
end