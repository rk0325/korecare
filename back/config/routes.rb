Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
    end
  end
  namespace :current do
    resource :user, only: [:show]
  end
  resources :posts
  post 'auth/:provider/callback', to: 'api/v1/users#create'
end
