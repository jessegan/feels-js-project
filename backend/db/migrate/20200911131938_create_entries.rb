class CreateEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :entries do |t|
      t.integer :rating
      t.text :note

      t.timestamps
    end
  end
end
