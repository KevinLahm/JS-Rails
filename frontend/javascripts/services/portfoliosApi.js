class PortfoliosApi {
    static url = `${baseUrl}/portfolios`

    static fetchPortfolios() {
        let portfolios=document.getElementById("s_portfolio_data");
        portfolios.innerHTML='';
        let stockForm=document.getElementById("new-form-section");
        stockForm.innerHTML='';
        const h2 = document.createElement("h2")
        h2.innerText = 'Portfolios'
        portfolioSection().appendChild(h2)
        fetch(`${baseUrl}/portfolios`)
        .then(resp => resp.json())
        .then(json => json.forEach(pObj => {
            let port = Portfolio.findOrCreateBy(pObj)
            port.render()
        }))
        .catch(this.handleError)
    }

    static fetchPortfolioStocks = (e) => {
        if (document.contains(document.getElementById("stocks_table"))) {
            document.getElementById("stocks_table").remove();
        }
        let html=`
        <table class="table table-bordered" id="stocks_table">
            <thead>
            <tr>
                <th>Company</th>
                <th>Ticker</th>
                <th>sector</th>
                <th>Portfolio</th>
                <th>Price</th>
                <th>Shares</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody id="table_data">
            </tbody>
        </table>`;
        const stockSection = () => document.getElementById(`stocks-${e.target.dataset.id}`)

        stockSection().innerHTML = html;
        fetch(`${baseUrl}/portfolios/${e.target.dataset.id}`)
            .then(resp => resp.json())
            .then(json => {
                let stocks = json.stocks
                stocks.forEach(stockObj => {
                    let stock = Stock.findOrCreateBy(stockObj)
                    stock.render()
                })
            })
            .catch(this.handleError)
    }

    static dropdownFetchPortfolios() {
        fetch(this.url)
        .then(resp => resp.json())
        .then(json => json.forEach(pObj => {
            let port = Portfolio.findOrCreateBy(pObj)
            port.addToDropDown()
        }))
        .catch(this.handleError)
    }

    static handleError(error) {
        flash().innerText = error
        flash().classList.remove("hide")
        setTimeout(() => {
            flash().innerText = ""
            flash().classList.add("hide")
        }, 5000)
    }
}