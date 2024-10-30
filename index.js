// Charger les tâches sauvegardées dans le localStorage lors du chargement de la page
// "DOMContentLoaded" s'assure que le DOM est entièrement chargé avant d'exécuter la fonction `loadTasks`
document.addEventListener("DOMContentLoaded", loadTasks);

// Fonction pour ajouter une nouvelle tâche
function addTask() {
  const taskInput = document.getElementById('taskInput');        // Récupère l'élément de saisie pour la tâche
  const prioritySelect = document.getElementById('prioritySelect');  // Récupère l'élément de sélection de priorité
  const taskList = document.getElementById('taskList');          // Récupère l'élément de liste des tâches

  // Récupérer le texte de la tâche saisie et la priorité choisie
  const taskText = taskInput.value.trim();   // Supprime les espaces inutiles en début et fin de texte
  const priority = prioritySelect.value;     // Récupère la valeur de la priorité sélectionnée

  // Vérifie si le champ de texte est vide
  if (taskText === "") {
    alert("Veuillez entrer une tâche.");    // Alerte l'utilisateur si aucune tâche n'est entrée
    return;                                 // Quitte la fonction si aucune tâche n'a été saisie
  }

  // Créer un nouvel élément de liste pour représenter la tâche
  const listItem = document.createElement('li');
  listItem.classList.add(priority);         // Ajoute une classe représentant la priorité pour styliser l'élément

  // Crée un `span` pour afficher le texte de la tâche avec sa priorité
  const taskSpan = document.createElement('span');
  taskSpan.textContent = `${taskText} (${priority})`;  // Ajoute le texte de la tâche avec la priorité entre parenthèses
  taskSpan.onclick = function () {       // Permet de marquer une tâche comme terminée en cliquant dessus
    listItem.classList.toggle('completed');   // Bascule entre l'état "terminé" et "non terminé"
    saveTasks();                             // Sauvegarde l'état actuel des tâches
  };

  // Crée un bouton de suppression pour la tâche
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Supprimer';    // Définit le texte du bouton comme "Supprimer"
  deleteButton.classList.add('delete-btn');  // Ajoute une classe pour le styliser
  deleteButton.onclick = function () {       // Fonction de suppression lors du clic sur le bouton
    taskList.removeChild(listItem);          // Retire la tâche de la liste
    saveTasks();                             // Met à jour les tâches sauvegardées après suppression
  };

  // Ajoute le texte de la tâche et le bouton de suppression à l'élément de liste
  listItem.appendChild(taskSpan);
  listItem.appendChild(deleteButton);

  // Ajoute la nouvelle tâche à la liste des tâches dans le DOM
  taskList.appendChild(listItem);

  // Sauvegarde les tâches dans le localStorage et efface le champ de saisie pour une nouvelle entrée
  saveTasks();
  taskInput.value = '';
}

// Fonction pour sauvegarder les tâches dans le localStorage
function saveTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = [];

  // Parcourt chaque tâche et sauvegarde ses informations dans un tableau
  taskList.childNodes.forEach(item => {
    const taskText = item.querySelector('span').textContent;    // Récupère le texte de la tâche
    const isCompleted = item.classList.contains('completed');   // Vérifie si la tâche est terminée
    const priority = item.classList[0];                         // Récupère la priorité de la tâche
    tasks.push({ text: taskText, completed: isCompleted, priority: priority });  // Ajoute l'objet tâche au tableau
  });

  // Enregistre le tableau des tâches dans le localStorage sous forme de chaîne JSON
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fonction pour charger les tâches sauvegardées depuis le localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];   // Récupère les tâches ou initialise un tableau vide
  const taskList = document.getElementById('taskList');

  // Parcourt chaque tâche sauvegardée pour la recréer dans la liste
  tasks.forEach(task => {
    const listItem = document.createElement('li');                // Crée un nouvel élément de liste pour chaque tâche
    listItem.classList.add(task.priority);                        // Ajoute la classe de priorité

    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;                             // Ajoute le texte de la tâche
    if (task.completed) {                                         // Marque la tâche comme terminée si nécessaire
      listItem.classList.add('completed');
    }
    taskSpan.onclick = function () {                              // Permet de marquer la tâche comme terminée en cliquant dessus
      listItem.classList.toggle('completed');
      saveTasks();                                                // Sauvegarde les tâches avec le nouvel état
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';                       // Texte du bouton de suppression
    deleteButton.classList.add('delete-btn');
    deleteButton.onclick = function () {                          // Supprime la tâche lors du clic sur le bouton
      taskList.removeChild(listItem);
      saveTasks();                                                // Met à jour les tâches sauvegardées
    };

    listItem.appendChild(taskSpan);                               // Ajoute le texte de la tâche à l'élément de liste
    listItem.appendChild(deleteButton);                           // Ajoute le bouton de suppression à l'élément de liste
    taskList.appendChild(listItem);                               // Ajoute l'élément de liste à la liste des tâches
  });
}

// Fonction pour filtrer les tâches affichées selon leur statut
function filterTasks(filter) {
  const taskList = document.getElementById('taskList');
  const tasks = taskList.getElementsByTagName('li');   // Récupère toutes les tâches dans un tableau

  // Parcourt chaque tâche pour appliquer le filtre
  for (let item of tasks) {
    switch (filter) {
      case 'all':
        item.style.display = 'flex';   // Affiche toutes les tâches
        break;
      case 'completed':
        if (item.classList.contains('completed')) {
          item.style.display = 'flex';   // Affiche uniquement les tâches terminées
        } else {
          item.style.display = 'none';   // Cache les tâches non terminées
        }
        break;
      case 'incomplete':
        if (!item.classList.contains('completed')) {
          item.style.display = 'flex';   // Affiche uniquement les tâches non terminées
        } else {
          item.style.display = 'none';   // Cache les tâches terminées
        }
        break;
    }
  }
}
