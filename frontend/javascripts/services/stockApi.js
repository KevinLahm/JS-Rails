class StockApi {

    static url = `${baseUrl}/stocks`

    static showStockForm() {
        let portfolios=document.getElementById("s_portfolio_data");
        portfolios.innerHTML='';
        let html=`
        <form class="form-horizontal" id="stock-form">
            <h3>Add Stock:</h3>
            <div class="form-group">
                <label for="company">Company:</label>
                <input class="form-control" id="company" type="text">
            </div>
            <div class="form-group">
                <label for="ticker">Ticker:</label>
                <input class="form-control" id="ticker" type="text">
            </div>
            <div class="form-group">
                <label for="sector">Sector:</label>
                <select class="form-control" id="sector">
                    <option disabled hidden selected value="">Choose Here</option>
                    <option value="Communication Services">Communication Services</option>
                    <option value="Consumer Discretionary">Consumer Discretionary</option>
                    <option value="Consumer Staples">Consumer Staples</option>
                    <option value="Energy">Energy</option>
                    <option value="Financials">Financials</option>
                    <option value="Industrials">Industrials</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Materials">Materials</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Utilities">Utilities</option>
                </select>
            </div>
            <div class="form-group">
                <label for="s_portfolio">Portfolio:</label>
                <select class="form-control" id="s_portfolio">
                </select>
            </div>
            <div class="form-group">
                <label for="price">Price:</label>
                <input class="form-control" id="price" type="text">
            </div>
            <div class="form-group">
                <label for="shares">Shares:</label>
                <input class="form-control" id="shares" min="1" type="number">
            </div>
            <div class="form-group submit">
                <button class="btn btn-info" type="submit">Submit</button>
            </div>
        </form>`;

        stockFormSection().innerHTML = html;
        PortfoliosApi.dropdownFetchPortfolios()
        stockForm().addEventListener("submit", StockApi.handleSubmit)

    }

    static fetchStocks() {
        let html=`
        <table class="table table-bordered">
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

        const stockSection = () => document.getElementById("stockSection")
        stockSection().innerHTML = html;
        fetch(this.url)
        .then(resp => resp.json())
        .then(json => json.forEach(stockObj => {
            let stock = Stock.findOrCreateBy(stockObj)
            stock.render()
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

    static handleSubmit(e) {
        e.preventDefault()
        const data = {
            company: company().value,
            ticker: ticker().value,
            sector: sector().value,
            portfolio_id: portfolio().value,
            shares: shares().value,
            price: price().value
        }
        fetch(`${baseUrl}/stocks`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(json => {
            let stock = new Stock(json)
            stockForm().reset()
        })
    }

    static handleDelete = (e) => {
        fetch(`${baseUrl}/stocks/${e.target.dataset.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(json => {
            PortfoliosApi.fetchPortfolios()
        })
        .catch(this.handleError)
    }
}