Rails.application.routes.draw do
  post 'auth/:provider/callback', to: 'api/v1/users#create'
  namespace :api do
    namespace :v1 do
      post 'skin_information/search_cosmetics', to: 'skin_information#search_cosmetics'
      resources :profiles, only: [:update]
      get '/profiles', to: 'profiles#show'
    end
  end
end
