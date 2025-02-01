// Initialize logged expenses from localStorage
let loggedExpenses = [];
const logs = localStorage.getItem("loggedExpenses");

const expenseForm = document.getElementById("expense-form");
const expenseTableBody = document.getElementById("expense-table-body");
const totalExpensesElement = document.getElementById("total-expenses");
const submitBtn = document.getElementById("submitbtn");

if (logs) {
    loggedExpenses = JSON.parse(logs);
    displayExpenses();
}

// Event listener for form submission
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    addExpenses();
    displayExpenses();
    clearExpenseForm();
});

// Function to add expenses
function addExpenses() {
    const date = document.getElementById("date").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    const expense = { date, amount, category, description };

    loggedExpenses.push(expense);
    localStorage.setItem("loggedExpenses", JSON.stringify(loggedExpenses));
}

// Function to display expenses
function displayExpenses() {
    expenseTableBody.innerHTML = ""; // Clear table body

    loggedExpenses.forEach((expense, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.description}</td>
            <td>
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
        expenseTableBody.appendChild(row);
    });

    calculateTotalExpenses();
}

// Function to delete an expense
function deleteExpense(index) {
    loggedExpenses.splice(index, 1);
    localStorage.setItem("loggedExpenses", JSON.stringify(loggedExpenses));
    displayExpenses();
}

// Function to edit an expense
function editExpense(index) {
    const expense = loggedExpenses[index];
    document.getElementById("date").value = expense.date;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("category").value = expense.category;
    document.getElementById("description").value = expense.description;

    deleteExpense(index); // Remove the old entry, will be added as new after editing
}

// Function to clear the expense form
function clearExpenseForm() {
    document.getElementById("date").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
}



// Function to calculate and display total expenses
function calculateTotalExpenses() {
    const total = loggedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalExpensesElement.textContent = `$${total.toFixed(2)}`;
}
