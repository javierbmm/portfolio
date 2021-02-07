'use stict';

function Route(name, htmlName, defaultRoute = false, jsName = undefined) {
    try {
        if(!name || !htmlName) {
            throw 'error: name and htmlName params are mandatories';
        }
        this.constructor(name, htmlName, defaultRoute, jsName);
    } catch (e) {
        console.error(e);
    }
}

Route.prototype = {
    name: undefined,
    htmlName: undefined,
    default: undefined,
    jsName: undefined,
    constructor: function (name, htmlName, defaultRoute, jsName) {
        this.name = name;
        this.htmlName = htmlName;
        this.default = defaultRoute;
        this.jsName = jsName;
    },
    isActiveRoute: function (hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    },
    hasJs: function(){return typeof this.jsName !== "undefined"}
};