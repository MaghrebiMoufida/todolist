// Function to add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  
  // Get the input value and trim whitespace
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Veuillez entrer une tâche.");
    return;
  }

  // Create a new list item for the task
  const listItem = document.createElement('li');

  // Create a span to hold the task text
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  taskSpan.onclick = function() {
    listItem.classList.toggle('completed');
  };

  // Create a delete button for the task
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Supprimer';
  deleteButton.classList.add('delete-btn');
  deleteButton.onclick = function() {
    taskList.removeChild(listItem);
  };

  // Append elements to the list item
  listItem.appendChild(taskSpan);
  listItem.appendChild(deleteButton);

  // Append the list item to the task list
  taskList.appendChild(listItem);

  // Clear the input field
  taskInput.value = '';
}
