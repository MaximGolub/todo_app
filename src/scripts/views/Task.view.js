import {
  TODOS_SECTION_ID,
  TODOS_FORM_ID,
  TODOS_TABLE_ID,
  ADD_BUTTON_ID,
} from '../constants';
import { store } from '../services';
import { TODOS_FORM_TEMPLATE, TODOS_TABLE_TEMPLATE } from '../templates/';

class TaskView {
  constructor(callbacks) {
    this.root = document.getElementById(TODOS_SECTION_ID);
    this.callbacks = callbacks;
    store.subscribe(this);
  }

  static getRequestBodyFromForm = (form) => {
    const reqBody = {};

    const inputSelectors = form.querySelectorAll('input');
    const selectSelectors = form.querySelector('#task-selector');
    const nameAttr = selectSelectors.getAttribute('name');

    for (let index = 0; index < inputSelectors.length; index++) {
      const element = inputSelectors[index];
      const nameAttr = element.getAttribute('name');
      reqBody[nameAttr] = element.value;
    }

    reqBody[nameAttr] = selectSelectors.value;

    return reqBody;
  };

  init() {
    this.onSetElements();
    this.getTasks();
    this.addEventListener();
  }

  onSetElements() {
    this.todosFormEl = document.getElementById(TODOS_FORM_ID);
    this.todosFormEl.innerHTML = TODOS_FORM_TEMPLATE;
    this.todosTableEl = document.getElementById(TODOS_TABLE_ID);
    this.todosTableEl.innerHTML = TODOS_TABLE_TEMPLATE;
    this.btnAddTask = document.getElementById(ADD_BUTTON_ID);
  }

  addEventListener() {
    this.btnAddTask.addEventListener('click', this.handlerAddTask.bind(this));
  }

  addEventDeleteListener() {
    this.btnDeleteTask = document.getElementsByClassName('btn-delete');
    for (let i = 0; i < this.btnDeleteTask.length; i++) {
      this.btnDeleteTask[i].addEventListener(
        'click',
        this.handlerDeleteTask.bind(this)
      );
    }
  }

  handlerAddTask(e) {
    e.preventDefault();
    this.callbacks.addTask();

    setTimeout(() => {
      this.init();
    }, 1000);
  }

  handlerDeleteTask(e) {
    e.preventDefault();
    this.callbacks.deleteTask(e.target.value);

    setTimeout(() => {
      this.init();
    }, 1000);
  }

  async getTasks() {
    await this.callbacks.getTasks();

    const { todo } = store.getState();

    for (const task of todo) {
      const tBody = this.todosTableEl.querySelector('tbody');
      const trEl = document.createElement('tr');
      const btnDelete = document.createElement('button');
      btnDelete.className = 'btn-delete';
      btnDelete.value = `${task.id}`;
      btnDelete.innerText = 'DELETE';

      const obj = {
        title: task.title,
        description: task.description,
        status: task.status,
        createdDate: task.createdDate,
      };

      Object.entries(obj).forEach(([key, value]) => {
        const tdEl = document.createElement('td');
        tdEl.innerText = value;
        trEl.appendChild(tdEl);
      });

      trEl.appendChild(btnDelete);
      tBody.prepend(trEl);
    }
    this.addEventDeleteListener();
  }

  removeListeners() {
    this.btnAddTask.removeEventListener(
      'click',
      this.handlerAddTask.bind(this)
    );
    this.btnDeleteTask.removeEventListener(
      'click',
      this.handlerDeleteTask.bind(this)
    );
  }

  update({ user, todo }) {
    if (user && !todo) {
      this.init();
    }
    if (!user && todo) {
      this.destroy();
    }
  }

  destroy() {
    this.todosTableEl.innerHTML = '';
    this.todosFormEl.innerHTML = '';
    this.removeListeners();
  }
}

export default TaskView;
