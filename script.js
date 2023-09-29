//Declarar as varíaveis

const mainContent = document.querySelector(".mainContent");
const title = document.querySelector(".title");
const author = document.querySelector(".author");
const numberOfPages = document.querySelector(".numberOfPages");
let resetButton = document.querySelector(".resetButton");
let totalBooks = document.querySelector(".totalBooks");
let totalRead = document.querySelector(".totalRead");
let totalNotRead = document.querySelector(".totalNotRead");
let totalPages = document.querySelector(".totalPages");
let myLibrary = [];
let booksFinished = 0;
const addButton = document.querySelector(".addButton");
const addNewBook = document.querySelector("#addNewBook");
const outputBox = document.querySelector("output");
let inputBookName = document.querySelector(".inputBookName");
let inputAuthorName = document.querySelector(".inputAuthorName");
let inputNumberOfPages = document.querySelector(".inputNumberOfPages");
let inputBookcover = document.querySelector(".inputBookcover");
const form = document.querySelector("form");
let number;
let haventReadRadio = document.querySelector("#haventReadRadio");
let haveReadRadio = document.querySelector("#haveReadRadio");
let add;
let edit;

//----------------------------------------------------------------------------------

// Construtor

function Book(title, author, numberOfPages, haveRead, bookcover) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.haveRead = haveRead;
  this.bookcover = bookcover;
  myLibrary.push(this);
}

//----------------------------------------------------------------------------------

const theHobbit = new Book(
  "The Hobbit",
  "J. R. R. Tolkien",
  "310",
  "Não li",
  "https://m.media-amazon.com/images/I/81-JdmZeA9L._AC_UF1000,1000_QL80_.jpg"
);
const harryPotter = new Book(
  "Harry Potter e a Pedra Filosofal",
  "J. K. Rowling",
  "264",
  "Já li",
  "https://m.media-amazon.com/images/I/71-++hbbERL._AC_UF894,1000_QL80_.jpg"
);
const atomicHabits = new Book(
  "Atomic Habits",
  "James Clear",
  "320 ",
  "Já li",
  "https://m.media-amazon.com/images/I/81bGKUa1e0L._AC_UF1000,1000_QL80_.jpg"
);
const naruto = new Book(
  "Naruto",
  "Masashi Kishimoto",
  "192",
  "Já li",
  "https://cdn.kobo.com/book-images/e354f3eb-d7f8-4339-9c95-f6b1885bad7d/1200/1200/False/naruto-vol-1.jpg"
);

const overlord = new Book(
  "Overlord",
  "So-bin Kugane Maruyama ",
  "318",
  "Já li",
  "https://cdn.kobo.com/book-images/21843689-7801-4896-96a7-426d24b8b92a/1200/1200/False/overlord-vol-1-light-novel-2.jpg"
);

const rezero = new Book(
  "Re:Zero",
  "Tappei Nagatsuki",
  "416",
  "Não li",
  "https://m.media-amazon.com/images/I/51xUmHH9y+L.jpg"
);

const theEminenceInShadow = new Book(
  "The Eminence in Shadow",
  "Daisuke Aizawa ",
  "266",
  "Não li",
  "https://m.media-amazon.com/images/I/51ksnMW3rhL._SY445_SX342_.jpg"
);

const showScreen = () => {
  booksFinished = 0;
  if (myLibrary.length == 0) {
    mainContent.innerHTML = "";
    return;
  }
  mainContent.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const newBook = document.createElement("div");
    let bookInfo = document.createElement("div");
    const editButton = document.createElement("button");
    const removeButton = document.createElement("button");
    const newBookTitle = document.createElement("h3");
    const newBookAuthor = document.createElement("h5");
    const newBookNumberOfPages = document.createElement("div");
    const newBookcoverContainer = document.createElement("div");
    const newBookcover = document.createElement("img");

    editButton.dataset.key = i;
    removeButton.innerText = "Remover";
    editButton.innerText = "Editar";

    editButton.classList.add("editButton");
    removeButton.classList.add("removeButton");
    bookInfo.classList.add("bookInfo");
    newBookcoverContainer.classList.add("newBookcoverContainer");
    newBook.classList.add("newBook");

    newBookcover.src = myLibrary[i].bookcover;

    mainContent.appendChild(newBook);
    newBook.appendChild(newBookcoverContainer);
    newBookcoverContainer.appendChild(newBookcover);
    newBook.appendChild(bookInfo);
    bookInfo.appendChild(newBookTitle);
    bookInfo.appendChild(newBookAuthor);
    bookInfo.appendChild(newBookNumberOfPages);
    bookInfo.appendChild(editButton);
    bookInfo.appendChild(removeButton);

    newBookTitle.append(myLibrary[i].title);
    newBookNumberOfPages.append(`${myLibrary[i].numberOfPages} páginas `);
    newBookAuthor.append(myLibrary[i].author);
    newBookcover.append(myLibrary[i].bookcover);
    if (myLibrary[i].haveRead == "Já li") {
      booksFinished++;
      newBook.classList.add("finished");
    } else {
      newBook.classList.add("unfinished");
    }
    editButton.addEventListener("click", () => {
      edit = true;
      add = false;
      number = editButton.dataset.key;
      inputBookName.value = myLibrary[i].title;
      inputAuthorName.value = myLibrary[i].author;
      inputNumberOfPages.value = myLibrary[i].numberOfPages;
      inputBookcover.value = myLibrary[i].bookcover;
      if (myLibrary[i].haveRead == "Não li") {
        haventReadRadio.checked = true;
      } else {
        haveReadRadio.checked = true;
      }

      addNewBook.showModal();
    });

    removeButton.addEventListener("click", () => {
      myLibrary.splice(i, 1);
      showScreen();
    });
  }

  userInfoUpdate();

  let cancelButton = document.querySelector("#cancelButton");
  cancelButton.addEventListener("click", (e) => {
    addNewBook.close();
  });
};

const userInfoUpdate = () => {
  totalBooks.innerHTML = `Total de livros: ${myLibrary.length} livros`;

  totalRead.innerHTML = `Livros terminados: ${booksFinished} livros`;
  totalNotRead.innerHTML = `Livros não terminados: ${
    myLibrary.length - booksFinished
  } livros`;
};

const reset = () => {
  myLibrary = [];
  booksFinished = 0;
  userInfoUpdate();
  showScreen();
};

const addBookToLibrary = () => {
  add = true;
  edit = false;
  addNewBook.showModal();
  form.reset();
};

resetButton.addEventListener("click", reset);

addButton.addEventListener("click", addBookToLibrary);

showScreen();

let cancelButton = document.querySelector("#cancelButton");
cancelButton.addEventListener("click", (e) => {
  addNewBook.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let haveReadRadio = document.querySelector(
    'input[name="haveReadRadio"]:checked'
  );

  if (edit == true) {
    /*const found = myLibrary.some((el) => el.title === inputBookName.value);
  if (!found) {
    new Book(
      inputBookName.value,
      inputAuthorName.value,
      inputNumberOfPages.value,
      haveReadRadio.value,
      inputBookcover.value
    );
    */

    myLibrary[number].title = inputBookName.value;
    myLibrary[number].author = inputAuthorName.value;
    myLibrary[number].numberOfPages = inputNumberOfPages.value;
    myLibrary[number].bookcover = inputBookcover.value;
    myLibrary[number].haveRead = haveReadRadio.value;
    form.reset();
  } else {
    new Book(
      inputBookName.value,
      inputAuthorName.value,
      inputNumberOfPages.value,
      haveReadRadio.value,
      inputBookcover.value
    );
    form.reset();
  }
  form.addEventListener("close", () => {
    form.reset();
  });

  addNewBook.close();
  showScreen();
});
