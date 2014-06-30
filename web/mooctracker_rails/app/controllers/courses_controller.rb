class CoursesController < ApplicationController
  before_action :signed_in_user, only: [:create, :edit, :update, :destroy, :index :show]
  before_action :correct_user,   only: [:edit, :update, :destroy, :index, :show]
  before_action :admin_user,     only: [:destroy, :create, :update]
  

#On GET request to /courses/ it returns all  courses.  
  def index
    @courses = Course.all
    render json: @courses
  end



#On GET request to /courses/id  it returns only courses with that id
  def show
    @course = Course.find(params[:id])
    render json: @course
  end


#On POST request to /courses it creates a course with sent data
  def create
    @course = current_user.courses.build(course_params)

    if @course.save
      render json: @course
    else
      @course_items = []
    end
  end


#Edit action is left cause backbone handles edit on itself
  def edit
  end



#Send a PUT/PATCH request on /courses/id , to edit a particular course
  def update
    @course = Course.find(params[:id])
    if @course.update_attributes(course_params)
      redirect_to @course
    else
      render 'edit'
    end
  end



#Send a DELETE request on /courses/id to destroy the course object
  def destroy
    @course.destroy
    redirect_to root_url
  end


  private

    def course_params
      params.require(:course).permit(:courseTitle, :url, :start, :end)
    end

    def correct_user
      @course = current_user.courses.find_by(id: params[:id])
      redirect_to root_url if @course.nil?
    end

     def admin_user
      redirect_to(root_url) unless current_user.admin?
    end
end
