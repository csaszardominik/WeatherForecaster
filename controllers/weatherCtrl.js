// async function loadForecast() {

//     let box = document.querySelector('#forecastList');

//     if (!box) {
//         return;
//     }

//     const response = await fetch('http://localhost:3000/weather');

//     let res = await response.json();

//     if (response.status !== 200) {
//         showMessage('danger', 'ERROR', res.error);
//         return;
//     }

//     if (res.length === 0) {
//         box.innerHTML = '<p class="text-secondary">Még nincs rögzített előrejelzés.</p>';
//         return;
//     }

//     box.innerHTML = '';

//     res.forEach(weather => {


//         box.innerHTML += `
//             <div class="col-md-6 col-xl-4">
//                 <div class="weather-card">

//                     <div class="d-flex justify-content-between">
//                         <span class="text-secondary">
//                             ${new Date(weather.date).toLocaleDateString('hu-HU')}

//                     </div>

//                     <h3>${weather.location}</h3>

//                     <div class="temperature">
//                         ${weather.temp_min}° / ${weather.temp_max}°
//                     </div>

//                     <p class="mb-3">
//                         ${weather.weather_type}
//                     </p>

//                     <button
//                         class="btn btn-outline-primary btn-sm"
//                         onclick="showWeatherDetail(${weather.ID})">
//                         Részletek
//                     </button>

//                 </div>
//             </div>
//         `;
//     });
// }


// async function showWeatherDetail(id) {

//     let user = loadUser();

//     if (!user) {
//         showMessage(
//             'warning',
//             'FIGYELEM',
//             'A részletes adatok megtekintéséhez jelentkezz be.'
//         );
//         return;
//     }

//     const response = await fetch(
//         `http://localhost:3000/weather/${id}`,
//         {
//             headers: {
//                 'x-user-id': user.ID
//             }
//         }
//     );

//     let res = await response.json();

//     if (response.status !== 200) {
//         showMessage('danger', 'ERROR', res.error);
//         return;
//     }

//     let detailBox = document.querySelector('#weatherDetail');

//     detailBox.innerHTML = `
//         <div class="panel mt-4">

//             <div class="d-flex justify-content-between">
//                 <h3>${res.location} – részletes adatok</h3>

//                 <button
//                     class="btn-close"
//                     onclick="document.querySelector('#weatherDetail').innerHTML = ''">
//                 </button>
//             </div>

//             <div class="detail-grid mt-3">

//                 ${'Dátum', new Date(res.date).toLocaleDateString('hu-HU')}
//                 ${'Minimum', res.temp_min + ' °C'}
//                 ${'Maximum', res.temp_max + ' °C'}
//                 ${'Időjárás', res.weather_type}
//                 ${'Csapadék', res.precipitation + ' mm'}
//                 ${'Csapadék esélye', res.precipitation_probability + '%'}
//                 ${'Szélsebesség', res.wind_speed + ' km/h'}
//                 ${'Szélirány', res.wind_direction}
//                 ${'Páratartalom', res.humidity + '%'}
//                 ${'Légnyomás', res.pressure + ' hPa'}
//                 ${'UV-index', res.uv_index}

//             </div>
//         </div>
//     `;
// }
// async function loadWeather() {
//     try {
//         const response = await fetch('/weather');
//         const weatherData = await response.json();

//         console.log(weatherData);
//         return weatherData;
//     } catch (error) {
//         console.error('Hiba az időjárási adatok lekérésekor:', error);
//     }
// }


// async function getWeather() {
//     const list = document.querySelector('#forecastList');
//     if (!list) return;
//     try {
//         const response = await fetch('http://localhost:3000/weather');
//         const forecasts = await response.json();
//         if (!response.ok) {
//              list.innerHTML = `<p class="text-danger">${forecasts.error}</p>`;
//             return; 
//             }
//         list.innerHTML = '';

//         if (!forecasts.length) {
//              list.innerHTML = '<p>Még nincs előrejelzés.</p>'; 
//              return;
//             }
//         forecasts.forEach(item => {
//             const col = document.createElement('div'); col.className = 'col-md-6 col-xl-4';
//             const card = document.createElement('div'); card.className = 'card h-100 shadow-sm';
//             const body = document.createElement('div'); body.className = 'card-body';

//             const date = new Date(item.date).toLocaleDateString('hu-HU');

//             body.innerHTML = `<h5 class="card-title"></h5><p class="card-text"></p><p class="card-text"></p><button class="btn btn-outline-primary btn-sm">Részletek</button>`;
//             body.querySelector('.card-title').textContent = `${item.location} – ${date}`;
//             body.querySelectorAll('.card-text')[0].textContent = `${item.temp_min} °C – ${item.temp_max} °C`;
//             body.querySelectorAll('.card-text')[1].textContent = item.weather_type;
//             body.querySelector('button').addEventListener('click', () => {
//                  if (!loadUser()) {
//                     showMessage('warning','Bejelentkezés szükséges','A részletes adatok megtekintéséhez jelentkezz be.');
//                     return; }
//                     showWeatherDetail(item.ID); 
//                 });
//             card.appendChild(body); col.appendChild(card); list.appendChild(col);
//         });
//     } catch (_error) { list.innerHTML = '<p class="text-danger">Nem sikerült betölteni az előrejelzéseket. Fut a backend?</p>'; }
// }

async function getWeather() {
    const list = document.querySelector('#forecastList');
    if (!list) return;
    try {
        const response = await fetch('http://localhost:3000/weather');
        const forecasts = await response.json();
        if (!response.ok) { list.innerHTML = `<p class="text-danger">${forecasts.error}</p>`; return; }
        list.innerHTML = '';
        if (!forecasts.length) { list.innerHTML = '<p>Még nincs előrejelzés.</p>'; return; }
        forecasts.forEach(item => {
            const col = document.createElement('div'); col.className = 'col-md-6 col-xl-4';
            const card = document.createElement('div'); card.className = 'card h-100 shadow-sm';
            const body = document.createElement('div'); body.className = 'card-body';
            const date = new Date(item.date).toLocaleDateString('hu-HU');
            body.innerHTML = `<h5 class="card-title"></h5><p class="card-text"></p><p class="card-text"></p><button class="btn btn-outline-primary btn-sm">Részletek</button>`;
            body.querySelector('.card-title').textContent = `${item.location} – ${date}`;
            body.querySelectorAll('.card-text')[0].textContent = `${item.temp_min} °C – ${item.temp_max} °C`;
            body.querySelectorAll('.card-text')[1].textContent = item.weather_type;
            body.querySelector('button').addEventListener('click', () => { if (!loadUser()) { showMessage('warning','Bejelentkezés szükséges','A részletes adatok megtekintéséhez jelentkezz be.'); return; } showWeatherDetail(item.ID); });
            card.appendChild(body); col.appendChild(card); list.appendChild(col);
        });
    } catch (_error) { list.innerHTML = '<p class="text-danger">Nem sikerült betölteni az előrejelzéseket. Fut a backend?</p>'; }
}
async function showWeatherDetail(id) {
    const target = document.querySelector('#weatherDetail');
    const user = loadUser();
    if (!user) return showMessage('warning','Bejelentkezés szükséges','A részletes adatok megtekintéséhez jelentkezz be.');
    const response = await fetch(`http://localhost:3000/weather/${id}?uid=${user.ID}`);
    const item = await response.json();
    if (!response.ok) return showMessage('danger','Hiba',item.error);
    target.innerHTML = '';
    const panel = document.createElement('div'); panel.className = 'card mt-4';
    const body = document.createElement('div'); body.className = 'card-body';
    const title = document.createElement('h4'); title.textContent = `${item.location} – részletes adatok`;
    const details = document.createElement('p');
    details.textContent = `Csapadék: ${item.precipitation} mm; csapadék esélye: ${item.precipitation_probability}%; szél: ${item.wind_speed} km/h (${item.wind_direction}); páratartalom: ${item.humidity}%; légnyomás: ${item.pressure} hPa; UV-index: ${item.uv_index}`;
    body.append(title,details); panel.appendChild(body); target.appendChild(panel);
}


// async function getWeather() {
//     const list = document.querySelector('#forecastList');
//     if (!list) return;

//     const r = await apiFetch('/weather');
//     if (!r.ok) {
//         list.innerHTML = '';
//         const p = document.createElement('p');
//         p.className = 'text-danger';
//         p.textContent = r.data.error;
//         list.appendChild(p);
//         return;
//     }

//     list.innerHTML = '';
//     if (!r.data.length) {
//         list.innerHTML = '<p>Még nincs előrejelzés.</p>';
//         return;
//     }

//     r.data.forEach(item => {
//         const col = document.createElement('div');
//         col.className = 'col-md-6 col-xl-4';
//         col.innerHTML = `<div class="card h-100 shadow-sm"><div class="card-body">
//             <h5 class="card-title"></h5>
//             <p class="card-text temp mb-0"></p>
//             <p class="card-text type"></p>
//             <button class="btn btn-outline-primary btn-sm">Részletek</button>
//         </div></div>`;
//         col.querySelector('.card-title').textContent = `${item.location} – ${formatDate(item.date)}`;
//         col.querySelector('.temp').textContent = `${item.temp_min} °C – ${item.temp_max} °C`;
//         col.querySelector('.type').textContent = item.weather_type;
//         col.querySelector('button').addEventListener('click', () => showWeatherDetail(item.ID));
//         list.appendChild(col);
//     });
// }

// // Részletek: csak bejelentkezett (és nem kitiltott) felhasználónak
// async function showWeatherDetail(id) {
//     const user = loadUser();
//     if (!user) {
//         showMessage('warning', 'Bejelentkezés szükséges', 'A részletes adatok megtekintéséhez jelentkezz be.');
//         return;
//     }

//     const r = await apiFetch(`/weather/${id}?uid=${user.ID}`);
//     if (!r.ok) {
//         showMessage('danger', 'ERROR', r.data.error);
//         return;
//     }

//     const item = r.data;
//     const rows = [
//         ['Dátum', formatDate(item.date)],
//         ['Minimum', item.temp_min + ' °C'],
//         ['Maximum', item.temp_max + ' °C'],
//         ['Időjárás', item.weather_type],
//         ['Csapadék', item.precipitation + ' mm'],
//         ['Csapadék esélye', item.precipitation_probability + ' %'],
//         ['Szélsebesség', item.wind_speed + ' km/h'],
//         ['Szélirány', item.wind_direction],
//         ['Páratartalom', item.humidity + ' %'],
//         ['Légnyomás', item.pressure + ' hPa'],
//         ['UV-index', item.uv_index]
//     ];

//     const target = document.querySelector('#weatherDetail');
//     target.innerHTML = `<div class="panel mt-4">
//         <div class="d-flex justify-content-between align-items-start">
//             <h3 class="detail-title"></h3>
//             <button type="button" class="btn-close" aria-label="Close"></button>
//         </div>
//         <div class="detail-grid mt-3"></div>
//     </div>`;
//     target.querySelector('.detail-title').textContent = `${item.location} – részletes adatok`;
//     target.querySelector('.btn-close').addEventListener('click', () => { target.innerHTML = ''; });

//     const grid = target.querySelector('.detail-grid');
//     rows.forEach(([label, value]) => {
//         const cell = document.createElement('div');
//         cell.className = 'detail-item';
//         const small = document.createElement('small');
//         small.className = 'text-secondary';
//         small.textContent = label;
//         const strong = document.createElement('div');
//         strong.className = 'detail-value';
//         strong.textContent = value;
//         cell.append(small, strong);
//         grid.appendChild(cell);
//     });
//     target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
// }

// async function showWeatherDetail(id) {
//     const target = document.querySelector('#weatherDetail');
//     const user = loadUser();
//     if (!user) 
//         return showMessage('warning','Bejelentkezés szükséges','A részletes adatok megtekintéséhez jelentkezz be.');
//     const response = await fetch(`http://localhost:3000/weather/${id}?uid=${user.ID}`);
//     const item = await response.json();
//     if (!response.ok) return showMessage('danger','Hiba',item.error);
//     target.innerHTML = '';
//     const panel = document.createElement('div'); panel.className = 'card mt-4';
//     const body = document.createElement('div'); body.className = 'card-body';
//     const title = document.createElement('h4'); title.textContent = `${item.location} – részletes adatok`;
//     const details = document.createElement('p');
//     details.textContent = `Csapadék: ${item.precipitation} mm; csapadék esélye: ${item.precipitation_probability}%; szél: ${item.wind_speed} km/h (${item.wind_direction}); páratartalom: ${item.humidity}%; légnyomás: ${item.pressure} hPa; UV-index: ${item.uv_index}`;
//     body.append(title,details); panel.appendChild(body); target.appendChild(panel);
// }