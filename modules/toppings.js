    import { printToppings } from "../app.js";
    const quantityArray = ['Light', 'Normal', 'Extra'];
    
    const toppingTemplate = (name, color, container, objectName) => {
        let containerDiv = document.createElement('div');
        containerDiv.className = 'templateContainer';
        let divA = document.createElement('div');
        divA.className = 'divA';
        let divB = document.createElement('div');
        divB.className = 'divB';
        //divB.id = `divB${name}`;


        let myObject = JSON.parse(localStorage.getItem(objectName));
        const toppingsLength = myObject.toppings.length
        let myIndex = -1;
        let currentTopping = null;

        if (toppingsLength > 0) {
            let myToppingArray = myObject.toppings;
            currentTopping = myToppingArray.find(toppings => toppings.includes(name));
            myIndex = myToppingArray.indexOf(currentTopping);
            if (currentTopping != null) {
                // console.log(currentTopping);
            }
        }


        let span = document.createElement('span');
        span.textContent = name;

        let buttonA = document.createElement('button');


        divA.append(span, buttonA);

        containerDiv.appendChild(divA);
        
        // div B

        // coverage Container
        let buttonContainer = document.createElement('div');
        buttonContainer.className = 'buttonContainer';

        let button1 = document.createElement('button');
        button1.className = name;
        button1.textContent = 'left';
        button1.addEventListener('click', function () {
            let myObject = JSON.parse(localStorage.getItem(objectName));
            let changedToppingArray = myObject.toppings;
            const topping = event.target.className
            // console.log(topping);            
            let currentTopping = changedToppingArray.find(toppings => toppings.includes(topping));
            // console.log(currentTopping);
            const myIndex = changedToppingArray.indexOf(currentTopping);
            currentTopping[1] = 'left';
            myObject.toppings[myIndex] = currentTopping;
            // console.log(myObject.toppings[myIndex]);
            const myObjectAsString = JSON.stringify(myObject);
            localStorage.setItem(objectName, myObjectAsString); 
            // alert('button1 clicked');
            button1.style.color = color;
            button2.style.color = 'black';
            button3.style.color = 'black';
        });
        let button2 = document.createElement('button');
        button2.className = name;
        button2.textContent = 'whole';
        button2.addEventListener('click', function () {
            let myObject = JSON.parse(localStorage.getItem(objectName));
            let changedToppingArray = myObject.toppings;
            const topping = event.target.className
            // console.log(topping);            
            let currentTopping = changedToppingArray.find(toppings => toppings.includes(topping));
            // console.log(currentTopping);
            const myIndex = changedToppingArray.indexOf(currentTopping);
            currentTopping[1] = 'whole';
            myObject.toppings[myIndex] = currentTopping;
            // console.log(myObject.toppings[myIndex]);
            const myObjectAsString = JSON.stringify(myObject);
            localStorage.setItem(objectName, myObjectAsString); 
            // alert('button2 clicked');
            button1.style.color = 'black';
            button2.style.color = color;
            button3.style.color = 'black';
        });
        let button3 = document.createElement('button');
        button3.className = name;
        button3.textContent = 'right';
        button3.addEventListener('click', function (event) {
            let myObject = JSON.parse(localStorage.getItem(objectName));
            let changedToppingArray = myObject.toppings;
            const topping = event.target.className
            // console.log(topping);            
            let currentTopping = changedToppingArray.find(toppings => toppings.includes(topping));
            // console.log(currentTopping);
            const myIndex = changedToppingArray.indexOf(currentTopping);
            currentTopping[1] = 'right';
            myObject.toppings[myIndex] = currentTopping;
            // console.log(myObject.toppings[myIndex]);
            const myObjectAsString = JSON.stringify(myObject);
            localStorage.setItem(objectName, myObjectAsString); 
            

            button1.style.color = 'black';
            button2.style.color = 'black';
            button3.style.color = color;
        });


        buttonContainer.append(button1, button2, button3);

        divB.append(buttonContainer);

        // quanity Container
        let quantityContainer = document.createElement('div');
        quantityContainer.className = 'quantityContainer';
        
        let button4 = document.createElement('button');
        button4.textContent = '-';
        button4.className = name;

        let quantity = document.createElement('span');
        quantity.textContent = 'Normal';

        let button5 = document.createElement('button');
        button5.textContent = '+';
        button5.className = name;
        let qLength = quantityArray.length - 1;

        button4.addEventListener('click', function (event) {
            let index = quantityArray.indexOf(quantity.textContent)
            let myObject = JSON.parse(localStorage.getItem(objectName));
            const topping = event.target.className
            let changedToppingArray = myObject.toppings;
            let currentTopping = changedToppingArray.find(toppings => toppings.includes(topping));
            if (index > 0) {
                quantity.textContent = quantityArray[index - 1];
                currentTopping[2] = quantity.textContent;
            }
            // console.log(myObject);
            const myObjectAsString = JSON.stringify(myObject);
            localStorage.setItem(objectName, myObjectAsString);    
        });
        button5.addEventListener('click', function (event) {
            let index = quantityArray.indexOf(quantity.textContent)
            let myObject = JSON.parse(localStorage.getItem(objectName));
            const topping = event.target.className
            let changedToppingArray = myObject.toppings;
            let currentTopping = changedToppingArray.find(toppings => toppings.includes(topping));
            if (index < qLength) {
                quantity.textContent = quantityArray[index + 1];
                currentTopping[2] = quantity.textContent;
            }
            // console.log(myObject);
            const myObjectAsString = JSON.stringify(myObject);
            localStorage.setItem(objectName, myObjectAsString);    
        });

        quantityContainer.append(button4, quantity, button5);
        divB.append(quantityContainer);
        if (myIndex == -1){
            divB.style.display = 'none';
        } else {
            divB.style.display = 'flex';
        }
        containerDiv.append(divB);


        buttonA.addEventListener('click', function () {
            let changedObject = JSON.parse(localStorage.getItem(objectName));
            // console.log(changedObject);
            let changedToppingArray = changedObject.toppings;
            const currentTopping = changedToppingArray.find(topping => topping.includes(name));

            const myIndex = changedToppingArray.indexOf(currentTopping);
            console.log(myIndex);

            // if topping does not exist, add topping
            // else remove topping
            if (myIndex == -1 || myIndex == undefined) {
                buttonA.textContent = 'remove topping';
                divB.style.display = 'flex';
                const tempV = [name, 'whole', 'Normal']
                changedToppingArray.push(tempV);

                button1.style.color = 'black';
                button2.style.color = color;
                button3.style.color = 'black';
                quantity.textContent = 'Normal';
                
            } else {
                changedToppingArray.splice(myIndex, 1);
                buttonA.textContent = 'add topping';
                divB.style.display = 'none';
                
            }

            //update topping data and visual
            let pizzaToppings = document.getElementById('pizzaToppings');
            pizzaToppings.textContent = printToppings(changedObject);
            const myObjectAsString = JSON.stringify(changedObject);
            localStorage.setItem(objectName, myObjectAsString);


        });

        if (myIndex == -1) {
            buttonA.textContent = 'add topping';
            button2.style.color = color;

            // console.log(currentTopping)
        } else {
            console.log(currentTopping);
            quantity.textContent = currentTopping[2]
            // console.log(quantity.textContent);
            if (currentTopping[1] == 'left') {
                button1.style.color = color;
            } else if (currentTopping[1] == 'right') {
                button3.style.color = color;
            } else {
                button2.style.color = color;
            }
            buttonA.textContent = 'remove topping';
        }


        container.append(containerDiv);

    }

    export const populateToppings = (toppingList, color, container, objectName) => {
        const length = toppingList.length;
            for (let i = 0; i < length; i++) {
                toppingTemplate(toppingList[i], color, container, objectName);
            }
    }