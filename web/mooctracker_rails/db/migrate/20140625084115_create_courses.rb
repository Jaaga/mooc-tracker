class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.integer :user_id
      t.string :title
      t.string :url
      t.date :start
      t.date :end

      t.timestamps
    end
  end
end
