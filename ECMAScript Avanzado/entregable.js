class ProductManager {

    constructor() {
        this.products = []
        this.id = 1
    }
    
    #validateCode(code) {
        const codeFound = this.products.find(product => product.code === code)
        return codeFound
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const codeFound = this.#validateCode(code)
        if (codeFound) {
            console.log("Code already exists in the database")
            return 
        }
        let product = {
            id: this.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.id++
        this.products.push(product)
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const productFound = this.products.find(product => product.id === id)
        if (!productFound) console.log("Not found") // la consigna no especifica retornar nada asi que va a retornar undefined
        return productFound
    }
}