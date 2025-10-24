# Smart Finance Tracker

A comprehensive and user-friendly web-based application developed with TypeScript for managing personal finances. The Smart Finance Tracker empowers users to effortlessly track income and expenses, visualize financial summaries, and maintain a detailed history of transactions. Leveraging modern web technologies, it offers a seamless experience with real-time updates, intuitive filtering, and robust data persistence through the browser's localStorage API.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [Future Features](#future-features)
- [License](#license)

## Features

### Core Functionality

- **Add Transactions**: Input detailed transactions including description, amount, type (Income or Expense), and date. The form includes validation to ensure data integrity.
- **Real-Time Financial Summaries**: Automatically calculate and display total income, total expenses, and net balance, updating instantly as transactions are added or removed.
- **Transaction Management**: View all transactions in a sortable, responsive table. Each entry shows description, amount, type, date, and a delete option.
- **Search and Filter**:
  - Search transactions by description with a debounced search input to avoid excessive computations.
  - Filter by transaction type (All, Income, or Expenses) for quick categorization.
- **Delete Transactions**: Easily remove transactions with a click, with automatic updates to summaries and persistence.
- **Data Persistence**: All transactions are stored in the browser's localStorage, ensuring data survives page reloads and browser sessions.

### User Experience

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices using Tailwind CSS for consistent styling across screen sizes.
- **Intuitive UI**: Clean, modern interface with icons from Material Symbols and Font Awesome for better visual cues.
- **Success Feedback**: Animated tick overlay provides immediate confirmation when a transaction is successfully added.
- **Form Validation**: Client-side validation prevents invalid submissions, with user-friendly alerts for missing or incorrect data.
- **Accessibility**: Semantic HTML, proper labeling, and keyboard navigation support for an inclusive experience.

### Technical Highlights

- **TypeScript Integration**: Strongly typed code for better maintainability and fewer runtime errors.
- **Modular Architecture**: Code is organized into separate modules for types, transactions, UI rendering, and main logic.
- **Performance Optimized**: Debounced search, efficient rendering, and minimal DOM manipulations for smooth interactions.

## Technologies Used

- **Frontend**:
  - **TypeScript**: For type-safe JavaScript development.
  - **HTML5**: Semantic markup for structure.
  - **CSS3**: Custom styles with Tailwind CSS for utility-first styling.
  - **JavaScript (ES6+)**: Compiled from TypeScript for browser execution.
- **Libraries and Frameworks**:
  - **Tailwind CSS**: Via CDN for responsive and utility-based styling.
  - **Font Awesome & Material Symbols**: For icons.
- **Tools**:
  - **Node.js & npm**: For dependency management.
  - **TypeScript Compiler (tsc)**: For compiling TypeScript to JavaScript.
- **Storage**: Browser's localStorage API for client-side data persistence.
- **Development**: No build tools like Webpack; simple compilation with tsc.

## Project Structure

```
Smart-Finance-Tracker/
├── index.html                 # Main HTML file with UI structure
├── package.json               # Project metadata and dependencies
├── tsconfig.json              # TypeScript configuration
├── README.md                  # Project documentation (this file)
├── .gitignore                 # Git ignore rules
├── src/
│   ├── css/
│   │   └── style.css          # Custom CSS for buttons and animations
│   └── ts/
│       ├── main.ts            # Entry point: event handlers and app logic
│       ├── transactions.ts    # Transaction CRUD operations and localStorage
│       ├── ui.ts              # Rendering and UI update functions
│       └── types.ts           # TypeScript interfaces and types
└── dist/                      # Compiled JavaScript output (generated)
```

## Installation

Follow these steps to set up the project on your local machine:

### Prerequisites

- **Node.js** (version 14 or higher) and **npm** installed. Download from [nodejs.org](https://nodejs.org/).
- A modern web browser (e.g., Chrome, Firefox, Edge).

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/rudra2609-06/Smart-Finance-Tracker.git
   cd Smart-Finance-Tracker
   ```

2. **Install Dependencies**:
   Install the required development dependencies (primarily TypeScript):

   ```bash
   npm install
   ```

3. **Compile TypeScript**:
   Compile the TypeScript source files to JavaScript. This generates files in the `dist/` directory:

   ```bash
   npx tsc
   ```

   - If you make changes to the TypeScript files, re-run this command to update the compiled output.

4. **Verify Compilation**:
   Ensure the `dist/` directory contains the compiled JavaScript files (e.g., `main.js`).

## Usage

1. **Launch the Application**:
   Open the `index.html` file directly in your web browser (e.g., double-click or drag into browser). No server is required as it's a client-side app.

2. **Add a Transaction**:

   - Fill in the form on the right: Description, Amount, Type (Income/Expense), and Date.
   - Click "Add" to submit. A success animation will confirm the addition.

3. **View Summaries**:

   - Monitor Total Income, Total Expense, and Balance in the colored boxes at the top.

4. **Manage Transactions**:

   - Browse the transaction list below.
   - Use the search bar to find transactions by description.
   - Filter by type using the dropdown.
   - Click "Reset" to clear filters and show all transactions.
   - Delete transactions by clicking the "Delete" link in the table.

5. **Data Persistence**:
   - All data is saved automatically. Refresh the page or reopen the browser to see persisted transactions.

### Tips

- Keep descriptions concise for better searchability.
- Dates are limited to today or earlier to prevent future-dated entries.
- The app works offline once loaded, as it relies on localStorage.

## How It Works

- **Transaction Model**: Each transaction is an object with `description` (string), `amount` (number), `type` ("Income" | "Expense"), `date` (string), and `id` (number).
- **State Management**: Transactions are stored in a global array, loaded from/saved to localStorage on app start/end.
- **Rendering**: The UI dynamically updates the transaction table and summaries based on the current state.
- **Event Handling**: Form submissions, searches, filters, and deletes trigger appropriate functions to update state and re-render.
- **Validation**: Ensures no empty fields, positive amounts, and valid dates before adding transactions.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3. Make your changes and ensure TypeScript compiles without errors: `npx tsc`.
4. Test the changes by opening `index.html` in a browser.
5. Commit your changes: `git commit -m "Add your message"`.
6. Push to your fork and submit a pull request.

Please follow best practices: Use TypeScript types, keep code modular, and ensure responsiveness.

## Future Features

- **Dark Mode**: Toggle between light and dark themes for better usability in low-light environments.
- **Export Data**: Ability to export transactions to CSV or PDF for external analysis.
- **Charts and Analytics**: Visual graphs for spending trends and category breakdowns.
- **Categories**: Add custom categories to transactions for more detailed tracking.
- **Multi-User Support**: Cloud-based storage for syncing across devices (requires backend).
- **Notifications**: Reminders for budget limits or recurring expenses.

## License

This project is licensed under the ISC License - a permissive license that allows for free use, modification, and distribution. See the [LICENSE](LICENSE) file for full details.
