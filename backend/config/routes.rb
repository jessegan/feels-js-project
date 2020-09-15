Rails.application.routes.draw do

  resources :entries, only: [:index,:create,:destroy]

end
