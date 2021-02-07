function getTransitionEndEventName() {
    let transitions = {
        "transition": "transitionend",
        "OTransition": "oTransitionEnd",
        "MozTransition": "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    };
    let bodyStyle = document.body.style;
    for (let transition in transitions)
        if (bodyStyle[transition] !== undefined)
            return transitions[transition];
}

function setTransitionEnd(element, func) {
    element.addEventListener(getTransitionEndEventName(), func, false);
}

function loadJs(parentElement, jsPath) {
    let script=document.createElement("script");
    script.type="text/javascript";
    script.src = jsPath;//The js path you want to load
    parentElement.appendChild(script);
}

function ready(fn) {
    if (document.readyState !== 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function wiggle(elem) {
    elem.classList.remove("__wiggle");
    void elem.offsetWidth;
    elem.classList.add('__wiggle');
}

function fadeIn(elem) {
    elem.classList.remove("fade-in");
    void elem.offsetWidth;
    elem.classList.add('fade-in');
}

function fadeInPlace(elem) {
    elem.classList.remove("fade-in-place");
    void elem.offsetWidth;
    elem.classList.add('fade-in-place');
}

function startSpin(elem){
    elem.classList.add("__spin")
}

function stopSpin(elem){
    elem.classList.remove("__spin")
}
/**
 *
 * @param url {string}
 * @param method {string}
 * @param body {Object}
 * @param success {function}
 * @param failure {function}
 */
function callApi(url, method, body, success, failure){
    fetch(url, {
        method: method,
        header: { 'Content-type' : app.api.header },
        body: body
    }).then( response => response.json())
        .then( body => success(body))
        .catch(error => failure(error));
}


/**
 * Function to build a "Stat" (js object) inside containers to display information (HTML output)
 * @param container {HTMLElement}
 * @param obj {Object}
 */
function buildStat(container, obj) {
    // Delete everything except title
    let title = container.getElementsByClassName("__title")[0];
    container.innerHTML = '';
    container.appendChild(title);

    // Append content of object
    if (Array.isArray(obj)) {
        let it = 0;
        obj.forEach(elem => {
            container.innerHTML += `<div class="__container"></div>`;
            let innerContainer = container.getElementsByClassName("__container")[it];
            for (let prop in elem) {
                innerContainer.innerHTML += `<p class="__code"><b class="__bold">${prop}: </b>${elem[prop]}</p>`;
            }
            it++;
            fadeInPlace(innerContainer);
        })
    }
}

console.log("hola");