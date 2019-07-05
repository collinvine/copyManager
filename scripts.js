// grab elements and set global variables
const listElement = document.querySelector('.list');
const inputElement = document.querySelector('input');
let dynamicId = 0;
const getKeyValuePairs = Object.entries(localStorage);

// set new ID constant and make it one higher than what is in local storage
const nextId = () => {
    if (localStorage.length > 0) {
        const keys = Object.keys(localStorage);
        const sortedKeys = keys.sort(function(a, b){return b-a});
        dynamicId = sortedKeys[0];
        dynamicId++;
    } else {
        dynamidId = 0;
    };
};

// focus curson in input on load
window.onload = () => {
    nextId();
    addKeyValuePairs();
    inputElement.focus();
    inputElement.addEventListener('keydown', function() {
        if (event.code === 'Enter' || event.code === "NumpadEnter") {
            addItem(inputElement.value, dynamicId);
            addToStorage();
            dynamicId += 1;
            inputElement.value = "";
            inputElement.focus();
        };
    });
};

// get storage items and add them to the list
const addKeyValuePairs = () => {
    const sortedKVPairs = getKeyValuePairs.sort();
    sortedKVPairs.forEach(item => {
        addItem(item[1], item[0]);
        console.log(`The key is ${item[0]} and the value is ${item[1]}`);
    });
};

// add event listeners
const copy = event => {
    const range = document.createRange();
    const selection = window.getSelection();

    selection.removeAllRanges();
    range.selectNodeContents(event.target.previousElementSibling);
    selection.addRange(range);
    document.execCommand('copy');
};

const remove = event => {
    const eventId = event.target.parentElement.id;
    console.log(eventId);
    event.target.parentElement.remove();
    localStorage.removeItem(eventId);
};

const copyListener = addCopy => {
    addCopy.addEventListener("click", copy);
};

const deleteListener = addDelete => {
    addDelete.addEventListener("click", remove);
};

// add pasted item to list
const addItem = (content, id) => {
    // create new elements and add class list
    const addMove = document.createElement('i');
    const addContent = document.createElement('div');
    const addCopy = document.createElement('i');
    const addDelete = document.createElement('i');
    const contentContainer = document.createElement('div');

    addMove.classList.add("fas", "fa-grip-vertical", "drag");
    addContent.classList.add("content");
    addCopy.classList.add("fas", "fa-copy", "copy", "icon", "push");
    addDelete.classList.add("fas", "fa-times", "delete", "icon", "edit");
    contentContainer.classList.add("item");

    // get value of entered text
    const enteredText = content;
    addContent.textContent = enteredText;

    // add elements to content container div
    contentContainer.appendChild(addMove);
    contentContainer.appendChild(addContent);
    contentContainer.appendChild(addCopy);
    contentContainer.appendChild(addDelete);

    // add div to top of the list
    const firstListItem = listElement.firstChild;
    listElement.insertBefore(contentContainer, firstListItem);

    // add listners
    copyListener(addCopy);
    deleteListener(addDelete);

    // set the ID
    contentContainer.setAttribute("id", id);
};


// for setting local storage
const addToStorage = () => {
  const key = listElement.firstChild.id;
  const value = inputElement.value;
  localStorage.setItem(key, value);
};

// for Chrome storage
// const addToStorage = (contentContainer, addContent) => {
//   let key = contentContainer.id;
//   let value = addContent.textContent;
//   chrome.storage.local.set({key: value}, function() {
//     console.log(`The message was saved with key ${key} and value as ${value}`);
//   });
// };
