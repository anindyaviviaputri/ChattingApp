document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const editModal = document.getElementById('editModal');
    const editInput = document.getElementById('editInput');
    const updateTaskBtn = document.getElementById('updateTaskBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');

    let todos = [];
    let currentTodoId = null;

    document.getElementById('addTaskBtn').addEventListener('click', function() {
        const task = todoInput.value.trim();
        if (task) {
            const todo = { id: Date.now(), task: task, timestamp: new Date().toLocaleString() };
            todos.push(todo);
            renderTodos();
            todoInput.value = '';
            Swal.fire('Task Added', 'Your task has been added successfully!', 'success');
        }
    });

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.setAttribute('data-aos', 'fade-up');
            li.innerHTML = `
                <div>
                    <span>${todo.task}</span>
                    <small>${todo.timestamp}</small>
                </div>
                <div>
                    <button class="text-green-500 hover:text-green-700 mr-2" onclick="openEditModal(${todo.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-red-500 hover:text-red-700" onclick="confirmDelete(${todo.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }

    window.openEditModal = function(id) {
        currentTodoId = id;
        const todo = todos.find(todo => todo.id === id);
        editInput.value = todo.task;
        editModal.classList.remove('hidden');
    };

    updateTaskBtn.addEventListener('click', function() {
        const updatedTask = editInput.value.trim();
        if (updatedTask) {
            todos = todos.map(todo => todo.id === currentTodoId ? { ...todo, task: updatedTask } : todo);
            renderTodos();
            editModal.classList.add('hidden');
            Swal.fire('Task Updated', 'Your task has been updated successfully!', 'success');
        }
    });

    cancelEditBtn.addEventListener('click', function() {
        editModal.classList.add('hidden');
    });

    window.confirmDelete = function(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                todos = todos.filter(todo => todo.id !== id);
                renderTodos();
                Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
            }
        });
    };
});
