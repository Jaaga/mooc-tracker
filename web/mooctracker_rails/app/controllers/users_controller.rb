class UsersController < ApplicationController
    before_action :signed_in_user, only: [:index, :show, :current]
	  before_action :admin_user,     only: [:destroy, :create, :update]

 def index
    @users = User.where("admin = ?", false)
    render json: @users
  end

 def currentUser
  @user = User.find(session[:user_id])
  render json: @user 
 end

#On GET request to /student/id  it returns only users with that id
  def show
    @user = User.find(params[:id])
    render json: @user
  end

#On POST request to /student it creates a user with sent data
  def create
    @user = current_user.users.build(user_params)

    if @user.save
      render json: @user
    else
      @user_items = []
    end
  end


#Edit action is left cause backbone handles edit on itself
  def edit
  end



#Send a PUT/PATCH request on /student/id , to edit a particular user
  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      redirect_to @user
    else
      render 'edit'
    end
  end



#Send a DELETE request on /student/id to destroy the user object
  def destroy
    @user.destroy
    redirect_to root_url
  end


  private

    def user_params
      params.require(:user).permit(:userTitle, :url, :start, :end)
    end

    def correct_user
      @user = current_user.users.find_by(id: params[:id])
      head 403 if @user.nil?
    end

     def admin_user
      head 403 unless current_user.admin?
    end


end
