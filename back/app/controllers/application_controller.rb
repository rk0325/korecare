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
      # LINE APIからユーザー情報を取得
      session.delete(:access_token)
      user_info = fetch_user_info_from_line(received_access_token)

      if user_info['userId'].nil?
        Rails.logger.error "LINE API response is missing the userId field: #{response.body}"
        render json: { error: 'Failed to fetch user info from LINE' }, status: :internal_server_error
        return
      end

      # LINEのuserIdをもとにユーザー検索
      @current_user = User.find_or_initialize_by(uid: user_info['userId'], provider: 'line')

      # ユーザー情報を更新
      @current_user.name = user_info['displayName'] if user_info['displayName']
      @current_user.avatar = user_info['pictureUrl'] if user_info['pictureUrl']

      if @current_user.save
        # セッションにユーザー情報を保存
        session[:user_id] = @current_user.id
        session[:access_token] = received_access_token
        Rails.logger.debug "Received access token: #{received_access_token}"
        Rails.logger.debug "Found user: #{@current_user.inspect}"
      else
        # ユーザー情報の保存に失敗した場合のエラーメッセージをログに出力
        Rails.logger.error "Failed to save user: #{@current_user.errors.full_messages.join(', ')}"
        render json: { error: 'Failed to save user info' }, status: :internal_server_error
        return
      end
    end
  end

  # LINEのユーザー情報を取得
  def fetch_user_info_from_line(access_token)
    uri = URI.parse("https://api.line.me/v2/profile")
    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "Bearer #{access_token}"

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
      http.request(request)
    end

    Rails.logger.info "LINE API Response: #{response.body}"

    JSON.parse(response.body)
  end
end
