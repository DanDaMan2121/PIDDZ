let sizeContainer = document.getElementById('sizeContainer');

let storeList = [
    ['100 North St', 'Boston, MA 02108'],
    ['200 South St', 'Boston, MA 02112'],
    ['300 East St', 'Boston, MA 02109'],
    ['400 West St', 'Boston, MA 02110']
];

let storeTemplate = (address) => {
    let storeContainer = document.createElement('div');
    storeContainer.className = 'storeContainer';
    // storeContainer.innerHTML = address;
    let streetContainer = document.createElement('div')
    streetContainer.className = 'street';
    streetContainer.innerHTML = address[0];
    storeContainer.append(streetContainer);

    let townContainer = document.createElement('div');
    townContainer.className = 'town';
    townContainer.innerHTML = address[1];
    storeContainer.append(townContainer);

    return storeContainer
}


let generateStoreList = (storeList) => {
    for (let i = 0; i < storeList.length; i++) {
        let store = storeTemplate(storeList[i]);
        sizeContainer.append(store)
    }
    let contrastDiv = document.createElement('div');
    contrastDiv.className = 'contrastDivCrust';
    sizeContainer.append(contrastDiv);
}


document.addEventListener('DOMContentLoaded', () => {
    generateStoreList(storeList);
})

sizeContainer.addEventListener('click', (e) => {
    // console.log(e.target);
    if (e.target.id == 'back') {
        window.history.back();
    } else {
        parent = e.target.parentElement;
        if(parent.className == 'storeContainer') {
            // console.log(parent.children[1].innerHTML);
            let location = [parent.children[0].innerHTML, parent.children[1].innerHTML];
            // console.log(myStore);
            sessionStorage.setItem('location', JSON.stringify(location));
            console.log(JSON.parse(sessionStorage.getItem('location')));
            window.location.href = '../pages/menu.html';

        }

    }
})
