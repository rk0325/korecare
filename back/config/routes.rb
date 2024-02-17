Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
  namespace :api do
    namespace :v1 do
      resources :profiles, only: [:update]
      resources :favorite_cosmetics, only: [:index, :create, :destroy]
      resources :weather, only: [:create, :show]
      get '/profiles', to: 'profiles#show'
      post 'cosmetics_recommendation/search_cosmetics_for_guests', to: 'cosmetics_recommendation#search_cosmetics_for_guests'
      post 'cosmetics_recommendation/search_cosmetics_for_logged_in_users', to: 'cosmetics_recommendation#search_cosmetics_for_logged_in_users'
      get '/line_webhook', to: 'line_webhooks#callback'
      post '/line_webhook', to: 'line_webhooks#callback'
      get '/notifications/status', to: 'notifications#status'
      post '/notifications/enable', to: 'notifications#enable'
    end
  end
  post 'auth/:provider/callback', to: 'api/v1/users#create'
end