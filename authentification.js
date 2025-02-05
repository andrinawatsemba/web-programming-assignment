const fs = require("fs");
const bcrypt = require("bcrypt");
const usersFile = "users.json";

// Function to register a user
function registerUser(name, email, password) {
    let users = JSON.parse(fs.readFileSync(usersFile)); // Read existing users

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        console.log("Error: Email already registered.");
        return;
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Save the new user
    const newUser = { name, email, password: hashedPassword };
    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    console.log("Registration successful!");
}

module.exports = { registerUser };





// Function to login a user
function loginUser(email, password) {
    let users = JSON.parse(fs.readFileSync(usersFile));

    // Find user by email
    const user = users.find(user => user.email === email);
    if (!user) {
        console.log("Error: Email not found.");
        return null;
    }

    // Check password
    if (!bcrypt.compareSync(password, user.password)) {
        console.log("Error: Incorrect password.");
        return null;
    }

    console.log(`Login successful! Welcome, ${user.name}.`);
    return user;
}

module.exports = { registerUser, loginUser };
