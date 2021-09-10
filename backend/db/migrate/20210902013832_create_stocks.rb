class CreateStocks < ActiveRecord::Migration[6.1]
  def change
    create_table :stocks do |t|
      t.string :company
      t.string :ticker
      t.string :sector
      t.float :price
      t.integer :shares
      t.belongs_to :portfolio, null: false, foreign_key: true

      t.timestamps
    end
  end
end
