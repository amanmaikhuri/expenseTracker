let loggedExpenses = [];

const $ = (selector, err) => {
    const el = document.querySelector(selector);
    if (!el && err !== false) {
        console.error(err || `Missing ${selector}`);
    }
    return el;
};

const dom = {
    expenseForm: $("#expense-form"),
    expenseTableBody: $("#expense-table-body"),
    totalExpensesElement: $("#total-expenses"),
    submitBtn: $("#submitbtn"),
    date: $("#date"),
    amount: $("#amount"),
    category: $(".category"),
    description: $("#description"),
};

// App state
const state = {
    logs: localStorage.getItem("loggedExpenses"),
};

if (state.logs) {
    loggedExpenses = JSON.parse(state.logs);
    displayExpenses();
}

// Event listener for form submission
function addEvents() {
    dom.expenseForm.addEventListener("submit", handleSave);
}

function handleSave(e) {
    e.preventDefault();
    if (addExpenses()) {
        displayExpenses();
        clearExpenseForm();
    }
}

// Get form data
function getFormData() {
    return {
        date: dom.date?.value,
        amount: parseFloat(dom.amount?.value),
        category: dom.category?.value,
        description: dom.description?.value,
    };
}

// Add expense
function addExpenses() {
    const expense = getFormData();

    if (!expense.date || isNaN(expense.amount) || !expense.category || !expense.description) {
        alert("Please fill all fields correctly!");
        return false;
    }

    loggedExpenses.unshift(expense);
    saveToLocalStorage("loggedExpenses", loggedExpenses);
    return true;
}

// Display expenses
function displayExpenses() {
    dom.expenseTableBody.innerHTML = "";

    loggedExpenses.forEach((expense, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.amount}</td>
            <td>${expense.category}</td>
            <td>${expense.description}</td>
            <td>
                <button onclick="editExpense(${index})" class="btn"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="deleteExpense(${index})" class="btn" id="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        dom.expenseTableBody.appendChild(row);
    });

    calculateTotalExpenses();
}

// Delete expense
function deleteExpense(index) {
    loggedExpenses.splice(index, 1);
    saveToLocalStorage("loggedExpenses", loggedExpenses);
    displayExpenses();
}

// Edit expense
function editExpense(index) {
    const expense = loggedExpenses[index];
    dom.date.value = expense.date;
    dom.amount.value = expense.amount;
    dom.category.value = expense.category;
    dom.description.value = expense.description;

    deleteExpense(index); // It'll be re-added as a new entry
}

// Clear form
function clearExpenseForm() {
    dom.date.value = "";
    dom.amount.value = "";
    dom.category.value = "";
    dom.description.value = "";
}

// Utility
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Total expense calculation
function calculateTotalExpenses() {
    const total = loggedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    dom.totalExpensesElement.textContent = `INR ${total.toFixed(2)}`;
}

// Init app
function init() {
    addEvents();
}

document.addEventListener("DOMContentLoaded", init);
