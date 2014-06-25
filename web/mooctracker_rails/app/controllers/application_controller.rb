class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

    # For APIs, you may want to use :null_session instead.

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end