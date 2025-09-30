import { less, more, addAndremove, loadToppings, vegTopping, meatTopping } from "./modules/pbuilder.js";
import Pizza from './modules/pizzaClass.js'
import { loadSauce } from './modules/sauceOptions.js'

let container = document.getElementById('container');
let vegContainer = document.getElementById('vegContainer');
let meatBtn = document.getElementById('meats');
let vegBtn = document.getElementById('veggies');

let sauceContainer = document.getElementById('sauceContainer');
let checkout = document.getElementById('checkout');

let sOptions = document.getElementById('sOptions');
let tList = document.getElementById('tList');

let pizzaQuantity = document.getElementById('pizzaQuantity');



// let hamburgerIcon = document.getElementById('hamburger-icon')


// hamburgerIcon.addEventListener('click', () => {
//     hamburgerIcon.classList.toggle('open');
// });

sauceContainer.addEventListener('click', (e) => {
    
    let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));

    if (e.target.className == 'aor') {
        
        let length = sauceContainer.childElementCount;

        for (let i = 0; i < length; i++) {
            // console.log(sauceContainer.children[0].children[1]);
            let previousSauce = sauceContainer.children[i].children[0].children[1];
            // console.log(previousSauce);
            if (previousSauce.innerHTML == 'remove sauce') {
                previousSauce.parentElement.nextElementSibling.style.display = 'none';
                previousSauce.innerHTML = 'add sauce';
            }
        }

        let editsauce = e.target.parentElement.nextElementSibling;

        if(e.target.innerHTML == 'add sauce') {
            editsauce.style.display = 'flex';

            myPizza._sauce[0] = e.target.previousElementSibling.innerHTML;
            // console.log(myPizza);
            e.target.innerHTML = 'remove sauce';

            // console.log(e.target);
        } 

    }

    if (e.target.className == 'less') {
        less(e.target);
        myPizza._sauce[1] = e.target.parentElement.children[1].innerHTML

        
    } else if (e.target.className == 'more') {
        more(e.target);
        myPizza._sauce[1] = e.target.parentElement.children[1].innerHTML

    }
    // console.log(myPizza);
    printtList(myPizza);
    sessionStorage.setItem('myPizza', JSON.stringify(myPizza));

})


container.addEventListener('click', (e) => {
    // let toppingName = e.target.parentElement.parentElement.children[0].children[0].innerHTML;

    if (e.target.className == 'addAndremove') {
        // console.log(e.target);
        addAndremove(e.target);
        let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
        printtList(myPizza);
    } else if (e.target.className == 'less') {
        
        let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
        length = myPizza._toppings.length;
        // console.log(length);
        less(e.target);
        let toppingName = e.target.parentElement.parentElement.previousElementSibling.children[0].innerHTML;
        
        for (let i = 0; i < length; i++) {
            let temp = myPizza._toppings[i];
            // console.log('ran');
            // console.log()
            if (temp[0] == toppingName) {
                console.log('Found');
                // console.log(myPizza._toppings[i][2])
                myPizza._toppings[i][2] = e.target.parentElement.children[1].innerHTML;
                break;
            }
        
        }
        console.log(myPizza);
        sessionStorage.setItem('myPizza', JSON.stringify(myPizza));


    } else if (e.target.className == 'more') {
        let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
        let length = myPizza._toppings.length;
        // console.log(length);
        more(e.target);
        let toppingName = e.target.parentElement.parentElement.previousElementSibling.children[0].innerHTML;
        
        for (let i = 0; i < length; i++) {
            let temp = myPizza._toppings[i];
            // console.log('ran');
            // console.log()
            if (temp[0] == toppingName) {
                console.log('Found');
                // console.log(myPizza._toppings[i][2])
                myPizza._toppings[i][2] = e.target.parentElement.children[1].innerHTML;
                break;
            }
        
        }
        console.log(myPizza);
        sessionStorage.setItem('myPizza', JSON.stringify(myPizza));
    } else if (e.target.className == 'left') {
        let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
        let length = myPizza._toppings.length;
        let toppingName = e.target.parentElement.parentElement.previousElementSibling.children[0].innerHTML;

        for (let i = 0; i < length; i++) {
            let temp = myPizza._toppings[i];
            // console.log('ran');
            // console.log()
            if (temp[0] == toppingName) {
                console.log('Found');
                // console.log(myPizza._toppings[i][2])
                myPizza._toppings[i][1] = 'left';
                break;
            }
        }
        console.log(myPizza);
        sessionStorage.setItem('myPizza', JSON.stringify(myPizza));

        e.target.style.color = 'green';
        e.target.nextElementSibling.style.color = 'white';
        e.target.nextElementSibling.nextElementSibling.style.color = 'white';
    } else if (e.target.className == 'whole') {

        let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
        let length = myPizza._toppings.length;
        let toppingName = e.target.parentElement.parentElement.previousElementSibling.children[0].innerHTML;

        for (let i = 0; i < length; i++) {
            let temp = myPizza._toppings[i];
            // console.log('ran');
            // console.log()
            if (temp[0] == toppingName) {
                console.log('Found');
                // console.log(myPizza._toppings[i][2])
                myPizza._toppings[i][1] = 'whole';
                break;
            }
        }
        console.log(myPizza);
        sessionStorage.setItem('myPizza', JSON.stringify(myPizza));
        
        e.target.style.color = 'green';
        e.target.previousElementSibling.style.color = 'white';
        e.target.nextElementSibling.style.color = 'white';
        console.log('Whole');
    } else if (e.target.className == 'right') {

        let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
        let length = myPizza._toppings.length;
        let toppingName = e.target.parentElement.parentElement.previousElementSibling.children[0].innerHTML;

        for (let i = 0; i < length; i++) {
            let temp = myPizza._toppings[i];
            // console.log('ran');
            // console.log()
            if (temp[0] == toppingName) {
                console.log('Found');
                // console.log(myPizza._toppings[i][2])
                myPizza._toppings[i][1] = 'right';
                break;
            }
        }
        console.log(myPizza);
        sessionStorage.setItem('myPizza', JSON.stringify(myPizza));

        e.target.style.color = 'green';
        e.target.previousElementSibling.style.color = 'white';
        e.target.previousElementSibling.previousElementSibling.style.color = 'white';
        console.log('Right');
    }
    // console.log(e.target);

})


vegContainer.addEventListener('click', (e) => {
    // let toppingName = e.target.parentElement.parentElement.children[0].children[0].innerHTML;

    if (e.target.className == 'addAndremove') {
        // console.log(e.target);
        addAndremove(e.target);
        let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
        printtList(myPizza);
    } else if (e.target.className == 'less') {
        
        let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
        length = myPizza._toppings.length;
        // console.log(length);
        less(e.target);
        let toppingName = e.target.parentElement.parentElement.previousElementSibling.children[0].innerHTML;
        
        for (let i = 0; i < length; i++) {
            let temp = myPizza._toppings[i];
            // console.log('ran');
            // console.log()
            if (temp[0] == toppingName) {
                console.log('Found');
                // console.log(myPizza._toppings[i][2])
                myPizza._toppings[i][2] = e.target.parentElement.children[1].innerHTML;
                break;
            }
        
        }
        console.log(myPizza);
        sessionStorage.setItem('myPizza', JSON.stringify(myPizza));


    } else if (e.target.className == 'more') {
        let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
        let length = myPizza._toppings.length;
        // console.log(length);
        more(e.target);
        let toppingName = e.target.parentElement.parentElement.previousElementSibling.children[0].innerHTML;
        
        for (let i = 0; i < length; i++) {
            let temp = myPizza._toppings[i];
            // console.log('ran');
            // console.log()
            if (temp[0] == toppingName) {
                console.log('Found');
                // console.log(myPizza._toppings[i][2])
                myPizza._toppings[i][2] = e.target.parentElement.children[1].innerHTML;
                break;
            }
        
        }
        console.log(myPizza);
        sessionStorage.setItem('myPizza', JSON.stringify(myPizza));
    } else if (e.target.className == 'left') {
        let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
        let length = myPizza._toppings.length;
        let toppingName = e.target.parentElement.parentElement.previousElementSibling.children[0].innerHTML;

        for (let i = 0; i < length; i++) {
            let temp = myPizza._toppings[i];
            // console.log('ran');
            // console.log()
            if (temp[0] == toppingName) {
                console.log('Found');
                // console.log(myPizza._toppings[i][2])
                myPizza._toppings[i][1] = 'left';
                break;
            }
        }
        console.log(myPizza);
        sessionStorage.setItem('myPizza', JSON.stringify(myPizza));

        e.target.style.color = 'green';
        e.target.nextElementSibling.style.color = 'white';
        e.target.nextElementSibling.nextElementSibling.style.color = 'white';
    } else if (e.target.className == 'whole') {

        let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
        let length = myPizza._toppings.length;
        let toppingName = e.target.parentElement.parentElement.previousElementSibling.children[0].innerHTML;

        for (let i = 0; i < length; i++) {
            let temp = myPizza._toppings[i];
            // console.log('ran');
            // console.log()
            if (temp[0] == toppingName) {
                console.log('Found');
                // console.log(myPizza._toppings[i][2])
                myPizza._toppings[i][1] = 'whole';
                break;
            }
        }
        console.log(myPizza);
        sessionStorage.setItem('myPizza', JSON.stringify(myPizza));
        
        e.target.style.color = 'green';
        e.target.previousElementSibling.style.color = 'white';
        e.target.nextElementSibling.style.color = 'white';
        console.log('Whole');
    } else if (e.target.className == 'right') {

        let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
        let length = myPizza._toppings.length;
        let toppingName = e.target.parentElement.parentElement.previousElementSibling.children[0].innerHTML;

        for (let i = 0; i < length; i++) {
            let temp = myPizza._toppings[i];
            // console.log('ran');
            // console.log()
            if (temp[0] == toppingName) {
                console.log('Found');
                // console.log(myPizza._toppings[i][2])
                myPizza._toppings[i][1] = 'right';
                break;
            }
        }
        console.log(myPizza);
        sessionStorage.setItem('myPizza', JSON.stringify(myPizza));

        e.target.style.color = 'green';
        e.target.previousElementSibling.style.color = 'white';
        e.target.previousElementSibling.previousElementSibling.style.color = 'white';
        console.log('Right');
    }
    // console.log(e.target);

})

meatBtn.addEventListener('click', () => {
    meatBtn.style = 'color: rebeccapurple; border-bottom: 5px solid rebeccapurple;'
      
    vegBtn.style = 'color: inherit; border-bottom: background-color: #404343;';
    
    container.style.display = 'flex';
    vegContainer.style.display = 'none';
})

vegBtn.addEventListener('click', () => {
    meatBtn.style = 'color: white; border-bottom: 5px solid #404343;'

    vegBtn.style.color = 'green';
    vegBtn.style.borderBottom = '5px solid green';

    container.style.display = 'none';
    vegContainer.style.display = 'flex';


})

servingOptions.addEventListener('click', (e) => {
    if (e.target.className == 'crust' || e.target.parentElement.className == 'crust') {
        window.location.href = './selectCrust.html';
    } else if (e.target.className == 'size' || e.target.parentElement.className == 'size') {
        window.location.href = './selectSize.html';
    }
})



pizzaQuantity.addEventListener('click', (e) => {
    let quantity = pizzaQuantity.children[1].innerHTML;
    let count = parseInt(quantity);
    // console.log(quantity);
    if (e.target.id == 'lessPizza' && count > 1) {
        count -= 1;

    }
    if (e.target.id == 'morePizza'){
        count += 1;
    }

    pizzaQuantity.children[1].innerHTML = count;

    let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
    // console.log(myPizza);
    myPizza._quantity = count;
    printsOptions(myPizza);
    console.log(myPizza);
    sessionStorage.setItem('myPizza', JSON.stringify(myPizza));

})

let printsOptions = (myPizza) => {
    if (myPizza._quantity > 1) {
        sOptions.innerHTML = `${myPizza._size} ${myPizza._crust} (${myPizza._quantity})`;
    } else {
        sOptions.innerHTML = `${myPizza._size} ${myPizza._crust}`;
    }
}

let printtList = (myPizza) => {
    let tString = `${myPizza._sauce[0]}, Cheese`;

    let length = myPizza._toppings.length;
    if (length != 0) {
        for (let i = 0; i < length; i++ ) {
            if (i == 0) {
                tString = tString  + `, `;
            }
            if (i == length - 1){ 
                tString = tString + `${myPizza._toppings[i][0]}`
            } else {
                tString = tString + `${myPizza._toppings[i][0]}, `
            }
            
        }
    }
    
    tList.innerHTML = tString;
}

checkout.addEventListener('click', () => {
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    let myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
    // console.log(cart);
    cart.push(myPizza);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = './checkout.html';

})



window.addEventListener("DOMContentLoaded", () => {
    loadToppings(container, meatTopping);
    loadToppings(vegContainer, vegTopping);
    loadSauce(sauceContainer);

    let myPizza = sessionStorage.getItem('myPizza');
    let location = JSON.parse(sessionStorage.getItem('location'));
    console.log(location);

    // let cart = JSON.parse(sessionStorage.getItem('cart'));
    // console.log(cart);

    if (myPizza == null || myPizza == 'null') {
        myPizza = new Pizza();
        myPizza = JSON.stringify(myPizza);
        sessionStorage.setItem('myPizza', myPizza);
        console.log(JSON.parse(myPizza));
        printsOptions(JSON.parse(myPizza));
        
        printtList(JSON.parse(myPizza));
    } else {
        myPizza = JSON.parse(sessionStorage.getItem('myPizza'));
        console.log(myPizza);
        servingOptions.children[1].children[1].innerHTML = myPizza._crust;
        servingOptions.children[2].children[1].innerHTML = myPizza._size;
        pizzaQuantity.children[1].innerHTML = myPizza._quantity;
        printsOptions(myPizza);
        printtList(myPizza);
    }



})