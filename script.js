'use strict';




let uniqueId;
const my_key = 'My todo list'

const myKey2 = "My id";

if(localStorage.getItem(myKey2)) {
    uniqueId = +(localStorage.getItem(myKey2)) + 1;
}
else{
    uniqueId = 1;
}

const todoInputEl = document.querySelector('.todo_input');
const todoItemCont = document.querySelector('.todo_list_container')

const addBtn = document.querySelector('.add_btn')
const clearListBtn = document.querySelector('.clear_list_btn')

const formEl = document.querySelector('.form')

const retrievedData = localStorage.getItem(my_key)
const parsedRetrievedData = JSON.parse(retrievedData)

let todoArr;

if(!parsedRetrievedData){
    todoArr = []
}else{
    todoArr = parsedRetrievedData
}



// todoItemCont.innerHTML = '';

formEl.addEventListener('submit', (e) => {
    
    e.preventDefault()

    if(!todoInputEl.value) {alert('Please enter something'); return;}
    
    const html = `
        <li class="flex_center | todo_item" id=${uniqueId}>
            <p class="item">${todoInputEl.value}</p>
            <button class="btn | delete_btn">Delete item</button>
        </li>
    `;

    todoArr.push({todo: todoInputEl.value, id: uniqueId });
    localStorage.setItem(myKey2, uniqueId)

    todoInputEl.value = ''
    todoInputEl.focus()

    const todoArrStr = JSON.stringify(todoArr)
    localStorage.setItem(my_key, todoArrStr)
    
    uniqueId++
    
    todoItemCont.insertAdjacentHTML("afterbegin", html);

})

todoArr.forEach(({todo,id}) => {
    const html = `
        <li class="flex_center | todo_item" id=${id}>
            <p class="item">${todo}</p>
            <button class="btn | delete_btn">Delete item</button>
        </li>
    `;

    todoItemCont.insertAdjacentHTML('afterbegin', html)
})


clearListBtn.addEventListener('click', () => {
    confirm('you want to clear the list')
    todoItemCont.innerHTML = ''
    localStorage.removeItem(my_key)
})



todoItemCont.addEventListener('click', e => {
    if(!e.target.classList.contains('delete_btn')) return;
    // we are generating id in js then retriving it here
    const parentEl = e.target.parentElement
    const parentElId = +parentEl.getAttribute('id');

    const newTodoArr = todoArr.filter(({todo, id}) => id !==parentElId);
    localStorage.setItem(my_key, JSON.stringify(newTodoArr))


    parentEl.remove();
})


// JSON: Javascript Object Notation.
// JS object converted to string
// local storage store the data in key-value pair in string format
