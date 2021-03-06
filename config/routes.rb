Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:new, :show, :create, :destroy]
    resources :users, only: [:new, :show, :index, :create, :edit, :update]
    resources :tracks, only: [:create, :destroy, :index, :show, :update]
    resources :series, only: [:create, :destroy, :index, :show, :update]
    resources :comments, only: [:create, :destroy, :index, :show, :update]
    resources :likes, only: [:create, :destroy, :index, :show]
    resources :memberships, only: [:create, :destroy]
  end
end
