# frozen_string_literal: true

require 'net/http'
require 'uri'
require 'json'

class ApplicationController < ActionController::API
  include ActionController::Cookies

  attr_reader :current_user

  private

  def set_current_user
    Rails.logger.info "Current session: #{session.inspect}"

    if request.headers['Authorization'].present?
      received_access_token = request.headers['Authorization'].split(' ').last
    else
      render json: { error: 'Authorization header is missing' }, status: :unauthorized
      return
    end

    if session[:user_id] && session[:access_token] == received_access_token
      @current_user = User.find_by(id: session[:user_id])
    else
      session.delete(:access_token)
      user_info = fetch_user_info_from_line(received_access_token)

      if user_info['userId'].nil?
        Rails.logger.error "LINE API response is missing the userId field: #{response.body}"
        render json: { error: 'Failed to fetch user info from LINE' }, status: :internal_server_error
        return
      end

      @current_user = User.find_or_initialize_by(uid: user_info['userId'], provider: 'line')

      @current_user.name = user_info['displayName'] if user_info['displayName']
      @current_user.avatar = user_info['pictureUrl'] if user_info['pictureUrl']

      if @current_user.save
        session[:user_id] = @current_user.id
        session[:access_token] = received_access_token
      else
        Rails.logger.error "Failed to save user: #{@current_user.errors.full_messages.join(', ')}"
        render json: { error: 'Failed to save user info' }, status: :internal_server_error
      end
    end
  end

  def fetch_user_info_from_line(access_token)
    uri = URI.parse('https://api.line.me/v2/profile')
    request = Net::HTTP::Get.new(uri)
    request['Authorization'] = "Bearer #{access_token}"

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
      http.request(request)
    end

    if response.code != '200'
      Rails.logger.error "LINE API Error: #{response.body}"
      error_response = JSON.parse(response.body)
      if error_response['message'] == 'invalid token'
        render json: { error: 'Invalid token. Please re-authenticate.' }, status: :unauthorized
      else
        render json: { error: 'Failed to fetch user info from LINE', details: response.body },
               status: :internal_server_error
      end
      return
    end

    JSON.parse(response.body)
  end
end
