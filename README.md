# Personalized Horoscope API

A Node.js backend service that generates and serves personalized daily horoscopes for users based on their zodiac sign.

## 🚀 Features

- **User Authentication**: JWT-based signup and login system
- **Auto Zodiac Detection**: Automatically calculates zodiac sign from birthdate
- **Daily Horoscopes**: Personalized horoscopes based on user's zodiac sign
- **History Tracking**: Access to last 7 days of horoscope history
- **Rate Limiting**: Protection against API abuse (5 requests per minute)
- **API Documentation**: Complete Swagger/OpenAPI documentation
- **Data Persistence**: MongoDB integration for user data and history

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Documentation**: Swagger/OpenAPI 3.0
- **Security**: bcryptjs for password hashing, rate limiting middleware

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personalized-horoscope-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/horoscope_db
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For local MongoDB installation
   mongod
   
   # Or use MongoDB Atlas cloud connection string in MONGODB_URI
   ```

5. **Run the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the API**
   - API Base URL: `http://localhost:3000`
   - API Documentation: `http://localhost:3000/api-docs`
   - Health Check: `http://localhost:3000/health`

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/profile` | Get user profile | Yes |

### Horoscope

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/horoscope/today` | Get today's horoscope | Yes |
| GET | `/api/horoscope/history` | Get last 7 days history | Yes |
| GET | `/api/horoscope/signs` | Get all zodiac signs | No |
| GET | `/api/horoscope/date/:date` | Get horoscope for specific date | Yes |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login/signup, include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📊 API Usage Examples

### 1. User Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "birthdate": "1990-03-25"
  }'
```

### 2. User Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Get Today's Horoscope
```bash
curl -X GET http://localhost:3000/api/horoscope/today \
  -H "Authorization: Bearer <your-jwt-token>"
```

### 4. Get Horoscope History
```bash
curl -X GET http://localhost:3000/api/horoscope/history \
  -H "Authorization: Bearer <your-jwt-token>"
```

## 🏗️ Design Decisions

### 1. **Architecture Pattern**
- **RESTful API Design**: Clean, predictable URLs and HTTP methods
- **Modular Structure**: Separated routes, models, middleware, and configuration
- **Middleware Chain**: Authentication, validation, and rate limiting as middleware

### 2. **Database Design**
- **User Model**: Stores user data with embedded horoscope history
- **Zodiac Calculation**: Automatic zodiac sign detection based on birthdate
- **History Management**: Limited to 30 days to prevent unlimited growth

### 3. **Security Measures**
- **Password Hashing**: bcryptjs with salt rounds for secure password storage
- **JWT Authentication**: Stateless authentication with 7-day expiration
- **Rate Limiting**: 5 requests per minute to prevent API abuse
- **Input Validation**: Express Validator for request data validation

### 4. **Horoscope Generation**
- **Deterministic Algorithm**: Same horoscope for same date/sign combination
- **Rich Content**: Multiple horoscope variations per zodiac sign
- **Consistent Experience**: Date-based seeding ensures consistency

### 5. **Error Handling**
- **Centralized Error Handling**: Global error middleware
- **Meaningful Error Messages**: Clear, actionable error responses
- **Validation Errors**: Detailed validation feedback

## 🚀 Improvements for Production

### Short-term Improvements (Next Sprint)
1. **Enhanced Security**
   - Implement refresh tokens for better JWT management
   - Add password strength requirements
   - Implement account lockout after failed attempts

2. **Data Management**
   - Add database indexing for better performance
   - Implement data backup and recovery procedures
   - Add database connection pooling

3. **Monitoring & Logging**
   - Integrate structured logging (Winston)
   - Add application performance monitoring (APM)
   - Implement health check endpoints with detailed status

### Long-term Improvements (Future Releases)
1. **Advanced Features**
   - Real-time horoscope updates via WebSocket
   - Personalized horoscope preferences
   - Social features (share horoscopes, compatibility)
   - Push notifications for daily horoscopes

2. **Scalability**
   - Implement caching layer (Redis)
   - Add horizontal scaling with load balancers
   - Microservices architecture for different features
   - Database sharding for large user bases

3. **External Integrations**
   - Third-party horoscope APIs for diverse content
   - Email service for daily horoscope delivery
   - Social media integration for sharing
   - Payment gateway for premium features

4. **DevOps & Infrastructure**
   - Docker containerization
   - CI/CD pipeline setup
   - Kubernetes orchestration
   - Automated testing suite (unit, integration, e2e)

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 API Documentation

Complete API documentation is available at `/api-docs` when the server is running. The documentation includes:

- Interactive API explorer
- Request/response schemas
- Authentication examples
- Error code explanations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Email: support@horoscope-api.com

---

**Built with ❤️ for astrology enthusiasts**