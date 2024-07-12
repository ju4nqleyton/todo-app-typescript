"use strict";
class TODO {
    constructor(description, status = false, edit = false) {
        this.description = description;
        this.status = status;
        this.edit = edit;
    }
    setStatus() {
        this.status = true;
    }
    setEdit() {
        this.edit = true;
    }
    updateDescription(newDescription) {
        if (this.edit) {
            this.description = newDescription;
        }
    }
    toggleStatus() {
        this.status = !this.status;
    }
    toggleEdit() {
        if (!this.status) {
            this.edit = !this.edit;
        }
    }
    getDescription() {
        return this.description;
    }
    getStatus() {
        return this.status;
    }
    getEditStatus() {
        return this.edit;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    let store = [];
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addToDo();
    });
    function addToDo() {
        const description = todoInput.value.trim();
        if (description.length === 0) {
            return;
        }
        const todo = new TODO(description);
        store.push(todo);
        todoInput.value = '';
        renderToDos();
    }
    function renderToDos() {
        todoList.innerHTML = '';
        store.forEach((todo, index) => {
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo-item');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.status;
            checkbox.disabled = todo.edit;
            checkbox.addEventListener('change', () => {
                todo.toggleStatus();
                renderToDos();
            });
            const descriptionSpan = document.createElement('span');
            descriptionSpan.textContent = todo.description;
            descriptionSpan.style.textDecoration = todo.status
                ? 'line-through'
                : 'none';
            const editButton = document.createElement('button');
            editButton.textContent = todo.edit ? 'Save' : 'Edit';
            editButton.addEventListener('click', () => {
                todo.toggleEdit();
                renderToDos();
            });
            editButton.disabled = todo.status;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                store.splice(index, 1);
                renderToDos();
            });
            todoDiv.appendChild(checkbox);
            if (todo.edit) {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = todo.description;
                input.addEventListener('change', (event) => {
                    todo.updateDescription(event.target.value);
                });
                todoDiv.appendChild(input);
            }
            else {
                todoDiv.appendChild(descriptionSpan);
            }
            todoDiv.appendChild(editButton);
            todoDiv.appendChild(deleteButton);
            todoList.appendChild(todoDiv);
        });
    }
    window.toggleStatus = (index) => {
        store[index].toggleStatus();
        renderToDos();
    };
    window.toggleEdit = (index) => {
        store[index].toggleEdit();
        renderToDos();
    };
    window.deleteTodo = (index) => {
        store.splice(index, 1);
        renderToDos();
    };
});
