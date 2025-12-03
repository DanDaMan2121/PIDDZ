let deliveryContainer = document.getElementById('deliveryContainer');

let street = document.getElementById('streetAddress');
let city = document.getElementById('city');
let state = document.getElementById('state');
let zip = document.getElementById('zip');

deliveryContainer.addEventListener('click', (e) => {
    if (e.target.id == 'back') {
        window.history.back();
    } else {
        if (e.target.id == 'submit') {
            let address = `${city.value}, ${state.value} ${zip.value}`;
            let location = [street.value, address];
            // console.log(myStore);
            sessionStorage.setItem('location', JSON.stringify(location));


        }
    }
})