const fs = require("fs")

class ProductManager {

    constructor(path) {
        this.path = path
        this.products = this.#readProducts()
        this.id = this.#initId()
    }

    #initId() {
        if (this.products.length == 0) return 1
        let highestIdProduct = this.products.reduce((prev, current) => {
            return (prev.id > current.id) ? prev : current;
        })
        return highestIdProduct.id + 1
    }

    #readProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const fileProducts = fs.readFileSync(this.path, 'utf-8')
                return JSON.parse(fileProducts)
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    #saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        } catch (error) {
            console.log(error)
        }
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
        this.#saveProducts()
    }

    getProducts() {
        return this.#readProducts()
    }

    getProductById(id) {
        const productFound = this.products.find(product => product.id === id)
        if (!productFound) throw new Error("Product not found")
        return productFound 
    }

    updateProduct(id, propertiesToUpdate) {
        let productIndex = this.products.findIndex(product => product.id === id)
        if (productIndex == -1) throw new Error("Product not found")
        this.products[productIndex] = {...this.products[productIndex], ...propertiesToUpdate}
        this.#saveProducts()
    }

    deleteProduct(id) {
        let productIndex = this.products.findIndex(product => product.id === id)
        if (productIndex < 0) throw new Error("Product not found")
        this.products.splice(productIndex, 1)
        this.#saveProducts()
    }
}

/*
const productManager = new ProductManager("./JavaScript File System/products.json")

productManager.addProduct("product 1", "description of the product 1", 12, "https://productProvider.com/1", "code1", 43)
productManager.addProduct("product 2", "description of the product 2", 15, "https://productProvider.com/2", "code2", 27)
productManager.addProduct("product 3", "description of the product 3", 7, "https://productProvider.com/3", "code3", 105)

productManager.updateProduct(5, {thumbnail: "hola2"})

console.log(productManager.getProducts())

*/