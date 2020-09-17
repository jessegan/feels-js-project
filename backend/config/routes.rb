Rails.application.routes.draw do

  resources :emotions, only: [:show]
  resources :entries, only: [:index,:create,:destroy]

end
