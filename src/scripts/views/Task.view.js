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
    this.callbacks = callbacks;
    this.root = document.getElementById(TODOS_SECTION_ID);
    store.subscribe(this);
    this.callbacks.getTask();
  }

  static getRequestBodyFromForm = (form) => {
    const reqBody = {};
    const inputSelectors = form.querySelectorAll('input');
    const selectSelectors = form.querySelectorAll('#task-selector');

    for (let index = 0; index < inputSelectors.length; index++) {
      const element = inputSelectors[index];
      const nameAttr = element.getAttribute('name');
      reqBody[nameAttr] = element.value;
    }

    for (let index = 0; index < selectSelectors.length; index++) {
      const element = selectSelectors[index];
      const nameAttr = element.getAttribute('name');
      reqBody[nameAttr] = element.value;
    }
    return reqBody;
  };

  init() {
    this.onSetElements();
    this.addEventListener();
    // this.storeTask();
  }

  // storeTask() {
  //   const storeTask = store.getState();

  //   const obj = {
  //     title: storeTask.todo.title,
  //     description: storeTask.todo.description,
  //     status: storeTask.todo.status,
  //     createdDate: storeTask.todo.createdDate,
  //   };

  //   const tBody = this.todosTableEl.querySelector('tbody');
  //   const trEl = document.createElement('tr');

  //   Object.entries(obj).forEach(([key, value]) => {
  //     const tdEl = document.createElement('td');
  //     tdEl.innerText = value;
  //     trEl.appendChild(tdEl);
  //   });

  //   tBody.prepend(trEl);

  //   // this.todosTableEl.innerHTML = generateTableTaskTemplate({
  //   //   title: storeTask.todo.title,
  //   //   description: storeTask.todo.description,
  //   //   status: storeTask.todo.status,
  //   //   createdDate: storeTask.todo.createdDate,
  //   // });
  // }

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

  handlerAddTask(e) {
    e.preventDefault();
    this.callbacks.addTask();
  }

  removeListeners() {
    this.btnAddTask.removeEventListener(
      'click',
      this.handlerAddTask.bind(this)
    );
  }

  update({ user }) {
    if (user) {
      this.init();
    } else {
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
