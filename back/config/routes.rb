Rails.application.routes.draw do
  post 'auth/:provider/callback', to: 'api/v1/users#create'
  namespace :api do
    namespace :v1 do
      post 'preferences/search_cosmetics', to: 'preferences#search_cosmetics'
      get 'preferences/search_cosmetics', to: 'preferences#search_cosmetics'
    end
  end
end
