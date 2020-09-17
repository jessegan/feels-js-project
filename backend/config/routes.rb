Rails.application.routes.draw do

  resources :entries, only: [:index,:create,:destroy] do
      get '/emotions', to: "emotions#index"
  end

end
