let transaction = [];

function addTransaction() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (description === "" || isNaN(amount)) {
        alert('Please enter a valid description and amount');
        return;
    }

    const txn = { description, amount, type };
    transaction.push(txn);

    // Clear form inputs
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    updateUI();
    updateChart();
}

function updateUI() {
    const transactionList = document.getElementById('transaction-list');
    const balance = document.getElementById('balance');

    transactionList.innerHTML = "";
    let totalBalance = 0;

    transaction.forEach((txn, index) => {
        const transactionItem = document.createElement("div");
        transactionItem.className = "transaction-item";

        const transactionInfo = document.createElement("div");
        transactionInfo.className = "transaction-info";

        const description = document.createElement("div");
        description.className = "transaction-description";
        description.textContent = txn.description;

        const amount = document.createElement("div");
        amount.className = `transaction-amount ${txn.type}`;
        amount.textContent = `${txn.type === 'income' ? '+' : '-'}$${txn.amount.toFixed(2)}`;

        transactionInfo.appendChild(description);
        transactionInfo.appendChild(amount);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => removeTransaction(index);

        transactionItem.appendChild(transactionInfo);
        transactionItem.appendChild(deleteBtn);

        transactionList.appendChild(transactionItem);

        if (txn.type === "income") {
            totalBalance += txn.amount;
        } else {
            totalBalance -= txn.amount;
        }
    });

    balance.textContent = totalBalance.toFixed(2);
}

function removeTransaction(index) {
    transaction.splice(index, 1);
    updateUI();
    updateChart();
}

// Initialize chart
const ctx = document.getElementById("expenseChart").getContext("2d");
let chart = new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: ["Income", "Expense"],
        datasets: [{
            label: "Financial Overview",
            data: [0, 0],
            backgroundColor: ['#38a169', '#e53e3e'],
            borderWidth: 0,
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: {
                        family: 'Inter',
                        size: 14
                    }
                }
            }
        },
        cutout: '60%'
    }
});

function updateChart() {
    let income = transaction
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    let expense = transaction
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    chart.data.datasets[0].data = [income, expense];
    chart.update();
}