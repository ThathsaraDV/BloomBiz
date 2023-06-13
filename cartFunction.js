const connectIDB = new Promise((resolve, reject) => {

    const request = window.indexedDB.open('bloom_biz', 1);

    request.addEventListener('upgradeneeded', e => {
        db = e.target.result;
        const objectStore = db.createObjectStore('buy_products', {keyPath: 'id', autoIncrement: true})
        objectStore.createIndex('products', 'products', {unique: false});
    })
    request.addEventListener('error', e => {
        reject();
    })
    request.addEventListener('success', () => {
        resolve(request.result);
    })

})

const addProduct = (product) => {
    return new Promise((resolve, reject) => {

        connectIDB.then((response) => {
            const transaction = response.transaction(['buy_products'], 'readwrite');
            const objectStore = transaction.objectStore('buy_products');
            const newRecord = {products: product};
            const request = objectStore.add(newRecord);

            request.addEventListener('success', () => {
                resolve();
            })
            transaction.addEventListener('complete', () => {

            })
            transaction.addEventListener('error', () => {
                reject();
            })
        })
    })
}

function getProducts() {
    return new Promise((resolve, reject) => {
        let products = new Array();
        connectIDB.then((response) => {
            const objectStore = response.transaction('buy_products').objectStore('buy_products');

            objectStore.getAll().onsuccess = function (event) {
                products = event.target.result;
                console.log("get", products);
                resolve(products);
            }
        })
    })
}

const deleteProducts = (productIndex) => new Promise((resolve, reject) => {

    connectIDB.then((response) => {
        const transaction = response.transaction(['buy_products'], 'readwrite')
        const objectStore = transaction.objectStore('buy_products')
        const request = objectStore.delete(productIndex)

        transaction.addEventListener('complete', () => {

        })

        request.addEventListener('success', () => {
            resolve();
        })
    })

})

const clearObjectStore = () => new Promise((resolve, reject) => {

    connectIDB.then((response) => {
        const transaction = response.transaction(['buy_products'], 'readwrite')
        const objectStore = transaction.objectStore('buy_products')
        const request = objectStore.clear();

        transaction.addEventListener('complete', () => {

        })

        request.addEventListener('success', () => {
            resolve();
        })
    })

})