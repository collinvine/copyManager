// grab elements
const getInput = document.querySelector('input');
const getList = document.querySelector('.list');

const addMove = document.createElement('i');
const addContent = document.createElement('div');
const addCopy = document.createElement('i');
const addDelete = document.createElement('i');

addMove.classList.add("fas", "fa-grip-vertical", "drag");
addContent.classList.add("content");
addCopy.classList.add("fas", "fa-copy", "copy", "icon", "push");
addDelete.classList.add("fas", "fa-times", "delete", "icon", "edit");

// focus curson in input on load
window.onload = getInput.focus();

// add return key listen and call addItem function
getInput.addEventListener('keydown', function() {
  if (event.code == 'Enter') {
    addItem();
    getInput.value = "";
    getInput.focus();
  }
});

// add event listeners
function copyListener() {
  const getCopy = document.querySelectorAll('.copy');
  if (getCopy.length > 1){
    getCopy.forEach(e => e.addEventListener('click', copy));
  } else {
    getCopy[0].addEventListener('click', copy)
  };
}

function copy(e) {
  const getValue = e.target.previousSibling.innerText;
  getValue.select();
  document.execCommand("copy");
  console.log(getValue);
}

// add pasted item to list
const addItem = function() {
  const enteredText = getInput.value;
  addContent.textContent = enteredText;

  const contentContainer = document.createElement('div');
  contentContainer.classList.add("item");

  // add elements to div
  contentContainer.innerHTML = addMove.outerHTML + addContent.outerHTML + addCopy.outerHTML + addDelete.outerHTML;

  // add item to top of the list
  const getChild = getList.firstChild;
  getList.insertBefore(contentContainer, getChild);

  copyListener();
};
