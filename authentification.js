const fs = require("fs");
const readline = require("readline");
const bcrypt = require("bcrypt");

// File to store user data
const USER_DATA_FILE = "users.json";

// Load existing users from the JSON file
let users = {};
if (fs.existsSync(USER_DATA_FILE)) {
  users = JSON.parse(fs.readFileSync(USER_DATA_FILE, "utf-8"));
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to register a new user
function registerUser() {
  rl.question("Enter username: ", (username) => {
    if (users[username]) {
      console.log("Username already taken!");
      mainMenu();
    } else {
      rl.question("Enter password: ", async (password) => {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        users[username] = { password: hashedPassword };
        fs.writeFileSync(USER_DATA_FILE, JSON.stringify(users, null, 2));
        console.log("User registered successfully!");
        mainMenu();
      });
    }
  });
}

// Function to login a user
function loginUser() {
  rl.question("Enter username: ", (username) => {
    if (!users[username]) {
      console.log("Invalid username or password!");
      mainMenu();
    } else {
      rl.question("Enter password: ", async (password) => {
        // Compare the entered password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, users[username].password);
        if (isPasswordValid) {
          console.log("Login successful!");
          userMenu(username);
        } else {
          console.log("Invalid username or password!");
          mainMenu();
        }
      });
    }
  });
}

// Function to display the user menu after login
function userMenu(username) {
  console.log(`Welcome, ${username}!`);
  console.log("1. View Profile");
  console.log("2. Logout");

  rl.question("Enter your choice: ", (choice) => {
    switch (choice) {
      case "1":
        console.log(`Username: ${username}`);
        userMenu(username);
        break;
      case "2":
        console.log("Logging out...");
        mainMenu();
        break;
      default:
        console.log("Invalid choice!");
        userMenu(username);
    }
  });
}

// Function to display the main menu
function mainMenu() {
  console.log("Simple User Authentication System");
  console.log("1. Register");
  console.log("2. Login");
  console.log("3. Exit");

  rl.question("Enter your choice: ", (choice) => {
    switch (choice) {
      case "1":
        registerUser();
        break;
      case "2":
        loginUser();
        break;
      case "3":
        console.log("Exiting...");
        rl.close();
        break;
      default:
        console.log("Invalid choice!");
        mainMenu();
    }
  });
}

// Start the program
mainMenu();