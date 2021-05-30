const CARTNAME = 'cart';

function existsCart() {
    var cart = localStorage.getItem(CARTNAME);
    if (cart == null) return false;
    return true;
}

function initCart() {
    setCart([]);
}

function setCart(cart) {
    localStorage.setItem(CARTNAME, JSON.stringify(cart));
}

function getCart() {
    if (!existsCart()) 
        initCart();
    var cart = localStorage.getItem(CARTNAME);
    return JSON.parse(cart);
}

function deleteCart() {
    localStorage.setItem(CARTNAME, null);
}

function addToCart(productToAdd, amountToAdd) {
    // warenkorbdaten aus session holen
    var localCart = getCart();

    // den warenkorb durchlaufen und schauen ob das Produkt bereits enthalten ist
    var found = false;
    for (i = 0; i < localCart.length; i++) {
        if (localCart[i].product.id == productToAdd.id) {
            found = true;
            // falls ja, bei der gefundenen Bestellposition die Menge erhöhen
            localCart[i].amount += amountToAdd;
            break;
        }
    }
    // ansonsten neue Bestellposition erzeugen und am ende anhängen
    if (!found) {
        // aus produkt und menge bestellposition erstellen
        var orderPosition = { 
            'product': productToAdd, 
            'amount': amountToAdd 
        };

        // bestellposition in warenkorb einfügen
        localCart.push(orderPosition);
    }

    // warenkorb in session zurück schreiben
    setCart(localCart);
}