/* Environment variables: */
var router;

function init() {
    router = new Router([
        new Route('home', 'home.html', true, "js/home/home.js"),
        // new Route('pannel', 'pannel.html', false, "js/pannel/controlPannel.js"),
        // new Route('users', 'users.html', false, "js/users/users.js"),
        // new Route('server', 'server.html', false, "js/server/server.js"),
        // new Route('logs', 'logs.html', false, "js/logs/logs.js"),
        // new Route('music', 'music.html', false, ""),
        // new Route('filtering', 'filtering.html', false, "js/filtering/filtering.js"),
        // new Route('tasks', 'tasks.html', false, "js/tasks/tasks.js")
    ]);

    return router;
}

init();



