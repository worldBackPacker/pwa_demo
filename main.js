document.addEventListener("DOMContentLoaded", init)
let installPromptEvent;

function init() {

    window.addEventListener('load', () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
        }
    })

    window.addEventListener('beforeinstallprompt', (ev) => {
        ev.preventDefault();
        console.log(installPromptEvent)
        installPromptEvent = ev;
        console.log(ev)

        console.log('deferredPrompt saved', installPromptEvent);
    });

    const btn = document.getElementById('btn')

    btn.addEventListener('click', callInstallPrompt)

}

const callInstallPrompt = (ev) => {
    console.log(ev)
    console.log(installPromptEvent)
    if (installPromptEvent !== undefined) {
        installPromptEvent.prompt();
    }
}