export const servingOptionsTemplate = (title, optionList, container, objecName) => {
    let optionContainer = document.createElement('div');
    optionContainer.className = 'optionContainer';

    let optionTitle = document.createElement('span');
    let myObject = JSON.parse(localStorage.getItem(objecName));
    optionTitle.textContent = title;

    // console.log(myObject);

    let optionBtn = document.createElement('button');
    optionBtn.textContent = (myObject[title] != optionList[0]) ? myObject[title] : optionList[0];
    // console.log(optionBtn.textContent);

    optionContainer.append(optionTitle, optionBtn);

    let hiddenContainer = document.createElement('div');
    hiddenContainer.className = 'hiddenContainer';
    hiddenContainer.style.display = 'none';

    let hiddenTitle = document.createElement('h1');
    hiddenTitle.textContent = `Select a ${title}`;
    hiddenTitle.className = 'hiddenTitle';
    hiddenContainer.append(hiddenTitle);

    


    let optionLength = optionList.length;

    for (let i = 0; i < optionLength; i++) {
        let selection = document.createElement('button');
        selection.className = 'selection';
        selection.textContent = optionList[i];
        selection.addEventListener('click', () => {
            
            let myObject = JSON.parse(localStorage.getItem(objecName));
            myObject[title] = selection.textContent;
            const myObjectAsString = JSON.stringify(myObject);
            localStorage.setItem(objecName, myObjectAsString);

            optionBtn.textContent = selection.textContent;
            hiddenContainer.style.display = 'none';

        });
        hiddenContainer.append(selection);
    }

    optionBtn.addEventListener('click', () => {
        // alert('Option has been selected');
        hiddenContainer.style.display = 'flex';
        // optionTitle.textContent = optionBtn.textContent;
    });


    container.append(optionContainer, hiddenContainer);


}


