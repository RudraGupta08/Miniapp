// Sample task dictionary
const tasks = {
    "Tlegrams": {
        description: "Join Our Telegram Channels",
        reward: "100 USDT",
        links: {
            "Join Domiantor": "https://t.me/AirdropDominator",
            "Join BlockScoutX": "https://t.me/BlockScoutX"
        }
    },
    "Twitte": {
        description: "Follow us on Twitter",
        reward: "50 USDT",
        links: {
            "Follow": "https://x.com/AirdropFoster"
        }
    },
    "Partess": {
        description: "Join our Partner Telegram Channel",
        reward: "30 USDT",
        links: {
            "Join": "https://t.me/Pulseannouncements"
        }
    },
    // Add more tasks as needed
};

// Load completed tasks from local storage
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

const sendLogToTelegram = async (message) => {
    alert(message)
};
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

// Initialize Telegram WebApp
window.Telegram.WebApp.ready();
const userId = Telegram.WebApp.initDataUnsafe.user?.id || "Unknown User";

// Function to call API when marking task complete
async function markComplete(title) {
    if (!completedTasks.includes(title)) {
        //completedTasks.push(title);
        //localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        alert(userId)
        // Make API call with user ID and task details
        try {
            const response = await fetch("https://95.169.204.119?user_id=" + userId + "&task_id=1", {
                method: "GET"
            });

            
            if (response.ok) {
                sendLogToTelegram("Task completion recorded successfully.");
            } else {
                sendLogToTelegram("Failed to record task completion.");
            }
        } catch (error) {
            sendLogToTelegram("Error making API call:", error);
        }
    }
    renderTasks();
}
sendLogToTelegram('running')
// Initial rendering of tasks
renderTasks();
