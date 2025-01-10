# **CryptoMetrics** 🌟

**CryptoMetrics** is a powerful backend service designed for tracking cryptocurrency metrics. It supports live price tracking, portfolio management, CRUD operations, and in-depth analytics. The project is built with **Node.js**, **Docker**, and incorporates a robust CI/CD pipeline for deployment.

---

## 🌟 **Features**
- 📈 Fetch live prices for the top 10 cryptocurrencies.
- 🛠️ Manage portfolios with comprehensive CRUD operations.
- 📊 Perform detailed analytics on portfolio data.
- ✅ API-first design with built-in validation and error handling.

---

## 🚀 **Getting Started**

### **Prerequisites**
Before running this project, make sure you have the following installed:
- **[Node.js](https://nodejs.org/)** (v16 or later)
- **[Docker](https://www.docker.com/)**
- **[Docker Compose](https://docs.docker.com/compose/)**
- **[Postman](https://www.postman.com/)** or an equivalent API testing tool.

---

## 🖥️ **Running the Application Locally**

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/cryptometrics.git
cd cryptometrics
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=cryptometrics
JWT_SECRET=your_jwt_secret
```

### **4. Start the Application**
Run the server:
```bash
npm start
```

### **5. Access the API**
- Base URL: `http://localhost:5000`
- Example endpoint: `GET /api/v1/cryptos`

---

## 🐳 **Running with Docker**

### **1. Build and Run Containers**
```bash
docker-compose up --build
```

### **2. Verify the Service**
Access the API at:
```bash
http://localhost:5000
```

---

## 🔍 **Testing the Deployed API**

### **1. Deployed API Base URL**
Use your deployed API URL (e.g., `https://api.cryptometrics.com`).

### **2. Available Endpoints**
| **Method** | **Endpoint**              | **Description**                              |
|------------|---------------------------|----------------------------------------------|
| `GET`      | `/api/v1/cryptos`         | Fetch top 10 cryptocurrencies.              |
| `POST`     | `/api/v1/portfolio`       | Add a cryptocurrency to your portfolio.     |
| `GET`      | `/api/v1/portfolio`       | Retrieve portfolio details.                 |
| `PUT`      | `/api/v1/portfolio/:id`   | Update portfolio entry.                     |
| `DELETE`   | `/api/v1/portfolio/:id`   | Remove a cryptocurrency from your portfolio.|

### **3. Testing Tools**
- Use **Postman** or an equivalent API client for manual testing.
- Run automated tests locally with:
  ```bash
  npm test
  ```

---

## 🗂️ **Project Structure**
```
CryptoMetrics/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── app.js
├── tests/
│   └── portfolio.test.js
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── README.md
├── package.json
└── .github/workflows/ci-cd.yml
```

---

## ⚙️ **CI/CD Pipeline**

This project uses **GitHub Actions** for CI/CD.

### **Pipeline Steps**
1. Run tests for each push to the `main` branch.
2. Build and push Docker images to **Docker Hub**.
3. Deploy the API to a production environment.

---

## 🤝 **Contributing**

We welcome contributions! Follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## 📜 **License**
This project is licensed under the [MIT License](LICENSE).
