Rails.application.routes.draw do
  resources :tasks, only: [:index], param: :slug
  resources :tasks, only: [:index, :create]



  root "home#index"
  get '*path', to: 'home#index', via: :all
end
