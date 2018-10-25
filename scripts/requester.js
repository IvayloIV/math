let requester = (() => {
    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_B126T2-RG";

    function makeRequest(method, module, endpoint) {
        return req = {
            method,
            url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
            headers: {
                'Authorization': 'Basic ' + btoa('peter' + ':' + 'p')
            }
        };
    }

    function get (module, endpoint) {
        return $.ajax(makeRequest('GET', module, endpoint));
    }

    function post (module, endpoint, data) {
        let req = makeRequest('POST', module, endpoint);
        req.data = data;
        return $.ajax(req);
    }

    function update (module, endpoint, data) {
        let req = makeRequest('PUT', module, endpoint);
        req.data = data;
        return $.ajax(req);
    }

    function remove (module, endpoint) {
        return $.ajax(makeRequest('DELETE', module, endpoint));
    }

    return {
        get,
        post,
        update,
        remove
    }
})();