'use strict';

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function () {
        let r = this.routes;
        (function(scope, r) {
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, r){
        if (window.location.hash.length > 0) {
            for (let i = 0, length = r.length; i < length; i++) {
                let route = r[i];
                if(route.isActiveRoute(window.location.hash.substr(1))) {
                    scope._goToRoute(route);
                }
            }
        } else {
            for (let i = 0, length = r.length; i < length; i++) {
                let route = r[i];
                if(route.default) {
                    scope._goToRoute(route);
                }
            }
        }
    },
    _goToRoute: function (route) {
        (function(scope) {
            let url = route.htmlName,
                xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                    scope.rootElem.firstElementChild.classList.add("fade-in");
                    if(route.hasJs())
                        loadJs(scope.rootElem, route.jsName);
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    },
    goToRoute: function(routeName) {
        let child = this.rootElem.firstElementChild; // current page
        let route = this.getRouteByName(routeName);
        if(typeof route === undefined)
            return;

        if(typeof child === "undefined")
            this._goToRoute(route);
        else {
            child.classList.add("fade-out");
            setTransitionEnd(document.querySelector(".fade-out"), (e) => {
                if(e.propertyName !== 'opacity') return;
                this._goToRoute(route);
            });
        }
    },
    getRouteByName: function(name){
        for(let route of this.routes)
            if(route.name === name)
                return route;

        console.error(`Error: <${name}> is not a valid route name`);
    }

};