// console.log('hello')
function displayTodo(){
    let dataLocalStorage = localStorage.getItem("todos")
    let dataTodos = JSON.parse(dataLocalStorage)
    console.log(dataTodos)
    let listTodo = ``
    
    if (dataTodos) {
        for (let index = 0; index < dataTodos.length; index++) {
            listTodo += `
            <ul class="list-group list-group-horizontal rounded-0 bg-transparent m-2">
                <li class="list-group-item d-flex align-items-center ps-0 pe-0 py-1 rouded-0 border-0 bg-transparent ">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input me-0" value="" id=${dataTodos[index].id} onchange="setComplete(this.checked,this.id  )" ${dataTodos[index].checked ? 'checked':' '}/>
                    </div>
                </li>

                <li class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent ">
                    <p class="lead fw-normal mb-0">${dataTodos[index].name}</p>        
                </li>

                <li class="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent ">
                    <button type="button" class="btn btn-danger" id=${dataTodos[index].id} onclick="deleteTodo(this.id)"}>Delete</button>     
                </li>
            </ul>
            `
        }
    }
    document.getElementById('list-todo').innerHTML = listTodo
}

function submitTodo(){
    const todo = document.getElementById('add-todo').value

    let todos = JSON.parse(localStorage.getItem('todos'))

    if (todos) {
        todos.push({
            id:todos[todos.length-1].id+1,
            name : todo,
            checked : false
        })
    }else{
        todos=[{
            id:0,
            name:todo,
            checked:false
        }]
    }
    localStorage.setItem('todos', JSON.stringify(todos))

    document.getElementById('add-todo').value=''

    displayTodo()
}

function setComplete(checked,id){
    let todos = JSON.parse(localStorage.getItem('todos'))

    todos = todos.map(el => {
        if (el.id === Number(id)) {
            el.checked = checked
        }
        return el
    })  

    
    localStorage.setItem('todos', JSON.stringify(todos))

    displayTodo()   
}

function deleteTodo(id){
    let todos = JSON.parse(localStorage.getItem('todos'))

    todos=todos.filter(el => el.id !== Number(id))

    if (todos.length){
        localStorage.setItem('todos', JSON.stringify(todos))
    }else{
        localStorage.removeItem('todos')
    }

    displayTodo()    
}

function myFunction(){
    document.getElementById('form').remove();
    let formSubmission = `
        <div class="mb-3 row">
            <div class="col text-center text-light bg-primary p-5">
            <p>Thank you for your submission!</p>
            </div>
        </div>
    `
    document.getElementById('emptyBox').innerHTML = formSubmission
}