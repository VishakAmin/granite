class CreateLogs < ActiveRecord::Migration[6.0]
  def change
    create_table :logs do |t|
      t.integer :task_id
      t.text :message
      t.timestamps
    end
  end
end