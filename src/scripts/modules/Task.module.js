import { Http } from '../services';
import { TaskView } from '../views';
import { store } from '../services/Store';
import { Task } from '../entities';

class TaskModule {
  constructor() {
    this.taskView = new TaskView({
      addTask: this.addTask.bind(this),
      deleteTask: this.deleteTask.bind(this),
    });
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

  async deleteTask() {
    await Http.delete({
      url: `/todo/${store.state.todo.id}`,
    });
  }
}

export default TaskModule;
