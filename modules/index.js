let delivery = document.getElementById('delivery');
let carryOut = document.getElementById('carryOut');



delivery.addEventListener('click', () => {
    window.location.href = '/pages/delivery.html';
})

carryOut.addEventListener('click', () => {
    window.location.href = '/pages/carryOut.html';
})

window.document.addEventListener('DOMContentLoaded', () => {
    // console.log(JSON.parse(sessionStorage.getItem('location')));
    let cart = [];
    sessionStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
    // console.log(JSON.parse(sessionStorage.getItem('cart')))
})