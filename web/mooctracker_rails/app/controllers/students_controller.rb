class StudentsController < ApplicationController
  before_action :admin_user,     only: [:destroy, :create, :update]


#On POST request to /students it creates a student with sent data
  def create
    @student = current_user.students.build(student_params)
    if @student.save
      render json: @student
    else
      @student_items = []
    end
  end


#Edit action is left cause backbone handles edit on itself
  def edit
  end



#Send a PUT/PATCH request on /students/id , to edit a particular student
  def update
    @student = Student.find(params[:id])
    if @student.update_attributes(student_params)
      redirect_to @student
    else
      render 'edit'
    end
  end



#Send a DELETE request on /students/id to destroy the student object
  def destroy
    @student = Student.find(params[:id])
    @student.destroy
    render json: {success: "ok"}
  end


	 


	private

	def student_params
      params.require(:student).permit(:name, :email)
    end


    def admin_user
      head 403 unless current_user.admin?
    end

end
