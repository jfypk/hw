class SessionsController < ApplicationController
  def new
    render json: {
      message: 'User login status',
      logged_in: logged_in?
    }, status: :ok
  end

  def create
    @user = User.find_by(email: params[:email])

    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id

      render json: {
        message: 'User logged in',
        logged_in: logged_in?
      }, status: :ok
    else
      render json: {
        message: 'User failed login',
        logged_in: logged_in?
      }, status: :ok
    end

  end
end
