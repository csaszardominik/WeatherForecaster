// ---------- USERS ----------

async function getAllUsers() {
    let luid = loadUser() ? loadUser().ID : 0;

    const response = await fetch('http://localhost:3000/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ luid }),
    });

    if (response.status !== 200) {
        const res = await response.json();
        showMessage('danger', 'ERROR', res.error);
    } else {
        const users = await response.json();
        drawTable(users);
    }
}

function drawTable(users) {
    document.querySelector('#usersCount').textContent = users.length;
    document.querySelector('#usersList').innerHTML = '';

    users.forEach((user, index) => addTableRow(user, index));
}

function addTableRow(user, index) {
    let usersList = document.querySelector('#usersList');
    let tr = document.createElement('tr');

    const cells = [
        (index + 1) + '.',
        user.name,
        user.email,
        user.role,
        user.reg,
        user.last ? moment(user.last, 'YYYY-MM-DD HH:mm:ss').fromNow() : 'never',
        user.loginCount
    ];

    cells.forEach(value => {
        let td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
    });

    let isActive = user.satus !== 'Banned' ? 'checked' : '';
    let isDisabled = user.ID == loadUser().ID ? 'disabled' : '';

    let td = document.createElement('td');
    td.innerHTML = `<div class="form-check form-switch float-end"><input class="form-check-input" type="checkbox" role="switch" ${isActive} ${isDisabled}></div>`;
    td.querySelector('input').addEventListener('change', () => changeUserStatus(user.ID));
    tr.appendChild(td);

    usersList.appendChild(tr);
}

async function changeUserStatus(uid) {
    let luid = loadUser() ? loadUser().ID : 0;

    const response = await fetch('http://localhost:3000/admin/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ luid, uid })
    });

    const res = await response.json();

    if (response.status !== 200) {
        showMessage('danger', 'ERROR', res.error);
        getAllUsers();
    } else {
        showMessage('success', 'SUCCESS', res.message);
    }
}

// ---------- FORECASTS ----------

let adminForecasts = [];

async function adminWeatherRequest(method, path, data = {}) {
    const luid = loadUser() ? loadUser().ID : 0;

    const response = await fetch(`http://localhost:3000/admin/weather${path}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, luid })
    });

    return { ok: response.ok, data: await response.json() };
}

async function getAdminWeather() {
    const r = await adminWeatherRequest('POST', '/list');

    if (!r.ok) {
        showMessage('danger', 'ERROR', r.data.error);
        return;
    }

    adminForecasts = r.data;
    drawTableWeather(adminForecasts);
}

function drawTableWeather(weathers) {
    document.querySelector('#weatherCount').textContent = weathers.length;
    document.querySelector('#weatherRows').innerHTML = '';

    weathers.forEach((weather, index) => addTableRowWeather(weather, index));
}

function addTableRowWeather(weather, index) {
    const tr = document.createElement('tr');

    const cells = [
        (index + 1) + '.',
        weather.date,
        weather.location,
        weather.temp_min + ' - ' + weather.temp_max + ' °C',
        weather.weather_type
    ];

    cells.forEach((value, i) => {
        const td = document.createElement('td');
        td.textContent = value;
        if (i === 4) td.className = 'text-capitalize';
        tr.appendChild(td);
    });

    const actions = document.createElement('td');
    actions.className = 'text-end text-nowrap';
    actions.innerHTML = `
        <button type="button" class="btn btn-sm btn-outline-primary edit"><i class="bi bi-pencil-fill"></i> Edit</button>
        <button type="button" class="btn btn-sm btn-outline-danger delete"><i class="bi bi-trash-fill"></i> Delete</button>`;
    actions.querySelector('.edit').addEventListener('click', () => editWeather(weather.ID));
    actions.querySelector('.delete').addEventListener('click', () => deleteWeather(weather.ID));
    tr.appendChild(actions);

    document.querySelector('#weatherRows').appendChild(tr);
}

const WEATHER_FIELDS = ['date', 'location', 'weather_type', 'temp_min', 'temp_max', 'precipitation',
    'precipitation_probability', 'wind_speed', 'wind_direction', 'humidity', 'pressure', 'uv_index'];

async function saveWeather(event) {
    event.preventDefault();

    const id = document.querySelector('#weatherId').value;
    const data = {};

    WEATHER_FIELDS.forEach(field => {
        data[field] = document.querySelector('#' + field).value;
    });

    const r = id
        ? await adminWeatherRequest('PATCH', '/' + id, data)
        : await adminWeatherRequest('POST', '', data);

    if (!r.ok) {
        showMessage('danger', 'ERROR', r.data.error);
        return;
    }

    showMessage('success', 'SUCCESS', r.data.message);
    resetWeatherForm();
    getAdminWeather();
}

function editWeather(id) {
    const weather = adminForecasts.find(item => item.ID == id);

    if (!weather) {
        return;
    }

    WEATHER_FIELDS.forEach(field => {
        document.querySelector('#' + field).value = weather[field];
    });

    document.querySelector('#weatherId').value = weather.ID;
    document.querySelector('#formTitle').textContent = 'Edit forecast #' + weather.ID;
    document.querySelector('#weatherForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function deleteWeather(id) {
    if (!confirm('Are you sure you want to delete this forecast?')) {
        return;
    }

    const r = await adminWeatherRequest('DELETE', '/' + id);

    if (!r.ok) {
        showMessage('danger', 'ERROR', r.data.error);
        return;
    }

    showMessage('success', 'SUCCESS', r.data.message);
    getAdminWeather();
}

function resetWeatherForm() {
    document.querySelector('#weatherForm').reset();
    document.querySelector('#weatherId').value = '';
    document.querySelector('#formTitle').textContent = 'Add forecast';
}
