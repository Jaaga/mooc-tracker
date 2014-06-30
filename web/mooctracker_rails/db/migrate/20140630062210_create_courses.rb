class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :title
      t.datetime :createdAt
      t.datetime :updatedAt

      t.timestamps
    end
  end
end
