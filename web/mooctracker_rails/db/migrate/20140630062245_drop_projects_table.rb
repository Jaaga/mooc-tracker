class DropProjectsTable < ActiveRecord::Migration
     def up
    drop_table :projects
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
