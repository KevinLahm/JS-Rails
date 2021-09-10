# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Portfolio1 = Portfolio.create(investor: 'Gia Jennings')

Stock.create(company: "Microsoft", ticker: "MSFT", sector: "Technology", price: 301.83, shares: 5, portfolio: Portfolio1)
Stock.create(company: "Tesla", ticker: "TSLA", sector: "Capital Goods", price: 734.09, shares: 107, portfolio: Portfolio1)
Stock.create(company: "Gamestop", ticker: "GME", sector: "Retail/Wholesale", price: 210.57, shares: 259, portfolio: Portfolio1)