class StockSerializer < ActiveModel::Serializer
  attributes :company, :ticker, :sector, :price, :shares, :portfolio, :id
  belongs_to :portfolio
end
