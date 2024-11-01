// Sample data
const tasks = {
    "Task 1": { text: "Complete this task", links: ["https://example.com"], reward: 100, completed: false },
    "Task 2": { text: "Another task to finish", links: ["https://example.com", "https://anotherlink.com"], reward: 200, completed: false },
};

// Get elements
const taskTitlesElement = document.getElementById('taskTitles');
const taskListSection = document.getElementById('taskList');
const taskDetailSection = document.getElementById('taskDetail');
const taskTitleElement = document.getElementById('taskTitle');
const taskTextElement = document.getElementById('taskText');
const taskLinksElement = document.getElementById('taskLinks');
const completionMessageElement = document.getElementById('completionMessage');
const completeButton = document.getElementById('completeButton');
const backButton = document.getElementById('backButton');

let currentTaskTitle = '';

// Load completed tasks from localStorage
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

// Initialize Telegram Web App
Telegram.WebApp.ready();

// Populate the list of tasks
function loadTaskTitles() {
    taskTitlesElement.innerHTML = '';
    for (const [title, task] of Object.entries(tasks)) {
        task.completed = completedTasks.includes(title); // Check if task is completed
        const li = document.createElement('li');
        li.textContent = title;
        li.className = task.completed ? 'completed' : '';
        li.onclick = () => showTaskDetail(title);
        taskTitlesElement.appendChild(li);
    }
}

// Show task details
function showTaskDetail(title) {
    currentTaskTitle = title;
    const task = tasks[title];

    taskListSection.style.display = 'none';
    taskDetailSection.style.display = 'block';

    taskTitleElement.textContent = title;
    taskTextElement.textContent = task.text;

    taskLinksElement.innerHTML = '';
    task.links.forEach(link => {
        const linkElement = document.createElement('button');
        linkElement.textContent = `Open ${link}`;
        linkElement.onclick = () => window.open(link, '_blank');
        taskLinksElement.appendChild(linkElement);
    });

    completionMessageElement.style.display = task.completed ? 'block' : 'none';
    completeButton.style.display = task.completed ? 'none' : 'block';
}

// Handle task completion
completeButton.onclick = () => {
    if (tasks[currentTaskTitle].completed) return;

    // Mark task as completed
    tasks[currentTaskTitle].completed = true;
    completedTasks.push(currentTaskTitle);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    loadTaskTitles();

    // Show completion message and hide button
    completionMessageElement.style.display = 'block';
    completeButton.style.display = 'none';

    // Prepare the message to send to the Telegram bot
    const completionMessage = `Task "${currentTaskTitle}" completed +${tasks[currentTaskTitle].reward} reward`;

    // Send completion message via Telegram bot
    Telegram.WebApp.sendData(JSON.stringify({
        taskTitle: currentTaskTitle,
        message: completionMessage,
        reward: tasks[currentTaskTitle].reward
    }));
};

// Back to task list
backButton.onclick = () => {
    taskListSection.style.display = 'block';
    taskDetailSection.style.display = 'none';
};

// Load tasks on page load
loadTaskTitles();
