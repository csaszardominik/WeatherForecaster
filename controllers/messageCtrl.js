function showMessage(type, title, msg) {
    const msgBox = document.querySelector('#msg');
    if (!msgBox) return;
    msgBox.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert"><strong>${title}</strong><br>${msg}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
}
function hideMessage() { const box = document.querySelector('#msg'); if (box) box.innerHTML = ''; }
