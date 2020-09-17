Rails.application.routes.draw do

  resources :emotions
  resources :entries, only: [:index,:create,:destroy]

end
