class CreateStudentcourses < ActiveRecord::Migration
  def change
    create_table :studentcourses do |t|
      t.string :courseTitle
      t.date :courseStart
      t.date :courseEnd
      t.datetime :createdAt
      t.datetime :updatedAt
      t.string :course_id
      t.string :user_id

      t.timestamps
    end
  end
end
