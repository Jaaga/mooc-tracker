class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title
      t.text :description
      t.string :projectSite
      t.string :githubUrl
      t.datetime :createdAt
      t.datetime :updatedAt

      t.timestamps
    end
  end
end
