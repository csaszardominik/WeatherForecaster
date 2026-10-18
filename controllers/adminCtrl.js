async function getAllUsers() {

    let luid = loadUser() ? loadUser().ID : 0;

    const response = await fetch('http://localhost:3000/admin/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ luid }),
    });
    if(response.status !== 200) {
        const res = await response.json();
        showMessage('danger', 'ERROR', res.error);
    } else {
        const users = await response.json();
        console.log(users);
        drawTable(users);
    }
}
   
function drawTable(users) {
 
    let usersCount = document.querySelector('#usersCount');
 
    usersCount.innerHTML = users.length;
 
    users.forEach((user, index) => {
 
        addTableRow(user, index);
 
    });
 
}
 
function addTableRow(user, index) {
 
    let usersList = document.querySelector('#usersList');
 
    let tr = document.createElement('tr');
 
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');
    let td8 = document.createElement('td');
    

    td1.innerHTML = (index + 1) + '.';
    td2.innerHTML = user.name;
    td3.innerHTML = user.email;
    td4.innerHTML = user.role;
    td5.innerHTML = user.reg;
    td6.innerHTML = user.last_login ? moment(user.last_login, "YYYYMMDDHmm").fromNow() : 'never';
    td7.innerHTML = user.last;
    
 
    let isActive = user.is_active ? 'checked' : '';
 
    let isdisabled = user.ID == loadUser().ID ? 'disabled' : '';
    td8.innerHTML = '<div class="form-check form-switch float-end"><input class="form-check-input" type="checkbox" role="switch" id="is_active" ' + isActive + ' ' + isdisabled + ' onclick="changeUserStatus(\'' + user.ID + '\')"></div>';

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);

    usersList.appendChild(tr);
}

async function getStatistics(){
    let luid = loadUser() ? loadUser().ID : 0;

    const response = await fetch(`http://localhost:3000/admin/weather`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ luid }),
    });

    if (response.status != 200){
        const res = await response.json();
        showMessage('danger', 'ERROR', res.error);
    } else {
        const results = await response.json();   
        drawTableWeather(results);
    }

}

async function changeUserStatus(uid) {
    let luid = loadUser() ? loadUser().ID : 0;

    const data = {
        luid,
        uid
    };

    const response = await fetch(
        'http://localhost:3000/admin/status',
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );

    const res = await response.json();

    if (response.status !== 200) {
        showMessage('danger', 'ERROR', res.error);
    } else {
        showMessage('success', 'SUCCESS', res.message);
    }
}

// function drawDashboard(results){
//     let totalSteps = document.querySelector('#totalSteps');
//     let totalKm = document.querySelector('#totalKm');
//     let avgSteps = document.querySelector('#avgSteps');
//     let avgKm = document.querySelector('#avgKm');
  
//     totalSteps.innerHTML = results[0][0].totalSteps + ' steps';
//     totalKm.innerHTML = '~' + Math.round((results[0][0].totalSteps * 0.7) / 1000) + ' km';
//     avgSteps.innerHTML = results[0][0].averageSteps + ' steps';
//     avgKm.innerHTML = '~' + Math.round((results[0][0].averageSteps * 0.7) / 1000) + ' km';

//     let topUsers = document.querySelector('#topUsers');

//     results[1].forEach((user, index) => {
//         let km = Math.round((user.steps * 0.7) / 1000);
//         topUsers.innerHTML += `
//         <tr>
//             <td>${index+1}.</td>
//             <td class="text-start">
//             ${user.name} <br> <small>${user.email}</small>
//             </td>
//             <td class="text-end">${user.steps} steps <br> <small>~${km} km</small></td>
//         </tr>`;

//     });
  
// }

function drawTableWeather(weathers) {
 
    let weatherCount = document.querySelector('#weatherCount');
 
    weatherCount.innerHTML = weathers.length;
 
    weathers.forEach((weather, index) => {
 
        addTableRow(weather, index);
 
    });
 
}



function addTableRowWeather(weather, index) {
 
    let weatherRows = document.querySelector('#weatherRows');
 
    let tr = document.createElement('tr');
 
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');

    td1.innerHTML = (index + 1) + '.';
    td2.innerHTML = weather.date;
    td3.innerHTML = weather.location;
    td4.innerHTML = weather.temp_min + ' - '+ weather.temp_max;
    td5.innerHTML = weather.weather_type;
    td6.innerHTML = `<button type="button" class="btn btn-danger"> &nbsp;&nbsp;Update profile </button>`

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    weatherRows.appendChild(tr);
}