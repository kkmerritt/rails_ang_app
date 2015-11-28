class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.references :user, index: true, foreign_key: true

      t.string :title
      t.string :body
      t.date :date

      t.timestamps null: false
    end
    add_index :articles, :user

  end
end
