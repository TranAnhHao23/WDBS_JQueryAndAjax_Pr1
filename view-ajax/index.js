function getProduct() {
    $.ajax({
        type: "GET",
        // ten API
        url: `http://localhost:8080/products`,
        // xu ly khi thanh cong
        success: function (products) {
            let content = '<tr>\n' +
                '<th> Product Name</th>\n' +
                '<th>Price</th>\n' +
                '<th>Quantity</th>' +
                '<th>Description</th>' +
                '<th colspan="2">Action</th></tr>'
            for (let i = 0; i < products.length; i++) {
                content += displayProduct(products[i]);
            }
            document.getElementById('tableProduct').innerHTML = content;
            document.getElementById("formCreate").hidden = true;
        }
    })
}

function displayProduct(product) {
    return `<tr><td >${product.name}</td><td>${product.price}</td><td >${product.quantity}</td><td>${product.description}</td>
                    <td><button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button></td>
                    <td><button class="btn btn-warning" onclick="editProduct(${product.id})">Edit</button></td>`;
}

function deleteProduct(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/products/${id}`,
        success: function () {
            getProduct()
        }
    })
}

function editProduct(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/products/${id}`,
        success: function (product) {
            $('#name').val(product.name);
            $('#price').val(product.price);
            $('#quantity').val(product.quantity);
            $('#description').val(product.description);

            document.getElementById("formCreate").hidden = false;
            document.getElementById("form-button").onclick = function () {
                editProduct1(id)
            };
        }
    })

}

function editProduct1(id) {
    let name = $('#name').val();
    let price = $('#price').val();
    let quantity = $('#quantity').val();
    let description = $('#description').val();
    let newProduct = {
        name: name,
        price: price,
        quantity: quantity,
        description: description,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newProduct), // ep kieu ve JSON
        url: `http://localhost:8080/products/${id}`,
        success: function () {
            getProduct()
        }
    })
    event.preventDefault();
}

function createProduct() {
    document.getElementById("formCreate").reset();
    document.getElementById("formCreate").hidden = false;
    document.getElementById("form-button").onclick = function () {
        createNewProduct()
    };
}

function createNewProduct() {
    let name = $('#name').val();
    let price = $('#price').val();
    let quantity = $('#quantity').val();
    let description = $('#description').val();
    let newProduct = {
        name: name,
        price: price,
        quantity: quantity,
        description: description,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newProduct), // ep kieu ve JSON
        url: `http://localhost:8080/products`,
        success: function () {
            getProduct();
        }
    })
    event.preventDefault();
}

function searchProduct() {
    let search = document.getElementById("search").value;
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/products/search?search=${search}`,

        success: function (products) {
            let content = '<tr>\n' +
                '<th> Product Name</th>\n' +
                '<th>Price</th>\n' +
                '<th>Quantity</th>' +
                '<th>Description</th>' +
                '<th colspan="2">Action</th></tr>'
            for (let i = 0; i < products.length; i++) {
                content += displayProduct(products[i]);
            }
            document.getElementById('tableProduct').innerHTML = content;
            document.getElementById("formCreate").hidden = true;
        }
    })
    event.preventDefault();
}

getProduct();