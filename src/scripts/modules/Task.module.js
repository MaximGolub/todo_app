import { Http } from '../services';
import { TaskView } from '../views';
import { store } from '../services/Store';
import { Task } from '../entities';

class TaskModule {
  constructor() {
    this.taskView = new TaskView({
      addTask: this.addTask.bind(this),
      getTask: this.getTask.bind(this),
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

  async getTask() {
    const task = await Http.get({
      url: `/todo`,
    });
    console.log(task);
  }

  async deleteTask() {
    await Http.delete({
      url: `/task/${task_id}`,
    });
    store.setState('task', null);
  }
}

export default TaskModule;
