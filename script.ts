class TODO {
  description: string;
  status: boolean;
  edit: boolean;

  constructor(
    description: string,
    status: boolean = false,
    edit: boolean = false
  ) {
    this.description = description;
    this.status = status;
    this.edit = edit;
  }

  setStatus(): void {
    this.status = true;
  }

  setEdit(): void {
    this.edit = true;
  }

  updateDescription(newDescription: string): void {
    if (this.edit) {
      this.description = newDescription;
    }
  }

  toggleStatus(): void {
    this.status = !this.status;
  }

  toggleEdit(): void {
    if (!this.status) {
      this.edit = !this.edit;
    }
  }

  getDescription(): string {
    return this.description;
  }

  getStatus(): boolean {
    return this.status;
  }

  getEditStatus(): boolean {
    return this.edit;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form') as HTMLFormElement;
  const todoInput = document.getElementById('todo-input') as HTMLInputElement;
  const todoList = document.getElementById('todo-list') as HTMLDivElement;

  let store: TODO[] = [];

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
          todo.updateDescription((event.target as HTMLInputElement).value);
        });
        todoDiv.appendChild(input);
      } else {
        todoDiv.appendChild(descriptionSpan);
      }

      todoDiv.appendChild(editButton);
      todoDiv.appendChild(deleteButton);

      todoList.appendChild(todoDiv);
    });
  }

  (window as any).toggleStatus = (index: number) => {
    store[index].toggleStatus();
    renderToDos();
  };

  (window as any).toggleEdit = (index: number) => {
    store[index].toggleEdit();
    renderToDos();
  };

  (window as any).deleteTodo = (index: number) => {
    store.splice(index, 1);
    renderToDos();
  };
});
