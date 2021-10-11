class Users < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password
      t.text :first_name
    end
  end
end
