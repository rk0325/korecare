class ApplicationController < ActionController::API
  before_action do
    I18n.locale = :ja
  end
end