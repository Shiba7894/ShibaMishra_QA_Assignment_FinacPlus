const { request } = require('@playwright/test');

const BASE_URL = 'https://reqres.in';

class ReqresApiClient {
  constructor() {
    this.apiContext = null;
  }

  async init() {
    this.apiContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-api-key': process.env.REQRES_API_KEY,
      },
    });
  }

  async dispose() {
    if (this.apiContext) {
      await this.apiContext.dispose();
    }
  }

  // POST /api/users - Create a new user
  async createUser(name, job) {
    const response = await this.apiContext.post('/api/users', {
      data: { name, job },
    });
    const body = await response.json();
    console.log(`[INFO] POST /api/users → Status: ${response.status()}`);
    console.log(`[INFO] Created User: ${JSON.stringify(body)}`);
    return { status: response.status(), body };
  }

  // GET /api/users/{id} - Get user by ID
  async getUser(userId) {
    const response = await this.apiContext.get(`/api/users/${userId}`);
    const body = await response.json();
    console.log(`[INFO] GET /api/users/${userId} → Status: ${response.status()}`);
    console.log(`[INFO] User Details: ${JSON.stringify(body)}`);
    return { status: response.status(), body };
  }

  // PUT /api/users/{id} - Update user
  async updateUser(userId, name, job) {
    const response = await this.apiContext.put(`/api/users/${userId}`, {
      data: { name, job },
    });
    const body = await response.json();
    console.log(`[INFO] PUT /api/users/${userId} → Status: ${response.status()}`);
    console.log(`[INFO] Updated User: ${JSON.stringify(body)}`);
    return { status: response.status(), body };
  }
}

module.exports = { ReqresApiClient };
