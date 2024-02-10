Rails.application.routes.draw do
  post 'auth/:provider/callback', to: 'api/v1/users#create'
  namespace :api do
    namespace :v1 do
      post 'cosmetics_recommendation/search_cosmetics_for_guests', to: 'cosmetics_recommendation#search_cosmetics_for_guests'
      post 'cosmetics_recommendation/search_cosmetics_for_logged_in_users', to: 'cosmetics_recommendation#search_cosmetics_for_logged_in_users'
      resources :profiles, only: [:update]
      get '/profiles', to: 'profiles#show'
      resources :favorite_cosmetics, only: [:index, :create, :destroy]
      resources :addresses, only: [:create]
      post '/line_webhook', to: 'line_webhooks#callback'
    end
  end
end