/**
 * Halo kak, waktu saya lihat submissionnya mirip banget sama tugas membuat todo apps sebelumnya, maaf ya kak kalo mirip banget sama yang todo apps
 * Makasih Kak 
 */
const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF_APPS';

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Sejauh ini browser belum mendukung');
        return false;
    }
    return true;
}

function generateId() {
    return + new Date();
}
function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem
        }
    }
    return null;
}
function findBookID(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index
        }
    }
    return -1;
}

function createBook(bookObject) {
    const { id,
        title,
        author,
        year,
        isComplete
    } = bookObject;
    const bookTitle = document.createElement('h2');
    bookTitle.innerText = 'Judul Buku' + " = " + title;

    const bookAuthor = document.createElement('h4');
    bookAuthor.innerText = 'Penulis' + " = " + author;

    const bookYear = document.createElement('p');
    bookYear.innerText = 'Tahun Terbit' + " = " + year;

    const bookContainer = document.createElement('div');
    bookContainer.append(bookTitle, bookAuthor, bookYear);

    const container = document.createElement('div');
    container.classList.add('book_item');
    container.append(bookContainer);
    container.setAttribute('id', `book-${id}`);

    if (isComplete) {
        const backButton = document.createElement('button');
        backButton.classList.add('green');
        const division = document.createElement('p');
        division.innerText = " " + " " + " ";
        backButton.innerText = ' Belum selesai dibaca ';
        backButton.addEventListener('click', function () {
            cancelBookFromCompleted(id);
        });
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('red');
        deleteButton.innerText = ' Hapus ';
        deleteButton.addEventListener('click', function () {
            removeBookFromCompleted(id);
        });

        container.append(backButton, division, deleteButton);
    } else {

        const checkButton = document.createElement('button');
        checkButton.classList.add('green');
        checkButton.innerText = ' Selesai dibaca ';
        const cheer = document.createElement('p');
        cheer.innerText = "Semangat membaca bestie";
        const division = document.createElement('p');
        division.innerText = " " + " " + " ";
        checkButton.addEventListener('click', function () {
            addBookToCompleted(id);
        });
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('red');
        deleteButton.innerText = 'Hapus';
        deleteButton.addEventListener('click', function () {
            removeBookFromCompleted(id);
        });
        container.append(checkButton, division, deleteButton, cheer);
    }
    return container;
}
function addBook() {
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = parseInt(document.getElementById('inputBookYear').value);
    const isComplete = document.getElementById('inputBookIsComplete').checked;


    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, bookTitle, bookAuthor, bookYear, isComplete)
    books.push(bookObject);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function addBookToCompleted(bookId) {
    const bookTarget = findBook(bookId);
    if (bookTarget == null)
        return;

    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}
function removeBookFromCompleted(bookId) {
    if (confirm('Apakah anda ingin menghapus buku ini ?') == false) {
        alert('Oke bestie bukunya masih ada ya');
        return;
    } else {
        const bookTarget = findBookID(bookId);

        if (bookTarget === -1) return;

        books.splice(bookTarget, 1);
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
    }
}

function cancelBookFromCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}
document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');

    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener(RENDER_EVENT, function () {
    const uncompletedBOOKList = document.getElementById('incompleteBookshelfList');
    const listCompleted = document.getElementById('completeBookshelfList');

    // clearing list item
    uncompletedBOOKList.innerHTML = '';
    listCompleted.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = createBook(bookItem);
        if (bookItem.isComplete) {
            listCompleted.append(bookElement);
        } else {
            uncompletedBOOKList.append(bookElement);
        }
    }
});
function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT))
    }
}
document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));

})
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}
