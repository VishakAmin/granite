class AddEmailAndPasswordDigestToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :email, :string, null:false, index: {  unique: true }
    add_column :users, :password_digest, :string, null: false
  end
end
