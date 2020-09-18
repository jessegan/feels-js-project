Rails.application.routes.draw do

  get '/emotions', to: "emotions#index"

  resources :entries, only: [:index,:create,:destroy] do
      get '/emotions', to: "emotions#entry"
  end

end
