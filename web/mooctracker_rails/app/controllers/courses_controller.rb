class CoursesController < ApplicationController
  before_action :signed_in_user, only: [:create, :edit, :update, :destroy]
  before_action :correct_user,   only: [:edit, :update, :destroy]

  
  def index
    @courses = Course.all
    render json: @courses
  end

  def show
    @course = Course.find(params[:id])
    render json: @course
  end

  def create
    @course = current_user.courses.build(course_params)

    if @course.save
      render json: @course
    else
      @course_items = []
    end
  end

  def edit
  end

  def update
    @course = Course.find(params[:id])
    if @course.update_attributes(course_params)
      redirect_to @course
    else
      render 'edit'
    end
  end

  def destroy
    @course.destroy
    redirect_to root_url
  end

  private

    def course_params
      params.require(:course).permit(:title, :url, :start, :end)
    end

    def correct_user
      @course = current_user.courses.find_by(id: params[:id])
      redirect_to root_url if @course.nil?
    end
end
