import APIError from "../../errors/APIError";
import delay from "../../utils/delay";

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    delay(1000);
    let body;

    const response = await fetch(`${this.baseURL}${path}`);

    const contentType = response.headers.get("Content-Type");

    if (contentType.includes("application/json")) {
      body = await response.json();
    }

    // Status code between 200-299
    if (response.ok) {
      return body;
    }

    throw new APIError(response, body);
  }

  async post(path, data) {
    delay(1000);

    let body;

    const response = await fetch(`${this.baseURL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      body = await response.json();
    }

    // Status code between 200-299
    if (response.ok) {
      return body;
    }

    throw new APIError(response, body);
  }

  async delete(path, id) {
    delay(1000);

    const response = await fetch(`${this.baseURL}${path}/${id}`, {
      method: "DELETE", // Usando o método DELETE para a requisição
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Status code between 200-299
    if (response.ok) {
      return response.statusText;
    }

    throw new APIError(response);
  }

  async update(path, id, data) {
    delay(1000);

    let body;

    const response = await fetch(`${this.baseURL}${path}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(response, body);
  }
}

export default HttpClient;
