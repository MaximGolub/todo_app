import { Http } from '../services';
import { TaskView } from '../views';
import { store } from '../services/Store';
import { Task } from '../entities';

class TaskModule {
  constructor() {
    this.taskView = new TaskView({
      getTasks: this.getTasks.bind(this),
      addTask: this.addTask.bind(this),
      deleteTask: this.deleteTask.bind(this),
    });
  }

  async getTasks() {
    const tasks = await Http.get({
      url: '/todo',
    });

    store.setState('todo', tasks);
  }

  async addTask() {
    const reqBody = TaskView.getRequestBodyFromForm(this.taskView.todosFormEl);

    const task = await Http.post({
      url: '/todo',
      body: reqBody,
    });

    store.setState(
      'todo',
      new Task({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        createdDate: task.createdDate,
      })
    );
  }

  async deleteTask(id) {
    await Http.delete({
      url: `/todo/${id}`,
    });
  }
}

export default TaskModule;
