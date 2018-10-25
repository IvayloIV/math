let totalTopics = [];
$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');
		
		this.get('/', function () {
            this.redirect('#/index.html');
        });
        
        this.get('#/index.html', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                handler.hideButtons();
                this.partial('./templates/welcome.hbs');
            });
        });

        this.get('#/vm1', function (ctx) {
            handler.loadTopics().then(function (topics) {
                ctx.allTopics = topics;
                handler.addTopics(topics);
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    topics: './templates/loadTopics.hbs'
                }).then(function () {
                    handler.hideButtons();
                    ctx.partials = this.partials;
                    ctx.partial('./templates/vmPage.hbs');
                });
            });
        });

        this.get('#/create', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                content: './templates/create/contentCreate.hbs',
            }).then(function () {
                handler.hideButtons();
                this.partial('./templates/create/createPage.hbs');
            });
        });

        this.post('#/create', function (ctx) {
            let topics = this.params.topics;
            let creator = this.params.creator;
            if (topics === '' || creator === ''){
                errorBox('Попълни полетата!');
                return;
            }
            handler.createTopic(topics, creator).then(function () {
                ctx.partials = this.partials;
                ctx.redirect("#/vm1");
                acceptBox('Успешно направихте тема.');
            });
        });

        this.get('#/createTask', function (ctx) {
            handler.loadTopics().then(function (topics) {
                totalTopics = topics;
                ctx.allTopics = topics;
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    content: './templates/createTask/contentCreateTask.hbs',
                    topics: './templates/loadTopics.hbs',
                }).then(function () {
                    ctx.partials = this.partials;
                    handler.hideButtons();
                    ctx.partial('./templates/createTask/createTaskPage.hbs');
                });
            });
        });

        this.post('#/createTask', function (ctx) {
            let topic = $('option:selected').text();
            let creator = this.params.creator;
            let exam = this.params.exam;
            let id = totalTopics.filter(a => a.topics === topic)[0]._id;
            if (topic === '' || creator === '' || exam === ''){
                errorBox('Попълни полетата!');
                return;
            }
            requester.post('appdata', 'vm1', {creator, exam, id}).then(function () {
                handler.hideButtons();
                ctx.partials = this.partials;
                ctx.redirect('#/vm1');
                acceptBox('Успешно създадохте задача.');
            });
        });

        this.get('#/cancelRequest', function () {
            handler.hideButtons();
            this.redirect("#/vm1");
        });

    });
    app.run();
});