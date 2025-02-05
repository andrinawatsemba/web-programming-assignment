const readline = require("readline-sync");
const { registerUser, loginUser } = require("./auth");

// Main menu
while (true) {
    console.log("\n1. Register\n2. Login\n3. Exit");
    let choice = readline.question("Choose an option: ");

    if (choice === "1") {
        let name = readline.question("Enter your name: ");
        let email = readline.question("Enter your email: ");
        let password = readline.question("Enter your password: ");
        registerUser(name, email, password);
    } 
    else if (choice === "2") {
        let email = readline.question("Enter your email: ");
        let password = readline.question("Enter your password: ");
        let user = loginUser(email, password);

        if (user) {
            userMenu(user);
        }
    } 
    else if (choice === "3") {
        console.log("Goodbye!");
        process.exit();
    } 
    else {
        console.log("Invalid choice. Try again.");
    }
}

// Function for logged-in users
function userMenu(user) {
    while (true) {
        console.log(`\nWelcome, ${user.name}!`);
        console.log("1. View Profile\n2. Logout");
        let choice = readline.question("Choose an option: ");

        if (choice === "1") {
            console.log(`Name: ${user.name}\nEmail: ${user.email}`);
        } 
        else if (choice === "2") {
            console.log("Logging out...");
            return;
        } 
        else {
            console.log("Invalid choice. Try again.");
        }
    }
}
