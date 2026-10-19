let contentBox = document.querySelector('#content');
let lightModeBtn = document.querySelector('#lightModeBtn');
let darkModeBtn = document.querySelector('#darkModeBtn');

async function navigate(page) {
    contentBox.innerHTML = await (await fetch(`${page}.html`)).text();

    switch (page) {
        case 'views/user/forecast':
            getWeather();
            break;
        case 'views/user/profileUpdate':
            fillProfileForm();
            break;
        case 'views/admin/users':
            getAllUsers();
            break;
        case 'views/admin/weather':
            getAdminWeather();
            break;
    }
}

lightModeBtn.addEventListener('click', () => setTheme('light'));
darkModeBtn.addEventListener('click', () => setTheme('dark'));

function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('WeatherAppTheme', theme);

    // the sun is shown in dark mode (switch to light), the moon in light mode (switch to dark)
    lightModeBtn.classList.toggle('hide', theme === 'light');
    darkModeBtn.classList.toggle('hide', theme === 'dark');
}

setTheme(localStorage.getItem('WeatherAppTheme') || 'light');

if (loadUser()) {
    loginCheck();
} else {
    setMenuItems('');
    navigate('views/user/home');
}
