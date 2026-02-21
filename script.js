let totalAmount = 0;
let cartItems = [];

function addToCart(productName, pricePerKilo, qtyId) {
    let quantity = parseFloat(document.getElementById(qtyId).value);

    if (quantity > 0) {
        let subtotal = pricePerKilo * quantity;
        totalAmount += subtotal;
        cartItems.push({ name: productName, qty: quantity, price: subtotal });

        let orderList = document.getElementById('order-list');
        let listItem = document.createElement('li');
        listItem.innerText = productName + " (" + quantity + "kg) - ₱" + subtotal.toFixed(2);
        orderList.appendChild(listItem);

        document.getElementById('total-price').innerText = totalAmount.toFixed(2);
    }
}

function submitOrder() {
    let name = document.getElementById('cust-name').value;
    let phone = document.getElementById('cust-phone').value;
    let address = document.getElementById('cust-address').value;
    let note = document.getElementById('overall-instructions').value;

    if (cartItems.length === 0 || name === "") {
        alert("Paki-add ng order at pangalan.");
        return;
    }

    let subject = "ORDER: " + name;
    let body = "ARJAY'S CHICKEN ORDER\n\n";
    body += "Name: " + name + "\n";
    body += "Phone: " + phone + "\n";
    body += "Address: " + address + "\n\n";
    body += "Orders:\n";

    cartItems.forEach(item => {
        body += "- " + item.name + " (" + item.qty + "kg)\n";
    });

    body += "\nHiwa Instructions: " + note + "\n";
    body += "TOTAL AMOUNT: PHP " + totalAmount.toFixed(2);

    // Palitan mo ito ng email ni Arjay
    let arjayEmail = "libananking@gmail.com"; 
    let mailtoLink = "mailto:" + arjayEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

    window.location.href = mailtoLink;
}

function resetCart() {
    totalAmount = 0;
    cartItems = [];
    document.getElementById('total-price').innerText = "0.00";
    document.getElementById('order-list').innerHTML = "";
    document.getElementById('overall-instructions').value = "";
    document.getElementById('cust-name').value = "";
    document.getElementById('cust-phone').value = "";
    document.getElementById('cust-address').value = "";
}
