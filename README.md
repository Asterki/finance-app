# Financial App

Manage your expenses and incomes effortlessly through a web interface. The Financial App provides a user-friendly platform to track finances with account management, security features, and access from anywhere.

---

## Features

- Track **Income** and **Expenses**.
- Account System with secure authentication.
- Access from any device with an internet connection.
- Customizable **Preferences** for a tailored experience.
- **Two-Factor Authentication (TFA)** for enhanced security.

---

## Requirements

- **Node.js** v20.17.0+ (Tested on this version)
- **PostgreSQL** 17.1

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Asterki/financial-app.git
   cd financial-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` files to `.env` in their respective locations (client and server).
   - Update the variables with your own values:

   **Server `.env`:**
   ```env
   SESSION_SECRET="example"
   DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
   
   EMAIL_HOST="EMAIL_HOST"
   EMAIL_PORT="EMAIL_PORT"
   EMAIL_SECURE="EMAIL_SECURE"
   EMAIL_USER="EMAIL_USER"
   EMAIL_PASS="EMAIL_PASS"
   EMAIL_FROM="EMAIL_FROM"
   ```

   **Client `.env`:**
   ```env
   VITE_SERVER_HOST="http://localhost:3000"
   ```

4. Start the application:
   ```bash
   npm start
   ```

---

## Usage

- Each file includes its own documentation for specific usage details.
- Ensure `.env` variables are configured correctly to avoid runtime issues.

---

## Contributing

We are not actively accepting contributions yet. However, you can:
- Submit issues for bugs or feature requests.
- Make pull requests for proposed changes.

Stay tuned for detailed contribution guidelines in the future.

---

## License

This project is licensed under the **Apache 2.0 License**. If you use this project, you must attribute the original author.

---

## Technologies Used

- **TypeScript**
- **React**
- **TailwindCSS**
- **PostgreSQL**
- **Prisma**
- **Express**

---

## Contact

- Email: [asterki.dev@proton.me](mailto:asterki.dev@proton.me)
- GitHub Issues: [Open an issue](https://github.com/Asterki/financial-app/issues)
- Twitter: [@AsterkiDev](https://twitter.com/AsterkiDev)
