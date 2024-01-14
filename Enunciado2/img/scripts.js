document.addEventListener('DOMContentLoaded', function () {
    const addTaskButtons = document.querySelectorAll('[id^="adicionar"]');
    const removeTaskButtons = document.querySelectorAll('[id^="excluir"]');
    const taskLists = document.querySelectorAll('.taskList');

    addTaskButtons.forEach((addButton, index) => {
        addButton.addEventListener('click', function () {
            const newTask = prompt('Digite a sua nova tarefa para o dia:');
            if (newTask) {
                const listItem = document.createElement('li');
                listItem.textContent = newTask;

              
                const tasks = JSON.parse(localStorage.getItem(`tasks_${index}`)) || [];
                tasks.push(newTask);
                localStorage.setItem(`tasks_${index}`, JSON.stringify(tasks));

             
                taskLists[index].appendChild(listItem);
            }
        });
    });

    removeTaskButtons.forEach((removeButton, index) => {
        removeButton.addEventListener('click', function () {
            const lastTask = taskLists[index].lastElementChild;
            if (lastTask) {
                taskLists[index].removeChild(lastTask);

                // Remove do localStorage
                const tasks = JSON.parse(localStorage.getItem(`tasks_${index}`)) || [];
                tasks.pop();
                localStorage.setItem(`tasks_${index}`, JSON.stringify(tasks));
            }
        });
    });

    taskLists.forEach((taskList, index) => {
        const tasks = JSON.parse(localStorage.getItem(`tasks_${index}`)) || [];
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.textContent = task;
            taskList.appendChild(listItem);
        });
    });
});
