Rails.application.routes.draw do
  resources :tasks, only: [:index], param: :slug
  resources :tasks, only: [:index, :create]
  resources :tasks, except: %i[new edit], param: :slug
  resources :tasks, except: %i[new edit]
  resources :users, only: %i[create index]
  resource :sessions, only: :create

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
