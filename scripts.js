// grab elements
const inputElement = document.querySelector('input');
const listElement = document.querySelector('.list');

// create new elements and add class list
const addMove = document.createElement('i');
const addContent = document.createElement('div');
const addCopy = document.createElement('i');
const addDelete = document.createElement('i');

addMove.classList.add("fas", "fa-grip-vertical", "drag");
addContent.classList.add("content");
addCopy.classList.add("fas", "fa-copy", "copy", "icon", "push");
addDelete.classList.add("fas", "fa-times", "delete", "icon", "edit");

// focus curson in input on load
window.onload = inputElement.focus();

// add return key listen and call addItem function
inputElement.addEventListener('keydown', function() {
  if (event.code == 'Enter') {
    addItem();
    inputElement.value = "";
    inputElement.focus();
  }
});

// add event listeners
const copy = function(e) {
  const itemText = e.target.previousElementSibling.innerText;
  itemText.select();
  document.execCommand("copy");
  console.log(itemText);
}

const remove = function(e) {
  e.target.parentElement.remove();
}

const copyListener = function(addCopy) {
    console.log(addCopy);
    addCopy.addEventListener("click", copy)
}

const deleteListener = function(addDelete) {
    console.log(addDelete);
    addDelete.addEventListener("click", remove)
}


// add pasted item to list
const addItem = function() {
  const enteredText = inputElement.value;
  addContent.textContent = enteredText;

  const contentContainer = document.createElement('div');
  contentContainer.classList.add("item");

  // add elements to div
  contentContainer.innerHTML = addMove.outerHTML + addContent.outerHTML + addCopy.outerHTML + addDelete.outerHTML;

  // add item to top of the list
  const firstListItem = listElement.firstChild;
  listElement.insertBefore(contentContainer, firstListItem);

  copyListener(addCopy);
  deleteListener(addDelete);
};
