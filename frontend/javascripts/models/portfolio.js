class Portfolio {
    static all = []
    static dropDownOptions = []

    constructor({id, investor, stocks}) {
        this.id = id;
        this.investor = investor;
        this.stocks = stocks;
        Portfolio.all.push(this)
    }

    static getAll() {
        return this.all
    }

    static findByName(investor) {
       return this.all.find(function(portfolio) { portfolio.investor === investor})
    }

    static findById(portfolio_id) {
        return this.all.find(portfolio => portfolio.portfolio_id === portfolio_id)
    }

    static findOrCreateBy(pObj) {
        return this.findByName(pObj.investor) || new Portfolio(pObj)
    }

    getStocks() {
        return Stock.all.filter(stock => this.id === stock.id )
    }

    addToDropDown() {
        const option = document.createElement("option")
        option.value = this.id
        option.innerText = this.investor
        stockSelectPortfolio().append(option)
    }

    render() {
        const h4 = document.createElement("h4")
        const div = document.createElement("div")
        div.id = `stocks-${this.id}`
        div.classList.add(`stocks_data`);

        const a = document.createElement("a")
        a.id = `Portfolio-${this.id}`
        a.innerText = this.investor
        a.href = "####"
        a.classList.add(`view_stocks`);
        a.setAttribute(`data-id` , `${this.id}`);
        a.addEventListener("click", this.renderStocks)
        h4.appendChild(a)
        portfolioSection().appendChild(h4)
        portfolioSection().appendChild(div)
        document.querySelector(`a.view_stocks[data-id='${this.id}']`).addEventListener("click", PortfoliosApi.fetchPortfolioStocks)
    }
}
