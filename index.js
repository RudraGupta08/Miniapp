// Sample task dictionary
const tasks = {
    "Telegram": {
        description: "Join Our Telegram Channels",
        reward: "100 USDT",
        links: {
            "Join Link": "https://example.com/link1",
            "Another Link": "https://example.com/link2"
        }
    },
    "Task 2": {
        description: "Description for Task 2",
        reward: "Reward for completing Task 2",
        links: {
            "Learn More": "https://example.com/link3"
        }
    },
    {
     "Twitter":{
         description:"Follow us on Twitter",
         reward :"50 USDT",
         links:{
             "Follow Now":"x.com/AirdropFoster"
         }
     }
    // Add more tasks as needed
};

// Load completed tasks from local storage
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

// Render the task titles on page load
function renderTasks() {
    const allTasks = document.getElementById("all-tasks");
    allTasks.innerHTML = "";

    for (const title in tasks) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        // Check if the task is completed
        if (completedTasks.includes(title)) {
            taskItem.innerHTML = `
                <p><strike>${title}</strike></p>
                <button class="btn complete-btn" disabled>Completed</button>
            `;
        } else {
            taskItem.innerHTML = `
                <p>${title}</p>
                <button class="btn view-btn" onclick="showDetails('${title}')">View</button>
            `;
        }

        allTasks.appendChild(taskItem);
    }
}

// Show task details
function showDetails(title) {
    const task = tasks[title];
    const linksHtml = Object.entries(task.links).map(([buttonName, link]) => `
        <li>
            <button class="btn join-btn" onclick="openLink('${link}')">${buttonName}</button>
        </li>
    `).join('');

    const details = `
        <h3>${title}</h3>
        <p>${task.description}</p>
        <p>Reward: ${task.reward}</p>
        <p>Links:</p>
        <ul>${linksHtml}</ul>
        <button class="btn complete-btn" onclick="markComplete('${title}')">Complete</button>
        <button class="btn back-btn" onclick="renderTasks()">Back</button>
    `;
    document.getElementById("all-tasks").innerHTML = details;
}

// Open link in a new tab
function openLink(link) {
    window.open(link, "_blank");
}

// Mark a task as complete
function markComplete(title) {
    if (!completedTasks.includes(title)) {
        completedTasks.push(title);
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }
    renderTasks();
}

// Initial rendering of tasks
renderTasks();
