# ShibaMishra_QA_Assignment_FinacPlus

A test automation framework built with **Playwright** + **Cucumber (BDD)** + **JavaScript** covering:
- **UI Automation** — DemoQA Book Store Application
- **API Automation** — Reqres.in REST API

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | Browser automation + API testing |
| [Cucumber JS](https://cucumber.io/) | BDD framework (Gherkin feature files) |
| [Allure](https://allurereport.org/) | Test reporting |
| Node.js | Runtime |
| dotenv | Environment variable management |

---

## 📁 Project Structure
```

src/
├── features/
│   ├── BookStore.feature      # UI test scenarios for DemoQA Book Store
│   └── ReqresApi.feature      # API test scenarios for Reqres.in
├── pages/
│   ├── BookStorePage.js       # Page object for DemoQA Book Store UI
│   └── ReqresApiClient.js     # API client for Reqres.in REST endpoints
└── steps/
├── BookStore.steps.js     # Step definitions for BookStore UI
└── Reqres.steps.js        # Step definitions for Reqres API


---

## ⚙️ Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/Shiba7894/ShibaMishra_QA_Assignment_FinacPlus.git
cd ShibaMishra_QA_Assignment_FinacPlus
```

### 2. Install dependencies

```bash
npm install
npx playwright install chromium
```

### 3. Configure environment variables

Create a `.env` file in the root:

```javascript
DEMOQA_USERNAME=your_demoqa_username
DEMOQA_PASSWORD=your_demoqa_password
REQRES_API_KEY=your_reqres_api_key
HEADLESS=true
```
---

## ▶️ Run Tests

```bash
# Run all tests
npx cucumber-js

# Run only BookStore UI tests
npx cucumber-js --tags "@bookStore"

# Run only API tests
npx cucumber-js --tags "@api"
```

---

## 📊 Allure Report

```bash
# Generate and open Allure report
npm run allure:report
```

---

## 📝 Environment Variables

| Variable | Description |
|---|---|
| DEMOQA_USERNAME | DemoQA login username |
| DEMOQA_PASSWORD | DemoQA login password |
| REQRES_API_KEY | Reqres.in API key (x-api-key header) |
| HEADLESS | Set true for headless, false to see browser |
---

## 👤 Author

Shiba Mishra