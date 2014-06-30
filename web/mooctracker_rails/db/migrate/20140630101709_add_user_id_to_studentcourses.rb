class AddUserIdToStudentcourses < ActiveRecord::Migration
  def change
    add_column :studentcourses, :user_id, :integer
  end
end
