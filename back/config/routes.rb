Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  post 'auth/:provider/callback', to: 'api/v1/users#create'
  namespace :api do
    namespace :v1 do
      post 'cosmetics_recommendation/search_cosmetics_for_guests', to: 'cosmetics_recommendation#search_cosmetics_for_guests'
      post 'cosmetics_recommendation/search_cosmetics_for_logged_in_users', to: 'cosmetics_recommendation#search_cosmetics_for_logged_in_users'
      resources :profiles, only: [:update]
      get '/profiles', to: 'profiles#show'
      resources :favorite_cosmetics, only: [:index, :create, :destroy]
      resources :weather, only: [:create, :show]
      post '/line_webhook', to: 'line_webhooks#callback'
      get '/line_webhook', to: 'line_webhooks#callback'
      post '/notifications/enable', to: 'notifications#enable'
      get '/notifications/status', to: 'notifications#status'
    end
  end
end