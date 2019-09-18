Rails.application.routes.draw do
  devise_for :users
  root to: 'comments#index'
  resources :users, only:  [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :comments, only: [:index, :create]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
