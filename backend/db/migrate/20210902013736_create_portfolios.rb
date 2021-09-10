class CreatePortfolios < ActiveRecord::Migration[6.1]
  def change
    create_table :portfolios do |t|
      t.string :investor

      t.timestamps
    end
  end
end
