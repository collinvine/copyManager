// grab elements
const listElement = document.querySelector('.list');
const inputElement = document.querySelector('input');

// focus curson in input on load
window.onload = () => {
    inputElement.focus();
    inputElement.addEventListener('keydown', function() {
        if (event.code === 'Enter' || event.code === "NumpadEnter") {
            addItem();
            inputElement.value = "";
            inputElement.focus();
        };
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
    event.target.parentElement.remove();
};

const copyListener = addCopy => {
    addCopy.addEventListener("click", copy);
};

const deleteListener = addDelete => {
    addDelete.addEventListener("click", remove);
};

// add pasted item to list
const addItem = () => {
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
    const enteredText = inputElement.value;
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

    // FUNctions
    dynamicId(contentContainer);
    addToStorage(contentContainer, addContent);

};



//

// add a dynamic ID, use for the key
const dynamicId = contentContainer => {
  const countItem = document.getElementsByClassName('item');
  let n = countItem.length;
  contentContainer.setAttribute("id", n);
};

// for setting local storage
const addToStorage = (contentContainer, addContent) => {
  let key = contentContainer.id;
  let value = addContent.textContent;
  localStorage.setItem(key, value);
  console.log(localStorage.getItem(key));
};


// for Chrome storage
// const addToStorage = (contentContainer, addContent) => {
//   let key = contentContainer.id;
//   let value = addContent.textContent;
//   chrome.storage.local.set({key: value}, function() {
//     console.log(`The message was saved with key ${key} and value as ${value}`);
//   });
// };
