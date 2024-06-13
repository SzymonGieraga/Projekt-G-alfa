function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const regex = /([^&=]+)=([^&]*)/g;
    let m;
    while (m = regex.exec(queryString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
}

window.onload = function() {
    const params = getQueryParams();
    if (params.error) {
        document.getElementById('error-message').innerText = 'Błędny login lub hasło';
    }
}
