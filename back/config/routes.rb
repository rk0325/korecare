Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  root to: proc { [200, {}, ["Welcome to my API!"]] }

  namespace :api do
    namespace :v1 do
      resource :profiles, only: [:show, :update]
      resources :favorite_cosmetics, only: [:index, :create, :destroy]

      namespace :cosmetics_recommendation do
        post :search_cosmetics_for_guests
        post :search_cosmetics_for_logged_in_users
      end

      resource :notifications, only: [] do
        get :status
        post :enable
      end

      get '/weather', to: 'weather#show'
    end
  end

  post 'auth/:provider/callback', to: 'api/v1/users#create'
end
