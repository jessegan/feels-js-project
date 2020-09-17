class CreateEntryEmotions < ActiveRecord::Migration[6.0]
  def change
    create_table :entry_emotions do |t|
      t.references :entry, null: false, foreign_key: true
      t.references :emotion, null: false, foreign_key: true

      t.timestamps
    end
  end
end
