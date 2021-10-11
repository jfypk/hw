Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'tests', to: "tests#index" 
    end
  end
end
