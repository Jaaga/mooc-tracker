class DropStudentcoursesTable < ActiveRecord::Migration
   def up
    drop_table :studentcourses
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
