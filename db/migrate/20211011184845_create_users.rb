class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    drop_table :users
    create_table :users do |t|
      t.string :email
      t.string :password
      t.text :first_name

      t.timestamps
    end
  end
end
