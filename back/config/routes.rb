Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  root to: proc { [200, {}, ["Welcome to my API!"]] }

  namespace :api do
    namespace :v1 do
      resource :profiles, only: [:show, :update]
      resources :favorite_cosmetics, only: [:create, :index, :destroy]
      resources :cosmetic_usages, only: [:create, :index, :destroy]

      namespace :search_cosmetics do
        post :for_guests
        post :for_logged_in_users
        post :recommendations
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
