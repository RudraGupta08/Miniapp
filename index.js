// Sample task dictionary
const tasks = {
    "Task 1": {
        description: "Description for Task 1",
        reward: "Reward for completing Task 1",
        links: ["https://example.com/link1", "https://example.com/link2"]
    },
    "Task 2": {
        description: "Description for Task 2",
        reward: "Reward for completing Task 2",
        links: ["https://example.com/link3"]
    },
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
        taskItem.innerHTML = `
            <p>${title}</p>
            <button class="btn view-btn" onclick="showDetails('${title}')">View</button>
        `;
        allTasks.appendChild(taskItem);
    }
}

// Show task details
function showDetails(title) {
    const task = tasks[title];
    const details = `
        <h3>${title}</h3>
        <p>${task.description}</p>
        <p>Reward: ${task.reward}</p>
        <p>Links:</p>
        <ul>
            ${task.links.map(link => `<li><button class="btn join-btn" onclick="openLink('${link}')">Join</button></li>`).join('')}
        </ul>
        <button class="btn complete-btn" onclick="markComplete('${title}')">Complete</button>
    `;
    document.getElementById("all-tasks").innerHTML = details + `<button class="btn back-btn" onclick="renderTasks()">Back</button>`;
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
