class CreateStudentcourses < ActiveRecord::Migration
  def change
    create_table :studentcourses do |t|
      t.integer :course_id
      t.integer :course
      t.string :courseTitle
      t.datetime :courseStart
      t.datetime :couseEnd
      t.string :updates, array: true
      t.datetime :createAt
      t.datetime :updatedAt

      t.timestamps
    end
  end
end
