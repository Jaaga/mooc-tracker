class SessionsController < ApplicationController
  def create
      user = User.from_omniauth(env["omniauth.auth"])
      if user.id.present?
        session[:user_id] = user.id
        redirect_to '/dashboard'
        #render json: user
      else
        session[:user_id] = nil
        redirect_to '/login'
      end
  end

  def destroy
    session[:user_id] = nil
    render json: {success: "ok"}

  end
end