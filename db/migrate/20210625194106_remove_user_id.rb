class RemoveUserId < ActiveRecord::Migration[6.0]
  def change
    remove_column :tasks, :user_is, :integer
  end
end
