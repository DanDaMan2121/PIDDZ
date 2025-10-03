const quantityArray = ['Light', 'Normal', 'Extra'];

const sauceOptionsTemplate = (setName, sauce, container, objectName) => {
    // current object
    let myObject = JSON.parse(localStorage.getItem(objectName));
    let mySauce = myObject.sauce
    // console.log(mySauce[0]);
    
    let sauceContainer = document.createElement('div');
    sauceContainer.className = 'sauceContainer';
    let sauceOptionContainer = document.createElement('div');
    sauceOptionContainer.className = 'sauceOptionContainer';
    
    // sauceOptionContainer
    let suaceSpan = document.createElement('span');
    suaceSpan.textContent = sauce;
    
    let sauceButton = document.createElement('button');
    sauceButton.id = sauce;
    sauceButton.textContent = (sauce != mySauce[0]) ? 'add sauce' : 'remove sauce';
    sauceButton.className = setName;


    sauceOptionContainer.append(suaceSpan, sauceButton);

    // qContianer for style
    let qContainer = document.createElement('div');
    qContainer.id = `${sauce}QuantityContainer`;
    qContainer.className = 'quantity-container';
    
    qContainer.style.display = (sauce != mySauce[0]) ? 'none' : 'flex';
    qContainer.style.justifyContent = 'flex-end';


    // quantity container
    let quantityContainer = document.createElement('div');
    quantityContainer.className = 'quantityContainer';

    //minus button
    let buttonMinus = document.createElement('button');
    buttonMinus.textContent = '-';
    buttonMinus.style.padding = '5px';
    
    //Quantity value
    let quantity = document.createElement('span');

    quantity.textContent = (myObject.sauce[1] != quantity.textContent) ? myObject.sauce[1] : "Normal";
    quantity.style.padding = '5px';
    
    //Plus button
    let buttonPlus = document.createElement('button');
    buttonPlus.textContent = '+';
    buttonPlus.style.padding = '5px'

    let qLength = quantityArray.length - 1;

    buttonMinus.addEventListener('click', function () {
        let index = quantityArray.indexOf(quantity.textContent)
        let myObject = JSON.parse(localStorage.getItem(objectName));
        if (index > 0) {
            
            quantity.textContent = quantityArray[index - 1];
            myObject.sauce[1] = quantity.textContent;
        }
        const myObjectAsString = JSON.stringify(myObject);
        localStorage.setItem(objectName, myObjectAsString);    
    });
    buttonPlus.addEventListener('click', function () {
        let index = quantityArray.indexOf(quantity.textContent)
        let myObject = JSON.parse(localStorage.getItem(objectName));
        if (index < qLength) {
            quantity.textContent = quantityArray[index + 1];
            myObject.sauce[1] = quantity.textContent;

        }
        const myObjectAsString = JSON.stringify(myObject);
        localStorage.setItem(objectName, myObjectAsString);
    });

    quantityContainer.append(buttonMinus, quantity, buttonPlus);
    qContainer.append(quantityContainer);

    sauceButton.addEventListener('click', (event) => {
        let pizzaSauce = document.getElementById('pizzaSauce');
        const sauceID = event.target.id;
        let sauceSelected = event.target;
        let newSauce = sauceID;
        let newQuantity = 'Normal';
        
        let qContainer = document.getElementById(`${sauceID}QuantityContainer`);
        const sauces = document.querySelectorAll(`.${setName}`);
        // console.log(quantityContainer);

        let otherQuatityContainer = null;

        sauces.forEach(sauce => {
            if (sauce.textContent == 'remove sauce') {
                sauce.textContent = 'add sauce';
                // console.log(sauce.id);
                otherQuatityContainer = document.getElementById(`${sauce.id}QuantityContainer`);
                // console.log(otherQuatityContainer);
                otherQuatityContainer.style.display = 'none';
            }
            
        })

        if (otherQuatityContainer == qContainer) {
            newSauce = 'No sauce';
            qContainer.style.display = 'none';
            sauceSelected.textContent = 'add suace';
            qContainer.children[0].children[1].textContent = 'Normal';
            newQuantity = 'None';
        
        } else {
            qContainer.style.display = 'flex';
            sauceSelected.textContent = 'remove sauce';
            
        }

        pizzaSauce.textContent = newSauce;
        
        //update object and visual
        let myObject = JSON.parse(localStorage.getItem(objectName));
        myObject.sauce[0] = newSauce;
        myObject.sauce[1] = newQuantity;
        const myObjectAsString = JSON.stringify(myObject);
        localStorage.setItem(objectName, myObjectAsString);

    })


    sauceContainer.append(sauceOptionContainer, qContainer);
    container.append(sauceContainer);
}



export const populateSauceOptions = (setName, sauceList, container, objectName) => {
    let i = 0;
    const listLength = sauceList.length;
    for (i; i < listLength; i++ ) {
    
        sauceOptionsTemplate(setName, sauceList[i], container, objectName);

    }
}
