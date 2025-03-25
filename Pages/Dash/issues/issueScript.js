var issueContainer = document.getElementById('issueContainer')
var issueForm = document.getElementById('issueForm');

fetch('http://localhost:3000/issues')
.then(res => res.json())
.then(data => {
    data.forEach(issue => {
        createIssueCard(issue.title,issue.desc,issue.type,issue.priority,issue.id)
    });
})

function createIssueCard(title,desc,type,priority,id){
    let card = document.createElement('div')
    card.className = "issueCard"
    card.innerHTML = `
            <h2 class="issueCardTitle">${title}</h2>
        <p class="issueCardDesc">${desc}</p>
        <div class="issueCardType">
            <p>${type}</p>
        </div>
        <div class="issueCardPriority">
            <p>${priority}</p>
        </div>
        <div class="issueCardId">
            <p>${id}</p>
        </div>`
        issueContainer.appendChild(card)
}
    function createIssue(e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const desc = document.getElementById('desc').value;
        const type = document.getElementById('type').value;
        const priority = document.getElementById('priority').value;

        if (!title || !desc || !type || !priority) {
            alert("Please fill in all fields.");
            return;
        }

        createIssueCard(title, desc, type, priority);

        const issueData = {
            title,
            desc,
            type,
            priority
        };

        fetch('http://localhost:3000/issues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(issueData)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Issue created:", data);
        })
        .catch(err => {
            console.error("Error creating issue:", err);
        });

        issueForm.reset();
    }

    issueForm.addEventListener('submit', createIssue);