let delivery = document.getElementById('delivery');
let carryOut = document.getElementById('carryOut');


// After pressing the delivery button, you are redirected to the delivery page.
delivery.addEventListener('click', () => {
    window.location.href = './FrontEnd/pages/delivery.html';
})

// After pressing the carryout button, you are redirected to the carryout page.
carryOut.addEventListener('click', () => {
    window.location.href = './FrontEnd/pages/carryOut.html';
})

// When the page is loaded, the user's cart is created.
window.document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    sessionStorage.setItem('cart', JSON.stringify(cart));

})