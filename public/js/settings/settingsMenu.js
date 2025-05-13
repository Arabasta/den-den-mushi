import { applyTheme} from "./themeSettings.js";

export function toggleSettingsMenu() {
    const menu = document.getElementById('settingsMenu');
    menu.classList.toggle('show');
}

// close menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.getElementById('settingsMenu');
    const button = document.getElementById('menuButton');
    if (!menu.contains(e.target) && e.target !== button) {
        menu.classList.remove('show');
    }
});

document.getElementById('menuButton').addEventListener('click', toggleSettingsMenu);
