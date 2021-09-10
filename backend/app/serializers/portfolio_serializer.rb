class PortfolioSerializer < ActiveModel::Serializer
  attributes :investor, :id
  has_many :stocks
end
