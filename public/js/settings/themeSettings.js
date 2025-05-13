import {terminal} from "../terminal.js";
import {themes} from "./themes.js";
const { term, fitAddon } = terminal;

export function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) {
        console.error(`Theme ${themeName} not found`);
        return;
    }

    term.options.theme = theme;
    localStorage.setItem("theme", themeName);

    const radios = document.querySelectorAll('input[name="theme"]');
    radios.forEach(radio => {
        radio.checked = (radio.value === themeName);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem("theme") || "Dracula";
    applyTheme(savedTheme);

    // event listeners
    const radios = document.querySelectorAll('input[name="theme"]');
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            console.log(`Theme changed to ${e.target.value}`);
            applyTheme(e.target.value);
        });
    });

    // initial radio state
    radios.forEach(radio => {
        if (radio.value === savedTheme) {
            radio.checked = true;
        }
    });
});
