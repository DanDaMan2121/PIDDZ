export function getCart() {
    let myCart = JSON.parse(sessionStorage.getItem('cart'))
    return myCart

}

export function pushCart(item) {
    let myCart = getCart();
    myCart.push(item);
    const myCartAsString = JSON.stringify(myCart);
    sessionStorage.setItem('cart', myCartAsString);
}

export function getItemInCart(index) {
    let myCart = getCart();
    length = myCart.length;
    if (index < length) {
        return myCart[index];
    } else {
        console.log('Item does not exist');
    }
}

export function setItemInCart(index, item) {
    let myCart = getCart();
    length = myCart.length;
    if (index < length) {
        myCart[index] = item;
        const myCartAsString = JSON.stringify(myCart);
        sessionStorage.setItem('cart', myCartAsString);
    } else {
        console.log('Item does not exist');
    }
}

export function removeItemInCart(index) {
    let myCart = getCart();
    length = myCart.length;
    if (index < length) {
        myCart.splice(index, 1);
        for (let i = 0; i < length - 1; i ++) {
            let item = myCart[i];
            if (Object.keys(item)[0] == 'PID') {
                item.PID = i;
            } else {
                item.id = i;
            }
        }
        const myCartAsString = JSON.stringify(myCart);
        sessionStorage.setItem('cart', myCartAsString);
    } else {
        console.log('Item does not exist');
    }
}