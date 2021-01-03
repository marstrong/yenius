Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :artists, only: [:index, :show]
      get '/artists-index/:char', to: 'artists#artists_index'

      resources :albums, only: [:index, :show]

      resources :songs, only: [:index, :show]
      get '/songs-index/:char', to: 'songs#songs_index'

      resources :verses, only: [:index, :show]
      
      resources :comments
      get '/albums/:commentableId/comments', to: 'comments#album_comments'
      get '/artists/:commentableId/comments', to: 'comments#artist_comments'
      get '/songs/:commentableId/comments', to: 'comments#song_comments'
      get '/verses/:commentableId/comments', to: 'comments#verse_comments'

      resources :users
      
      resource :session, only: [:create, :destroy]

      resources :artist_roles
      resources :artist_credits
      resources :song_roles
      resources :song_credits
    end
  end
end
