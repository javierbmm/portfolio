let menu = document.getElementById("menu");
menu.addEventListener('click', event => {
    menuAction(event.target.getAttribute("id"));
    //handle click
});
/**
 *
 * @param option {HTMLElement} Option from menu that has been clicked.
 * @param [toWiggle] {HTMLElement} Element to wiggle if menu isn't clickable.
 */
function menuAction(option, toWiggle){
    toWiggle = toWiggle || document.getElementById('login');
    if(option === null || typeof option == 'undefined')
        return;

    console.log("menu!", option);

    if(app.user.loggedIn){
        optionsAction[option]();
        toggleMenu(option);
    } else {
        wiggle(toWiggle);
    }
}

function toggleMenu(option){
    console.log(`option: ${option} vs prev: ${toggleMenu.prevOpt}`);
    if(option === toggleMenu.prevOpt)
        return;

    if(typeof toggleMenu.prevOpt != 'undefined')
        document.getElementById(toggleMenu.prevOpt).classList.toggle("selected");

    document.getElementById(option).classList.toggle("selected");
    toggleMenu.prevOpt = option;
}

let optionsAction = {
    server: () => { router.goToRoute("server"); },
    processes: () => { router.goToRoute("pannel"); },
    users: () => { router.goToRoute("users"); },
    logs: () => {router.goToRoute("logs"); },
    music: () => {router.goToRoute("music"); },
    filtering: () => { router.goToRoute("filtering"); },
    tasks: () => { router.goToRoute("tasks"); }

};