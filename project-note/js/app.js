console.log("This is new Note App");

//If a user add a note , add it to localstorage.
let addBtn = document.getElementById('addBtn');
let addTitle = document.getElementById('noteTitle');
let addTxt = document.getElementById('addTxt');
let hiddenId = document.getElementById('hiddenIdValue');


showNotes();

addBtn.addEventListener('click', (e) => {
    let notes = localStorage.getItem('notes');
    if(notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let formIndexValue = hiddenId.value;

        if(formIndexValue) {
            notesObj[formIndexValue]['key'] = addTitle.value;
            notesObj[formIndexValue]['value'] = addTxt.value;
            localStorage.setItem("notes", JSON.stringify(notesObj));
            addTxt.value = "";
            addTitle.value = "";
            hiddenIdValue.value = "";
        } else {
                let notesObject = {
                    key: addTitle.value, 
                    value: addTxt.value
                };
                notesObj.push(notesObject);
                // notesObj.push(addTxt.value);
                localStorage.setItem("notes", JSON.stringify(notesObj));
                addTxt.value = "";
                addTitle.value = "";
        }
    window.scrollTo(0,document.body.scrollHeight);
    showNotes();
});
// function  to show elements from localStorage
function showNotes() {
    if(hiddenId.value) {
        addBtn.innerHTML = 'Update Note';
    } else  {
        addBtn.innerHTML = 'Add Note';
    }
    let notes = localStorage.getItem('notes');
    if(notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach((element, index) => {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <div class="edit btn btn-info" id="${index}" onclick="editCardNote(this.id)">edit</div>
                    <h5 class="card-title">${index + 1} - ${element.key}</h5>
                    <p class="card-text">${element.value}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    <button id="${index}" onclick="markImportant(this.id)" class="btn btn-primary my-2">Mark as important</button>
                </div>
            </div>`;
        });
    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0) {
         notesElm.innerHTML = html;
        }
         else {
            notesElm.innerHTML = `Nothing to show ! use "Add a Note " section above to add a notes.`;
        }
}

// functions to delete a note
function deleteNote(index) {
    // console.log("I am deleting", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// search the respective note.
let search = document.getElementById('searchTxt');
search.addEventListener('input', () => {

    let inputVal = search.value.toLowerCase();
    // console.log("Input event fired", inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach((element) => {
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        // console.log(cardTxt);
        if(cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})


// functions to edit a card note
function editCardNote(index){
    window.scrollTo(0,0);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log(index);
    addTxt.value = notesObj[index].value;
    addTitle.value = notesObj[index].key;
    
    hiddenId.value = index;
    if(hiddenId.value) {
        addBtn.innerHTML = 'Update Note';
    } else  {
        addBtn.innerHTML = 'Add Note';
    }
    console.log(notesObj[index].key + " " + notesObj[index].value + " " + hiddenId.value);
}

//Mark note as Important;
function markImportant(ev) {
    console.log(ev);
    let clickImp = document.getElementById(ev);
    let parentTargetElm = clickImp.parentNode.parentNode;
    if(parentTargetElm.classList.contains('important')) {
        parentTargetElm.classList.remove('important');
    } else {
        parentTargetElm.classList.add('important');
        if(parentTargetElm.previousElementSibling) {
            parentTargetElm.parentNode.insertBefore(parentTargetElm, parentTargetElm.previousElementSibling);
        }
    }
}