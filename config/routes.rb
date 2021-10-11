Rails.application.routes.draw do
  resource :users, only: [:create, :new]

  post 'login', to: 'sessions#create'
  get 'login', to: 'sessions#new'
end
