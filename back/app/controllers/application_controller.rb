require 'net/http'
require 'uri'
require 'json'

class ApplicationController < ActionController::API
  include ActionController::Cookies

  def current_user
    @current_user
  end

  private

  def set_current_user
      Rails.logger.info "Current session: #{session.inspect}"  # セッション情報をログに出力

      if request.headers["Authorization"].present?
        received_access_token = request.headers["Authorization"].split(' ').last
      else
        render json: { error: 'Authorization header is missing' }, status: :unauthorized
        return
      end

      if session[:user_id] && session[:access_token] == received_access_token
        # セッションからユーザー情報を取得
        @current_user = User.find_by(id: session[:user_id])
      else
        # Google APIからユーザー情報を取得
        session.delete(:access_token)
        user_info = fetch_user_info_from_google(received_access_token)

        if user_info['sub'].nil?
          render json: { error: 'Failed to fetch user info from Google' }, status: :internal_server_error
          return
        end

        # Googleのuidをもとにユーザー検索
        @current_user = User.find_by(uid: user_info['sub'])

        # ユーザーが見つからなかった場合、新規ユーザーを作成
        if @current_user.nil?
          @current_user = User.create(
            provider: 'google',
            uid: user_info['sub'],
            name: user_info['name'],
            email: user_info['email']
          )
        end

        # セッションにユーザー情報を保存
        session[:user_id] = @current_user.id
        session[:access_token] = received_access_token
      end
      render json: { error: 'Internal Server Error' }, status: :internal_server_error
  end

  # Googleのユーザー情報を取得
  def fetch_user_info_from_google(access_token)
    uri = URI.parse("https://www.googleapis.com/oauth2/v3/userinfo")
    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "Bearer #{access_token}"

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
      http.request(request)
    end

    JSON.parse(response.body)
  end
end