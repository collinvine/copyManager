// grab elements
const listElement = document.querySelector('.list');
const inputElement = document.querySelector('input');
let dynamicId = 0;
const getAllItems = Object.values(localStorage);

// set new ID constant and make it one higher than
const nextId = () => {
    const keys = Object.keys(localStorage);
    keys.sort(function(a, b){return b-a});
    dynamicId = keys[0];
    dynamicId++;
};

// focus curson in input on load
window.onload = () => {
    nextId();
    addAllItems();
    inputElement.focus();
    inputElement.addEventListener('keydown', function() {
        if (event.code === 'Enter' || event.code === "NumpadEnter") {
            addItem(inputElement.value);
            addToStorage();
            inputElement.value = "";
            inputElement.focus();
        };
    });
};

// get storage items and add them to the list
const addAllItems = () => {
    getAllItems.forEach(item => {
        addItem(item);
    })
}

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
const addItem = item => {
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
    const enteredText = item;
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

    // Functions
    contentContainer.setAttribute("id", dynamicId); // THIS ISN'T WORKING! NEED TO FIX.
    dynamicId += 1;
};


// for setting local storage
const addToStorage = () => {
  const key = listElement.firstChild.id;
  const value = inputElement.value;
  localStorage.setItem(key, value);
  console.log("You added '" + localStorage.getItem(key) + "' to local storage.");
};


// for Chrome storage
// const addToStorage = (contentContainer, addContent) => {
//   let key = contentContainer.id;
//   let value = addContent.textContent;
//   chrome.storage.local.set({key: value}, function() {
//     console.log(`The message was saved with key ${key} and value as ${value}`);
//   });
// };
