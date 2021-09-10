class Stock {
    static all = []

    constructor({portfolio, company, ticker, sector, price, shares,id}) {
        this.portfolio = portfolio.investor
        this.company = company;
        this.ticker = ticker;
        this.sector = sector;
        this.price = price;
        this.shares = shares;
        this.id = id;
        Stock.all.push(this)
    }

    static findByName(company) {
        return this.all.find(function(stock) { stock.company === company})
    }

    static findById(id) {
        return this.all.find(stock => stock.id === id)
    }

    static findOrCreateBy(stockObj) {
        return this.findByName(stockObj.company) || new Stock(stockObj)
    }



    render() {
        const tr = document.createElement("tr")
        tr.innerHTML = `
        <tr>
        <td>${this.company}</td>
        <td>${this.ticker}</td>
        <td>${this.sector}</td>
        <td>${this.portfolio}</td>
        <td>${this.price}</td>
        <td>${this.shares}</td>
        <td>
        <button class="delete-product" data-id="${this.id}">Delete</button>
        </td>
        </tr>`

        tableSection().appendChild(tr)
        document.querySelector(`button.delete-product[data-id='${this.id}']`).addEventListener("click", StockApi.handleDelete)
    }
}