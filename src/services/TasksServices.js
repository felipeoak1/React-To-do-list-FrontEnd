import HttpClient from "./utils/HttpClient";

class TasksServices {
  constructor() {
    this.httpClient = new HttpClient("http://localhost:3001");
  }

  async listTasks(orderBy = "asc") {
    return this.httpClient.get(`/tasks?orderBy=${orderBy}`);
  }

  async createTask(task) {
    return this.httpClient.post("/tasks", task);
  }

  async deleteTask(id) {
    return this.httpClient.delete("/tasks", id);
  }

  async updateTask(id, data) {
    return this.httpClient.update("/tasks", id, data);
  }
}

export default new TasksServices();
