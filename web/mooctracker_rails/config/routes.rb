MooctrackerRails::Application.routes.draw do
  
  get "sessions/create"
  get "sessions/destroy"
  get 'auth/:provider/callback', to: 'sessions#create',  via: 'post'
  get 'auth/failure', to: redirect('/'), via: 'delete'
  get 'signout', to: 'sessions#destroy', as: 'signout', via: 'delete'

  resources :sessions, only: [:create, :destroy]
  resource :home, only: [:show]
  resources :courses
  resources :projects



  match "/api/studentcourse", to: 'studentcourses#index', via:'get'
  match "/api/studentcourse/:id", to: 'studentcourses#show', via:'get'
  match "/api/studentcourse/", to: 'studentcourses#create', via:'post'
  match "/api/studentcourse/:id", to: 'studentcourses#update', via:'put'
  match "/api/studentcourse/:id", to: 'studentcourses#destroy', via:'delete'



  match "/api/project", to: 'projects#index', via:'get'
  match "/api/project/:id", to: 'projects#show', via:'get'
  match "/api/project/", to: 'projects#create', via:'post'
  match "/api/project/:id", to: 'projects#update', via:'put'
  match "/api/project/:id", to: 'projects#destroy', via:'delete'



  match "/api/course", to: 'courses#index', via:'get'
  match "/api/course/:id", to: 'courses#show', via:'get'
  match "/api/course/", to: 'courses#create', via:'post'
  match "/api/course/:id", to: 'courses#update', via:'put'
  match "/api/course/:id", to: 'courses#destroy', via:'delete'


  root to: "home#show"
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
