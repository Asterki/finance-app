// User Model
export type User = {
  id: string; // Unique identifier (UUID or auto-incremented ID)
  email: string; // Email for login
  passwordHash: string; // Hashed password
  name: string; // Full name
  createdAt: Date; // Account creation date
  updatedAt: Date; // Last profile update date
  preferences: UserPreferences; // User's settings and preferences
};

// User Preferences Model
export type UserPreferences = {
  currency: string; // Preferred currency (e.g., "USD", "EUR")
  language: string; // Preferred language (e.g., "en", "es")
  timezone: string; // Timezone setting (e.g., "America/New_York")
  theme: string; // Dark or light theme
};
 
// Expense Model
export type Expense = {
  id: string; // Unique identifier (UUID or auto-incremented ID)
  userId: string; // Foreign key referencing the user
  amount: number; // Amount of the expense
  category: string; // Category of the expense (e.g., "Groceries", "Rent")
  description: string; // Optional description or notes about the expense
  date: Date; // Date the expense occurred
  tags: string[]; // Tags for better categorization (e.g., ["food", "weekly"])
  createdAt: Date; // Date the expense was added
  updatedAt: Date; // Last date the expense was updated
};

// Income Model
export type Income = {
  id: string; // Unique identifier (UUID or auto-incremented ID)
  userId: string; // Foreign key referencing the user
  amount: number; // Amount of the income
  source: string; // Source of the income (e.g., "Salary", "Freelance")
  date: Date; // Date the income was received
  description: string; // Optional description or notes about the income
  createdAt: Date; // Date the income entry was created
  updatedAt: Date; // Last date the income entry was updated
};

// Budget Model
export type Budget = {
  id: string; // Unique identifier (UUID or auto-incremented ID)
  userId: string; // Foreign key referencing the user
  category: string; // Budget category (e.g., "Groceries", "Entertainment")
  amount: number; // Budgeted amount for the category
  startDate: Date; // Start date of the budget period
  endDate: Date; // End date of the budget period
  createdAt: Date; // Date the budget was created
  updatedAt: Date; // Last date the budget was updated
  status: 'active' | 'inactive'; // Status of the budget (active, completed, etc.)
};

// Transaction History Model (for tracking all transactions, whether expenses or income)
export type Transaction = {
  id: string; // Unique identifier (UUID or auto-incremented ID)
  userId: string; // Foreign key referencing the user
  amount: number; // Transaction amount (can be positive for income, negative for expense)
  type: 'expense' | 'income'; // Type of transaction
  category: string; // Category (for expense or income)
  description: string | null; // Optional description
  date: Date; // Date of the transaction
  tags: string[]; // Tags for categorization
  createdAt: Date; // Date the transaction was created
  updatedAt: Date; // Last date the transaction was updated
};

// Savings Goal Model (for tracking savings goals)
export type SavingsGoal = {
  id: string; // Unique identifier (UUID or auto-incremented ID)
  userId: string; // Foreign key referencing the user
  targetAmount: number; // Target savings goal amount
  currentAmount: number; // Current amount saved towards the goal
  description: string; // Optional description of the goal (e.g., "Vacation Fund")
  deadline: Date; // Deadline to reach the savings goal
  createdAt: Date; // Date the savings goal was created
  updatedAt: Date; // Last date the goal was updated
  status: 'active' | 'completed' | 'expired'; // Status of the goal
};

// Security Model (for storing password reset tokens, 2FA settings, etc.)
export type Security = {
  id: string; // Unique identifier (UUID or auto-incremented ID)
  userId: string; // Foreign key referencing the user
  resetToken: string | null; // Password reset token if requested
  resetTokenExpiration: Date | null; // Expiration date for the reset token
  twoFactorEnabled: boolean; // Whether 2FA is enabled
  twoFactorSecret: string | null; // Secret for 2FA (if enabled)
  createdAt: Date; // Date the security settings were created
  updatedAt: Date; // Last date the security settings were updated
};
