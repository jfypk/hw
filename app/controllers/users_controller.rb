class UsersController < ApplicationController
  def create
    user = User.create(
      first_name: params[:first_name], 
      password: params[:password], 
      email: params[:email]
    )

    session[:user_id] = user.id

    render json: {
      message: 'User saved',
      logged_in: logged_in?
    }, status: :created
  end

  private

  def create_params
    params.require(:email).permit(:first_name, :password)
  end
end
