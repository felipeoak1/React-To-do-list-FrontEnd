export default class APIError extends Error {
  constructor(response, body) {
    super();
    this.response = response;
    this.name = "APIError";
    this.message = (
      body ? body?.error : `${response.status} - ${response.statusText}`
    );
  }
}
