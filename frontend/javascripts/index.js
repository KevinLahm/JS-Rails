document.addEventListener("DOMContentLoaded", () => {
    newFormSection().addEventListener("click", StockApi.showStockForm)
    showPortfolios().addEventListener("click", PortfoliosApi.fetchPortfolios)
})