class ChangeFieldsToMatchBackboneApp < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.datetime :createdAt
      t.datetime :updatedAt
    end

    change_table :courses do |t|
      t.remove :url
      t.remove :start
      t.remove :end
      t.datetime :createdAt
      t.datetime :updatedAt
    end

    change_table :projects do |t|
      t.rename :name, :title
      t.rename :project_site_url, :projectSite
      t.rename :repo_url, :githubUrl
      t.rename :source_url, :tutorialUrl
      t.datetime :createdAt
      t.datetime :updatedAt
    end
  end
end
