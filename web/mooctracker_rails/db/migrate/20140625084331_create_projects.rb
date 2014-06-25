class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.integer :user_id
      t.string :name
      t.text :description
      t.string :source_url
      t.string :project_site_url
      t.string :repo_url
      t.date :start
      t.date :end

      t.timestamps
    end
  end
end
