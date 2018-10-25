let handler = (() => {
    let QUEUE = MathJax.Hub.queue;
    let math = null;
    let totalTopics = [];
    let currentTasks = [];
    let counter = 0;

    function loadTopics() {
        return requester.get('appdata', 'math');
    }

    function createTopic(topics, creator) {
        let data = { topics, creator };
        return requester.post('appdata', 'math', data);
    }

    function showInformation(text, place) {
        math = MathJax.Hub.getAllJax(place)[0];
        QUEUE.Push(["Text",math,"\\displaystyle\\huge{"+text+"}"]);
    }
    function addTopics(topic) {
        totalTopics = [];
        for (let topicElement of topic) {
            totalTopics.push(topicElement);
        }
    }

    function loadTasks() {
        return requester.get('appdata', 'vm1');
    }

    async function showTasks() {
        let data = await loadTasks();
        let currentTopic = $('option:selected').text();
        let idTopic = totalTopics.filter(a => a.topics === currentTopic)[0]._id;
        currentTasks = [];
        counter = 0;
        for (let dataElement of data) {
            if (dataElement.id === idTopic){
                currentTasks.push(dataElement);
            }
        }
        acceptBox('Успешно заредено.');
        currentTasks.reverse();
        loadTasksElement();
    }

    function hideButtons() {
        $('#viewMath').hide();
        $('#visualMath').hide();
        $('#last').hide();
        $('#next').hide();
    }

    function showButtons() {
        $('#visualMath').show();
        $('#last').show();
        $('#next').show();
    }

    function changeContext(name) {
        $('#createdBy').html('Създадена от: ' + name);
    }

    function loadTasksElement() {
        hideButtons();
        if (currentTasks.length === 0){
            $('#acceptBox').hide();
            errorBox("Създай първата задача.");
            return;
        }
        showInformation(currentTasks[counter % currentTasks.length].exam, "helper");
        changeContext(currentTasks[counter % currentTasks.length].creator);
        showButtons();
        updatePage();
    }

    function deleteTask() {
        let taskId = currentTasks[counter % currentTasks.length]._id;
        requester.remove('appdata', 'vm1/' + taskId)
            .then(function () {
                showTasks().then(function () {
                    updatePage();
                    acceptBox("Успешно изтрихте задачата.");
                });
            });
    }

    function updatePage() {
        $('#currentPage').text(`Задача ${(counter % currentTasks.length) + 1} от ${currentTasks.length}`);
    }

    function decreaseCounter() {
        counter--;
        if (counter < 0){
            counter = currentTasks.length - 1;
        }
        updatePage();
        showInformation(currentTasks[counter % currentTasks.length].exam, "helper");
        changeContext(currentTasks[counter % currentTasks.length].creator);
    }

    function increaseCounter() {
        counter++;
        updatePage();
        showInformation(currentTasks[counter % currentTasks.length].exam, "helper");
        changeContext(currentTasks[counter % currentTasks.length].creator);
    }
    
    function changeTask() {
        $('#viewMath').show();
        let text = $('#inputExam').val();
        showInformation(text, "createViewTask");
    }


    return {
        loadTopics,
        createTopic,
        showTasks,
        decreaseCounter,
        increaseCounter,
        addTopics,
        hideButtons,
        deleteTask,
        changeTask
    }
})();