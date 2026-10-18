let contentBox = document.querySelector('#content');

let lightModeBtn = document.querySelector('#lightModeBtn');
let darkModeBtn = document.querySelector('#darkModeBtn');

let theme = 'light';

async function navigate(page) {
    console.log('Page:', page);

    contentBox.innerHTML = await (await fetch(`${page}.html`)).text();

    switch(page) {
        case 'views/admin/users':
            getAllUsers();
            break;

        case 'views/admin/weather':
            getStatistics();
            break;
        case 'views/user/forecast':
            getUserSteps();
            break;
        case 'views/user/profileUpdate':
            getUserSteps();
            break;
    }
}

lightModeBtn.addEventListener('click', () => {
    setTheme('light');
});

darkModeBtn.addEventListener('click', () => {
    setTheme('dark');
});

function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    saveTheme(theme);
    setThemeBtnState();
}

function setThemeBtnState() {
    lightModeBtn.classList.toggle('hide');
    darkModeBtn.classList.toggle('hide');
}

function saveTheme(theme) {
    localStorage.setItem('SCT', theme);
}

function loadTheme() {
    theme = 'light';

    if (localStorage.getItem('SCT')) {
        theme = localStorage.getItem('SCT');

        if (theme == 'dark') {
            setThemeBtnState();
        }
    }

    setTheme(theme);
}

function clearUser() {
     sessionStorage.removeItem('WeatherAppUser') 
    }

navigate('views/users/home');

loadTheme();

setMenuItems();