const issueForm = document.getElementById('issueForm');
const issueTableBody = document.getElementById('issueTableBody');
const issueTableContainer = document.getElementById('issueTableContainer');

const typeMap = {
    '1': 'Payment',
    '2': 'Product Listings',
    '3': 'Shipping',
    '4': 'Account',
    '5': 'Technical'
};

fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((data) => {
        const currentUserId = localStorage.getItem('cookie');
        const currentUser = data.find(user => user.id === currentUserId);

        if (currentUser && currentUser.role === "admin") {
            issueTableContainer.style.display = "block"; // Show table
            loadIssues(); // Only load if admin
        } else {
            issueTableContainer.style.display = "none"; // Hide if not admin
        }
    });

function loadIssues() {
    issueTableBody.innerHTML = '';
    fetch('http://localhost:3000/issues')
        .then(res => res.json())
        .then(data => {
            data.forEach(issue => addIssueRow(issue));
        })
        .catch(err => console.error(err));
}

function addIssueRow(issue) {
    const row = document.createElement('tr');
    const typeText = typeMap[issue.type];

    row.innerHTML = `
        <td>${issue.id}</td>
        <td>${issue.title}</td>
        <td>${issue.desc}</td>
        <td><span class="type ${typeText.toLowerCase().replace(' ', '-')}">${typeText}</span></td>
    `;
    issueTableBody.appendChild(row);
}

function createIssue(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const desc = document.getElementById('desc').value;
    const type = document.getElementById('type').value;

    if (!title || !desc || !type) {
        alert("Please fill in all fields.");
        return;
    }

    const issueData = { title, desc, type };
    fetch('http://localhost:3000/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(issueData)
    })
        .then(res => res.json())
        .then(data => {
            addIssueRow(data);
            issueForm.reset();
        })
        .catch(err => console.error("Error creating issue:", err));
}

issueForm.addEventListener('submit', createIssue);
