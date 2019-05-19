// grab elements
const inputElement = document.querySelector('input');
const listElement = document.querySelector('.list');

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
const copyListener = function() {
  const allCopyIcons = document.querySelectorAll('.copy');
  if (allCopyIcons.length > 1){
    allCopyIcons.forEach(e => e.addEventListener('click', copy));
  } else {
    allCopyIcons[0].addEventListener('click', copy)
  };
}

const copyListenerTwo = function(addCopy) {
    console.log(addCopy);
    addCopy.addEventListener("click", copy)
}

const deleteListenerTwo = function(addDelete) {
    console.log(addDelete);
    addDelete.addEventListener("click", remove)
}

const copy = function(e) {
  const itemText = e.target.previousElementSibling.innerText;
  itemText.select();
  document.execCommand("copy");
  console.log(itemText);
}

const deleteListener = function() {
  const allDeleteIcons = document.querySelectorAll('.delete');
  if (allDeleteIcons.length > 1){
    allDeleteIcons.forEach(e => e.addEventListener('click', remove));
  } else {
    allDeleteIcons[0].addEventListener('click', remove)
  };
}

const remove = function(e) {
  e.target.parentElement.remove();
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

  copyListenerTwo(addCopy);
  deleteListenerTwo(addDelete);
};
