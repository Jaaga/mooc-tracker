class UsersController < ApplicationController
	  before_action :admin_user,     only: [:destroy, :create, :update]

 def index
    @users = User.all
    render json: @users
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
      redirect_to root_url if @user.nil?
    end

     def admin_user
      redirect_to(root_url) unless current_user.admin?
    end


end