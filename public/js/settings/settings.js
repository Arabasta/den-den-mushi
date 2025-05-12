import {term} from "../terminal.js";
import {themes} from "./themes.js";


export function toggleSettings() {
    const menu = document.getElementById('settingsMenu');
    menu.classList.toggle('show');
}

document.addEventListener('click', (e) => {
    const menu = document.getElementById('settingsMenu');
    const button = document.getElementById('menuButton');
    if (!menu.contains(e.target) && e.target !== button) {
        menu.classList.remove('show');
    }
});

document.getElementById('menuButton').addEventListener('click', toggleSettings);

document.querySelectorAll('input[name="theme"]').forEach(radio => {
    radio.addEventListener('change', function (e) {
        const selected = e.target.value;
        console.log(`Selected theme: ${selected}`);
        const theme = themes[selected];

        if (theme) {
            console.log(`Applying theme: ${JSON.stringify(theme)}`);
            term.background = theme.background;
            term.foreground = theme.foreground;
            term.cursor = theme.cursor;
            term.selection = theme.selection;
        } else {
            console.error(`Theme ${selected} not found`);
        }
    });
});
