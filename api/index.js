import { objAsg } from '../methods'

let NOBODY = ['GET', 'HEAD', 'CONNECT', 'OPTIONS', 'TRACE']

let API = {}

API.configure = {
    root : '',
    params : {},
    headers : {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer '
    },
    body : {},
    options : {
        mode : 'cors',
        cache : 'default',
        credentials : 'same-origin',
        redirect : 'follow',
        referrerPolicy : 'no-referrer-when-downgrade'
    },
    callback : x => { console.log(x) },
    error : x => { console.error(x) }
}

// ===========================================================================

API.request = (url, init, callback, error) => {

    if(callback === undefined) { callback = API.configure.callback }
    if(error === undefined) { error = API.configure.error }
    
    let json = (data, call) => {
        data.text().then(data => {
            try { data = JSON.parse(data) } catch(err) {}
            call(data)
        })
    }

    fetch(url, init).then(resp => {
        resp.ok ? json(resp, callback) : json(resp, error)
    })
}

// ===========================================================================

API.request.get = url => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'GET',
        params : {}, init : {}
    }
    return req
}

API.request.head = url => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'HEAD',
        params : {}, init : {}
    }
    return req
}

API.request.post = url => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'POST',
        params : {}, init : {}
    }
    return req
}

API.request.put = url => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'PUT',
        params : {}, init : {}
    }
    return req
}

API.request.delete = url => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'DELETE',
        params : {}, init : {}
    }
    return req
}

API.request.connect = url => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'CONNECT',
        params : {}, init : {}
    }
    return req
}

API.request.options = url => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'OPTIONS',
        params : {}, init : {}
    }
    return req
}

API.request.trace = url => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'TRACE',
        params : {}, init : {}
    }
    return req
}

API.request.patch = url => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'PATCH',
        params : {}, init : {}
    }
    return req
}

// ===========================================================================

let params = (req, obj) => {
    req.send._data.params = obj
    return req
}

let headers = (req, obj) => {
    req.send._data.init.headers = obj
    return req
}

let body = (req, obj) => {
    req.send._data.init.body = obj
    return req
}

let options = (req, obj) => {
    req.send._data.options = obj
    return req
}

// ===========================================================================

let send = (req, callback, error) => {
    let data = req.send._data
    let init = data.init
    let conf = API.configure
    let durl = window.location.toString()
    // params
    let params = objAsg(conf.params, data.params || {})
    // init
    let request = objAsg(conf.options, {})
    // method
    request.method = data.method
    // headers
    request.headers = objAsg(conf.headers, init.headers || {})
    // body
    if(NOBODY.indexOf(data.method) === -1) {
        request.body = JSON.stringify(objAsg(conf.body, init.body || {}))
    } else { delete request.body }
    // options
    request = objAsg(request, data.options || {})
    // create url and add params
    let path = conf.root + data.url
    let url = new URL( path.indexOf(':') > -1 ? path : durl + path)
    url.search = new URLSearchParams(params)
    // request
    API.request(url.toString(), request, callback, error)
    return req
}

export default API