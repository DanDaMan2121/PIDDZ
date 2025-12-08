import { writeUserData, removeUserData, readUserData, updateUserData, setUserData, writeUserObject, readObjectData, pushUserData } from './firebase.js';
// import { Pizza } from './pizzClass.js';
const myMap = new Map();


const menuContainer = document.getElementById('menuContainer');
const menuListContainer = document.getElementById('menuListContainer');
const eContainer = document.getElementById('editContainer');
const createContainer = document.getElementById('createContainer');
const editContainers = document.createElement('div');
editContainers.style.display = 'none';
editContainers.id = 'editContainers';
menuContainer.append(editContainers);

// functions for creating a menu template

function addItemButton(container) {
  let addItemDiv = document.createElement('div');
  addItemDiv.id = 'addItemDiv';
  addItemDiv.className = 'addContainer';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'add item';
  

  const addButton = document.createElement('button');
  addButton.textContent = 'add';
  addButton.addEventListener('click', async () => {
    const currentInput = input.value;
    input.value = '';
    if (currentInput != null && currentInput != '') {
      templateFrame.append(await createItem("StoreTemplate's", currentInput));
      writeUserData("StoreTemplate's",  currentInput); // new item new path
    }
    
  })
  addItemDiv.append(input, addButton);
  container.append(addItemDiv);

}


async function createItem(path, item) {
  const currentPath = path + '/' + item;
  let itemContainer = document.createElement('div');
  // const optionContainer = document.createElement('div');
  const editButton = document.createElement('button');
  editButton.textContent = 'edit item';
  editButton.addEventListener('click', () =>  {
    const currentState = editButton.textContent;
    let operation = '';

    if (currentState == 'done edit') {
      operation = 'none';
      editButton.textContent = 'edit item';
    } else {
      editButton.textContent = 'done edit';
      operation = 'inherit';
    }

    const children = itemContainer.children;
    const offset = 5;
    const length = children.length - offset;
    for (let i = 0; i < length; i++){
      // console.log(children[i + offset]);
      children[i + offset].style.display = operation;
    }
      
    
  });
  
  let itemSpan = document.createElement('span');
  itemSpan.textContent = item;

  let removeButton = document.createElement('button');
  removeButton.textContent = 'remove';
  removeButton.addEventListener('click', () => {

    setTimeout(() => {
    removeButton.textContent = 'remove';
    }, 3000);
    if (removeButton.textContent == 'delete') {
      removeUserData(path, item);
      itemContainer.remove();
    }
    removeButton.textContent = 'delete';

  })

  let createObjectInput = document.createElement('input');
  createObjectInput.placeholder = item + ' name';
  createObjectInput.type = 'text';


  let createItemButton = document.createElement('button');
  createItemButton.textContent = 'create Item';
  createItemButton.addEventListener('click', () => {
    const objectInput = createObjectInput.value;
    createObjectInput.value = '';
    if (objectInput != null && objectInput != '') {
      loadItem(currentPath, objectInput);
      // console.log(`created object: ${objectInput}`)

    }
  });
  



  let itemInput = document.createElement('input');
  itemInput.type = 'text';
  itemInput.placeholder = 'option';

  let addOptionButton = document.createElement('button');
  addOptionButton.textContent = 'add';
  addOptionButton.addEventListener('click', async () => {
    const currentInput = itemInput.value;
    itemInput.value = '';
    if (currentInput != null && currentInput != '') {
      const myOption = await createOption(currentPath, currentInput)
      itemContainer.append(myOption);
      writeUserData(currentPath, currentInput);
    }
  });
  const modContainer = document.createElement('div');
  modContainer.style.display = 'none';
  modContainer.append(itemInput, addOptionButton);
  modContainer.className = 'addOptionContainer';


  itemContainer.append(itemSpan, createObjectInput, createItemButton, removeButton, editButton, modContainer);
  return itemContainer;
}

async function createOption(path, option) {
  const currentPath = path + '/' + option;
  let optionContainer = document.createElement('div');

  let optionSpan = document.createElement('span');
  optionSpan.textContent = option;
  optionSpan.className = 'optionSpan';

  let removeButton = document.createElement('button');
  removeButton.textContent = 'remove';
  removeButton.addEventListener('click', () => {
    
    setTimeout(() => {
    removeButton.textContent = 'remove';
    }, 3000);
    if (removeButton.textContent == 'delete') {
      optionContainer.remove();
      console.log(path);
      removeUserData(path, option);
    }
    removeButton.textContent = 'delete';
    
  })

  let optionInput = document.createElement('input');
  optionInput.type = 'text';
  optionInput.placeholder = 'ingredient';

  let addButton = document.createElement('button');
  addButton.textContent = 'add';
  addButton.addEventListener('click', () => {
    const currentInput = optionInput.value;
    optionInput.value = '';
    if (currentInput != null && currentInput != '') {
      optionContainer.append(createIngredient(currentPath, currentInput));
      writeUserData(currentPath, currentInput);
    }
  });
  const intRequirement = document.createElement('input');
  intRequirement.type = 'number';
  intRequirement.id = option + 'int';
  const existReq = await readUserData(currentPath, 'req');
  if (existReq) {
    // console.log(readUserData(currentPath, 'req'));
    intRequirement.value = parseInt(await readUserData(currentPath, 'req'));
  } else {
    intRequirement.textContent = '0';
  }
  
  intRequirement.min = 0;
  intRequirement.className = 'intReq';
  intRequirement.addEventListener('change', () => {
    const input = intRequirement.value;
    const minreq = currentPath + '/' + 'req';
    setUserData(minreq, input);

  })
  optionContainer.append(optionSpan, removeButton, optionInput, addButton, intRequirement);

  return optionContainer;
}

function createIngredient(path, ingredient) {
  const currentPath = path + '/' + ingredient;
  let iContainer = document.createElement('div');
  iContainer.className = 'iContainer';
  
  let iSpan = document.createElement('span');
  iSpan.textContent = ingredient;

  let removeButton = document.createElement('button');
  removeButton.textContent = 'remove';
  removeButton.addEventListener('click', () => {
    setTimeout(() => {
    removeButton.textContent = 'remove';
    }, 3000);
    if (removeButton.textContent == 'delete') {
      iContainer.remove();
      // removeUserData(path, ingredient);
      updateUserData(path, ingredient, null);
    }
    removeButton.textContent = 'delete';
  })

  iContainer.append(iSpan, removeButton);
  return iContainer;
}


async function loadTemplate(path) {
  const container = document.createElement('div');
  const data = await readUserData(path, '');
  for (const item in data) {
    const curItemDiv = await createItem(path, item);

    curItemDiv.addEventListener('click', () => { 
      // console.log(curItemDiv);
    });

    container.append(curItemDiv);
    let nextPath = path + '/' + item;
    for (const option in data[item]) {
      let optionPath = nextPath + '/' + option;
      let optionDiv = null;
      if (option != null && option != '') {
        optionDiv = await createOption(nextPath, option);
        optionDiv.style.display = 'none';
        curItemDiv.append(optionDiv);
      }
      for (const ingredient in data[item][option]) {
        if (ingredient != null && ingredient != '') {
          if (ingredient != 'req') {
            const iDiv = createIngredient(optionPath, ingredient);
            optionDiv.append(iDiv);
          }
        // console.log(ingredient);
        }
      }
    }
  }
  // console.log(data);
  return container;
}


// functions for creating an item


async function createItemDiv(item) {
  const itemDiv = document.createElement('div');
  itemDiv.id = item;

  const modContainer = document.createElement('div');
  const nameInput = document.createElement('input');
  let itemName = document.createElement('span');
  itemName.textContent = item;
  nameInput.placeholder = 'New name';
  nameInput.type = 'text';
  const changeButton = document.createElement('button');
  changeButton.textContent = 'change name';
  const addButton = document.createElement('button');
  addButton.textContent = 'add';

  let myMessage = '';

  addButton.addEventListener('click', async () => { // resonpible for adding it to the menu
    const children = itemDiv.children;
    const offset = 3;
    const length = children.length - offset;
    
    // let myMessage = '';
    for (let i = 0; i < length; i++) {
      const currentChild = children[i + offset];
      const optionName = currentChild.childNodes[0].textContent;
      const intReqDiv = document.getElementById(optionName + 'int');
      const intReq = intReqDiv.value;

      const childLength = currentChild.childNodes.length - 1; // offset because the first div is the name of the option
      if (childLength < intReq) {
        myMessage = myMessage + `${optionName} is missing options` + '\n';
      }
    }
    if (priceSpan.textContent == '$0') {
      myMessage = myMessage + 'Please enter a price for your item';
    }

    // add item to menu if there are no errors
    if (myMessage != '') {
      alert(myMessage);
      myMessage = '';
    } else { // add item to menu
      const children = itemDiv.children;
      const offset = 3;
      const length = children.length - offset;
      const pathName = itemDiv.id;
      // console.log(length);

      if (length < 1) { // adds items to the menu
        const myData = myMap.get(pathName);
        pushUserData('StoreMenu', myData);

      } else {
        let myObject = {};
        for (let i = 0; i < length; i++) {
          const subChild = children[i + offset].children;
          const subOffset = 1; // name is the first div
          const subLength = subChild.length - subOffset;
          const subChildName = subChild[0].textContent;
          let subObject = {};
          for (let j = 0; j < subLength; j++) {
            const currentChild = subChild[j + subOffset];
            const currentName = currentChild.textContent;
            subObject[currentName] = '';
            const optionPath = pathName + '/' + subChildName + '/' + currentName;
            // console.log(optionPath);
            // writeUserData('StoreMenu', optionPath);
          }
          myObject[subChildName] = subObject;
        }
        myMap.get(item).object = myObject;
        const myData = myMap.get(pathName);
        pushUserData('StoreMenu', myData);
        let delDiv = myMap.get('currentItem');
        delDiv.remove();
      }
      menuListContainer.replaceChildren();
      menuListContainer.append(await loadMenu("StoreMenu"));
    }
  })

  changeButton.addEventListener('click', () => {
    const input = nameInput.value;
    nameInput.value = '';
    if (input != null && input != '') {
      const offset = 3;
      itemName.textContent = input;
      itemDiv.id = input;
      let childElements = itemDiv.children;
      const length = childElements.length - offset;

      // update child ids
      for (let i = 0; i < length; i++) {
        const currentId = childElements[i + offset].id;
        const idIndex = currentId.lastIndexOf(" ") + 1;
        const newId = currentId.slice(0, idIndex) + input;
        childElements[i + offset].id = newId;
        const subChildElements = childElements[i + offset].children;
        const subLength = subChildElements.length - 1;
        if (subLength > 0) {
          // console.log(subChildElements[2]);
          for (let j = 0; j < subLength; j++) {
            const subId = subChildElements[j + 1].id;
            const currentOption = subId.slice(0, idIndex);
            const previousId = currentId.slice(idIndex); // previous name
            const currentIIndex = subId.indexOf(previousId, idIndex); // index of previous name
            const currentI = subId.slice(currentIIndex + 1); // substring of current ingredient 
            
            const newSubId = currentOption + input + currentI;
            // console.log(newSubId);
            subChildElements[j + 1].id = newSubId;
          }

        }
      }
    
    }
  });

  // price modificaiton
  const priceContainer = document.createElement('div');
  const priceSpan = document.createElement('span');
  priceSpan.textContent = '$0';
  const inputPrice = document.createElement('input');
  inputPrice.type = 'number';
  inputPrice.step = '0.01';
  const setPriceButton = document.createElement('button');
  setPriceButton.textContent = 'set';
  setPriceButton.addEventListener('click', () => {
    if (inputPrice.value != '') {
      priceSpan.textContent = `$${inputPrice.value}`;
      let myData = myMap.get(item);
      myData.price = parseFloat(inputPrice.value);
      
      inputPrice.value = '';
    }
  });


  priceContainer.append(inputPrice, setPriceButton, priceSpan);
  modContainer.append(nameInput, changeButton, addButton);
  itemDiv.append(itemName, modContainer, priceContainer);
  return itemDiv
} 

function createOptionDiv(option, id) {
  const optionDiv = document.createElement('div');
  optionDiv.id = option + ' ' + id;
  optionDiv.className = 'optionContainer';
  const optionSpan = document.createElement('span');
  optionSpan.className = 'optionSpan';
  optionSpan.textContent = option;

  optionDiv.append(optionSpan);
  return optionDiv;
}


// functions for editing an item

async function editMenu(data) {
  const editContainer = document.createElement('div');
  for (const option in data) {
    const editOption = editOptionDiv(option);
    editContainer.append(editOption);
    for(const ingredient in data[option]) {
      if (ingredient != 'req') {
        const editIngredient = editIngredientDiv(ingredient);
        editOption.append(editIngredient);
      }
    }
  }
  
  const editButton = document.createElement('button');
  editButton.textContent = 'done edit';

  // closes edit menu after youre done editing
  editButton.addEventListener('click', () => {
    const element = myMap.get('currentItem');
    if (element != null) {
      element.style.boxShadow = '';
      element.style.backgroundColor = '';
      myMap.set('currentItem', null);
    }
    editContainer.style.display = 'none';
    // lowkey hard coded
    editContainers.style.display = 'none';
    createContainer.style.display = 'flex';
    createContainer.style.flexDirection = 'column';
  });
  editContainer.style.display = 'none';
  editContainer.append(editButton);
  return editContainer;
}

function editOptionDiv(option) {
  const optionDiv = document.createElement('div');
  optionDiv.className = 'optionContainer';
  const optionSpan = document.createElement('span');
  optionSpan.className = 'optionSpan';
  optionSpan.textContent = option;
  optionDiv.append(optionSpan);
  return optionDiv;
}

function editIngredientDiv(ingredient) {
  const iDiv = document.createElement('div');
  iDiv.className = 'iContainer';
  const iSpan = document.createElement('span');
  iSpan.textContent = ingredient;

  const modButton = document.createElement('button');
  modButton.id = 'iContainer' + ingredient;
  modButton.textContent = 'add';

  modButton.addEventListener('click', () => {  // needs to update the item that is being modified
    const optionContainer = iDiv.parentElement;
    const optionId = optionContainer.children[0].textContent;
    // console.log(optionId);
    const editContainer = optionContainer.parentElement;
    const ref = optionId + ' ' + editContainer.getAttribute('ref');
    // console.log(ref); // ref

    const intRequirement = optionId + 'int';
    // console.log(`optionId: ${optionId}, int: ${intRequirement}`);

    const myDiv = document.getElementById(ref);
    // console.log(myDiv);
    const myIntDiv = document.getElementById(intRequirement);
    const myInt = myIntDiv.value;
    

    if (modButton.textContent == 'add') {
      // console.log(myDiv);
      const divChildren = myDiv.childNodes;
      const divLength = divChildren.length - 1;
      // console.log(`divLength: ${divLength}, myInt: ${myInt}`);
      const newSpan = document.createElement('span');
      newSpan.textContent = ingredient;
      newSpan.id = ref + ingredient;
      if (myInt == 0 || myInt > divLength) {
        myDiv.append(newSpan);
      } else if (myInt <= divLength) {
        const childToRemove = divChildren[1];
        const prevId = childToRemove.id.slice(ref.length);
        // console.log(childToRemove.id, `Ref: ${prevId}`);
        const prevBtn = document.getElementById('iContainer' + prevId);
        prevBtn.textContent = 'add';
        myDiv.removeChild(childToRemove);
        myDiv.append(newSpan);

        
      }
      modButton.textContent = 'remove';
    } else if (modButton.textContent == 'remove') {
      let foundSpan = document.getElementById(ref + ingredient);
      foundSpan.remove();
      modButton.textContent = 'add';
    }
  });

  iDiv.append(iSpan, modButton);
  return iDiv;
}

async function loadItem(path, itemName) {
  const indexOfPath = path.indexOf('/');
  const itemCategory = path.slice(indexOfPath + 1); // item category


  const data = await readUserData(path, '');
  const myObject = createTemplateObject(data);

  const editContainer = await editMenu(data);
  editContainers.append(editContainer);

  let myData = {
    name: itemName,
    category: itemCategory,
    description: '',
    price: null,   
    object: myObject
  }

  myMap.set(itemName, myData);


 
  let itemDiv = await createItemDiv(itemName);
  itemDiv.addEventListener('click', () => {
    editContainers.style.display = 'flex';

    // checks to see if an item has been selected to edit.
    // if it hasn't then it will set the current edit div to the current item selected.
    // if it has it will close the previously selected div and select the new one.
    if (myMap.get('currentEdit') == null) {
        myMap.set('currentEdit', editContainer);
    } else {
      const element = myMap.get('currentEdit');
      element.style.display = 'none';
      // editContainers.style.display = 'none';
      myMap.set('currentEdit', editContainer);
    }

    // checks to see if an item is selected
    if (myMap.get('currentItem') == null) {
      myMap.set('currentItem', itemDiv);
    } else {
      const element = myMap.get('currentItem');
      element.style.boxShadow = '';
      element.style.backgroundColor = '';
      myMap.set('currentItem', itemDiv);
    }

    
    // indicates the selected item
    itemDiv.style.backgroundColor = 'gray';
    itemDiv.style.boxShadow = '4px 4px 10px rgba(0, 0, 0, 0.5)';


    editContainer.setAttribute('ref', itemDiv.id);
    createContainer.style.display = 'none'; // hard coded for now
    editContainer.style.display = 'flex';
    editContainer.style.flexDirection = 'column';

  })
  for (const option in data) {
    const optionDiv = createOptionDiv(option, itemDiv.id);
    itemDiv.append(optionDiv);
  }
  eContainer.append(itemDiv); // current div its appending to
}


// displays menu
async function loadMenu(path) {
  const data = await readUserData(path, '');
  const container = document.createElement('div');
  Object.keys(data).forEach(key => {
    const itemContainer = document.createElement('div');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    removeButton.addEventListener('click', () => {
      setTimeout(() => {
        removeButton.textContent = 'remove';
      }, 3000);
      if (removeButton.textContent == 'delete') {
        itemContainer.remove();
        removeUserData('StoreMenu', key);
      }
      removeButton.textContent = 'delete';
    
    })
    // itemContainer.className = 'itemContainer';
    itemContainer.style.display = 'flex';
    itemContainer.style.flexDirection = 'column';
    const itemName = document.createElement('span');
    itemName.style.color = 'orange';
    itemName.textContent = data[key].name;
    itemContainer.append(itemName, removeButton);
    container.append(itemContainer);
    Object.keys(data[key]).forEach(subKey => {
      if (subKey != 'name' && subKey != 'id') {
        const optionContainer = document.createElement('div');
        const optionName = document.createElement('span');
        optionName.textContent = subKey + " ";
        optionName.style.color = 'red';
        optionContainer.append(optionName);
        optionContainer.style.display = 'inherit';
        optionContainer.style.flexDirection = 'column'
        if (subKey == 'object') {
          Object.keys(data[key][subKey]).forEach(sKey => {
            const subName = document.createElement('span');
            subName.textContent = sKey;
            optionContainer.append(subName);
          })
        } else {
          const text = document.createElement('span');
          if (subKey == 'price') {
            text.textContent = `$${data[key][subKey]}`;
          } else {
            text.textContent = data[key][subKey];
          }
          
          optionContainer.append(text);
        }
        itemContainer.append(optionContainer);
      }
    });
    container.append(itemContainer);
  });
  return container;
}


const MenuItem = document.createElement('span');
MenuItem.textContent = 'ITEM LIST';
eContainer.append(MenuItem);
const templateFrame = document.createElement('div');
templateFrame.id = 'templateFrame';
templateFrame.append(await loadTemplate("StoreTemplate's"));
createContainer.append(templateFrame);
menuListContainer.append(await loadMenu("StoreMenu"));
addItemButton(createContainer);


function createTemplateObject (data) {
  let myObject = {};
  for (const key in data) {
    if (data[key] == "") {
      // console.log('ran');
      return "";
    }
    myObject[key] = createTemplateObject(data[key]);
  }
  if (Object.keys(myObject).length === 0) {
    return ""
  } 
  return myObject;
  
}

