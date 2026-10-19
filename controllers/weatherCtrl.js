const API_URL = 'http://localhost:3000';

const WEATHER_ICONS = {
    'sunny': 'bi-sun-fill',
    'partly cloudy': 'bi-cloud-sun-fill',
    'cloudy': 'bi-cloudy-fill',
    'rainy': 'bi-cloud-rain-heavy-fill',
    'stormy': 'bi-cloud-lightning-rain-fill',
    'snowy': 'bi-snow2',
    'foggy': 'bi-cloud-fog2-fill',
    'windy': 'bi-wind'
};

function weatherIcon(type) {
    return WEATHER_ICONS[String(type).toLowerCase()] || 'bi-cloud-fill';
}

function formatDate(date) {
    return moment(date, 'YYYY-MM-DD').format('ddd, MMM D, YYYY');
}

// public list (guests can see it too)
async function getWeather() {
    const list = document.querySelector('#forecastList');

    if (!list) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/weather`);
        const forecasts = await response.json();

        if (!response.ok) {
            list.innerHTML = '';
            const p = document.createElement('p');
            p.className = 'text-danger';
            p.textContent = forecasts.error;
            list.appendChild(p);
            return;
        }

        list.innerHTML = '';

        if (!forecasts.length) {
            list.innerHTML = '<p class="text-secondary">There are no forecasts yet.</p>';
            return;
        }

        forecasts.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-xl-4';
            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <small class="text-secondary date"></small>
                            <i class="bi weather-icon"></i>
                        </div>
                        <h5 class="card-title mt-2 location"></h5>
                        <p class="temperature mb-1"></p>
                        <p class="text-capitalize type"></p>
                        <button type="button" class="btn btn-outline-primary btn-sm">Details</button>
                    </div>
                </div>`;

            col.querySelector('.date').textContent = formatDate(item.date);
            col.querySelector('.location').textContent = item.location;
            col.querySelector('.temperature').textContent = `${item.temp_min} °C / ${item.temp_max} °C`;
            col.querySelector('.type').textContent = item.weather_type;
            col.querySelector('.weather-icon').classList.add(weatherIcon(item.weather_type));
            col.querySelector('button').addEventListener('click', () => showWeatherDetail(item.ID));

            list.appendChild(col);
        });
    } catch (error) {
        list.innerHTML = '<p class="text-danger">Failed to load the forecasts. Is the backend running?</p>';
    }
}

// detailed data: only for logged in users
async function showWeatherDetail(id) {
    const target = document.querySelector('#weatherDetail');
    const user = loadUser();

    if (!user) {
        showMessage('warning', 'Login required', 'Log in to see the detailed forecast.');
        return;
    }

    const response = await fetch(`${API_URL}/weather/${id}?uid=${user.ID}`);
    const item = await response.json();

    if (!response.ok) {
        showMessage('danger', 'ERROR', item.error);
        return;
    }

    const rows = [
        ['Date', formatDate(item.date)],
        ['Minimum', item.temp_min + ' °C'],
        ['Maximum', item.temp_max + ' °C'],
        ['Weather', item.weather_type],
        ['Precipitation', item.precipitation + ' mm'],
        ['Chance of precipitation', item.precipitation_probability + ' %'],
        ['Wind speed', item.wind_speed + ' km/h'],
        ['Wind direction', item.wind_direction],
        ['Humidity', item.humidity + ' %'],
        ['Pressure', item.pressure + ' hPa'],
        ['UV index', item.uv_index]
    ];

    target.innerHTML = `
        <div class="card mt-4">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <h4 class="detail-title"></h4>
                    <button type="button" class="btn-close" aria-label="Close"></button>
                </div>
                <div class="row g-3 mt-1 detail-grid"></div>
            </div>
        </div>`;

    target.querySelector('.detail-title').textContent = `${item.location} - detailed data`;
    target.querySelector('.btn-close').addEventListener('click', () => { target.innerHTML = ''; });

    const grid = target.querySelector('.detail-grid');

    rows.forEach(([label, value]) => {
        const cell = document.createElement('div');
        cell.className = 'col-6 col-md-4 col-lg-3';

        const small = document.createElement('small');
        small.className = 'text-secondary';
        small.textContent = label;

        const val = document.createElement('div');
        val.className = 'fw-semibold text-capitalize';
        val.textContent = value;

        cell.append(small, val);
        grid.appendChild(cell);
    });

    target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
