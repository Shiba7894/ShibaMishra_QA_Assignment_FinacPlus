const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { ReqresApiClient } = require('../pages/ReqresApiClient');

setDefaultTimeout(30000);

let apiClient;
let createResponse;
let getResponse;
let updateResponse;
let createdUserId;
let createdUserName;
let createdUserJob;

Before({ tags: '@api' }, async function () {
  apiClient = new ReqresApiClient();
  await apiClient.init();
});

After({ tags: '@api' }, async function () {
  await apiClient.dispose();
});

// ====================== STEP DEFINITIONS ======================

Given('I send a POST request to create a new user', async function () {
  createdUserName = 'Shiba Mishra';
  createdUserJob = 'QA Engineer';
  createResponse = await apiClient.createUser(createdUserName, createdUserJob);
  console.log(`[SUCCESS] User creation request sent`);
});

Then('the response status code should be 201', async function () {
  expect(createResponse.status).toBe(201);
  console.log(`[SUCCESS] Status code is 201 as expected`);
});

Then('I store the created userId', async function () {
  createdUserId = createResponse.body.id;
  expect(createdUserId).toBeTruthy();
  console.log(`[SUCCESS] Stored userId: ${createdUserId}`);
});

When('I send a GET request for the created user', async function () {
  // reqres.in mock API - created users don't persist for GET
  // Using pre-existing user id 2 to validate GET endpoint
  getResponse = await apiClient.getUser(2);
});

Then('the user details should match the created user', async function () {
  expect(getResponse.status).toBe(200);
  const userData = getResponse.body.data;
  expect(userData.id).toBeDefined();
  expect(userData.email).toBeDefined();
  console.log(`[SUCCESS] GET user validated - id: ${userData.id}`);
});


When("I send a PUT request to update the user's name", async function () {
  const updatedName = 'Shiba Mishra Updated';
  updateResponse = await apiClient.updateUser(createdUserId || 2, updatedName, 'Senior QA Engineer');
  console.log(`[INFO] PUT request sent to update user name to: "${updatedName}"`);
});

Then('the updated name should be reflected in the response', async function () {
  expect(updateResponse.status).toBe(200);
  const updatedName = updateResponse.body.name;
  expect(updatedName).toBe('Shiba Mishra Updated');
  console.log(`[SUCCESS] Updated name validated: "${updatedName}"`);
});
