/* 
Consigna: Realizar una clase de nombre "ProductManager", el cual permitirá trabajar con multiples productos. Éste debe poder agregar, consultar,
modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1)

Aspectos a incluir: 

- La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar
desde el momento de generar su instancia. 

- Debe guardar objetos con el siguiente formato:
    - id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
    - title (nombre del producto)
    - desdcription (descripción del producto)
    - price (precio)
    - thumbnail (ruta de imagen)
    - code (código identificador)
    - stock (número de piezas disponibles)

*/

const fs = require("fs")

class ProductManager {

    constructor(path) {
        this.path = path
        this.products = this.#initProducts()
        this.id = 1
    }

    #initProducts() {
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

    #saveProduct() {
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
        this.#saveProduct()
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const productFound = this.products.find(product => product.id === id)
        if (!productFound) console.log("Not found")
        return productFound
    }
}

/*
const productManager = new ProductManager("./JavaScript File System/products.json")

productManager.addProduct("product 1", "description of the product 1", 12, "https://productProvider.com/1", "code1", 43)
productManager.addProduct("product 2", "description of the product 2", 15, "https://productProvider.com/2", "code2", 27)
productManager.addProduct("product 3", "description of the product 3", 7, "https://productProvider.com/3", "code3", 105)

console.log(productManager.getProducts())

*/
