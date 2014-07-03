class StudentcoursesController < ApplicationController
  before_action :signed_in_user, only: [:create, :index, :show]
  before_action :correct_user,   only: [:edit, :update, :destroy]
  before_action :admin_user,     only: [:showCourseToAdmin]


#On GET request to /studentcourses/ it returns all student courses.
  def index
    if current_user.admin?
      @studentcourses = Studentcourse.all
      render json: @studentcourses
    else
      @studentcourses= Studentcourse.where("user_id = ?", current_user)
      render json: @studentcourses
    end
  end


#On GET request to /studentcourses/id  it returns only studentcourses with that id
  def show
    @studentcourse = Studentcourse.find(params[:id])
    render json: @studentcourse
  end


#On POST request to /studentcourses it creates a studentcourse with sent data
  def create
    @studentcourse = current_user.studentcourses.build(studentcourse_params)

    if @studentcourse.save
      render json: @studentcourse
    else
      @studentcourse_items = []
    end
  end


#Edit action is left cause backbone handles edit on itself
  def edit
  end


#Send a PUT/PATCH request on /studentcourses/id , to edit a particular studentcourse
  def update
    @studentcourse = Studentcourse.find(params[:id])
    if @studentcourse.update_attributes(studentcourse_params)
      redirect_to @studentcourse
    else
      render 'edit'
    end
  end



#Send a DELETE request on /studentcourses/id to destroy the studentcourse object
  def destroy
  	@studentcourse = Studentcourse.find(params[:id])
    @studentcourse.destroy
    redirect_to root_url
  end


  def showCourseToAdmin
  	@courses = Studentcourse.where("user_id = ?", params[:id])
  	render json: @courses
  end


private

    def studentcourse_params
      params.require(:studentcourse).permit(:course_id, :course,:courseTitle, :courseStart, :courseEnd, :updates, :createAt, :updatedAt, :user_id)
    end

    def correct_user
      @course = current_user.studentcourses.find_by(user_id: params[:id])
      head 403 if @course.nil?
    end

    def admin_user
      head 403 unless current_user.admin?
    end

end
