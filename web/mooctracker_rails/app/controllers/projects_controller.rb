class ProjectsController < ApplicationController
  before_action :signed_in_user, only: [:create, :edit, :update, :destroy]
  before_action :correct_user,   only: [:edit, :update, :destroy]

#On GET request to /projects it returns all projects.
  def index
  	@projects= Project.all
  	render json: @projects
  end


#On GET request to /projects/id  it returns only project with that id
  def show
    @project = Project.find(params[:id])
    render json: @project
  end


#On POST request to /projects it creates a project with sent data
  def create
  	@project = current_user.projects.build(project_params)
    if @project.save
      flash[:success] = "project created!"
      render json: @project
    else
      @project_items = []
      render 'static_pages/home'
    end
  end


#Edit action is left cause backbone handles edit on itself
  def edit
  end


#Send a PUT/PATCH request on /projects/id , to edit a particular project
  def update
  	@project = Project.find(params[:id])
    if @project.update_attributes(user_params)
      flash[:success] = "Project updated"
      redirect_to @project
    else
      render 'edit'
    end
  end


#Send a DELETE request on /project/id to destroy the project object
  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    redirect_to root_url
  end


  def showProjectToAdmin
    @projects = Project.where("user_id = ?", params[:id])
    render json: @projects
  end

  private 
  #Find if the project id is owned by the current user if yes, he is the correct user
	  def correct_user
	      @project = current_user.projects.find_by(id: params[:id])
	      redirect_to root_url if @project.nil?
	  end
	#strong parameters only, i.e. all coloumns that can be edit by user
	  def project_params
      	params.require(:project).permit(:name, :description, :source_url, :project_site_url, :repo_url, :start, :end)
      end
end
