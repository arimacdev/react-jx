import { objectAssign } from '../methods'

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

API.request.get = (url, isDef = true) => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'GET',
        params : {}, init : {}, isDef : isDef
    }
    return req
}

API.request.head = (url, isDef = true) => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'HEAD',
        params : {}, init : {}, isDef : isDef
    }
    return req
}

API.request.post = (url, isDef = true) => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'POST',
        params : {}, init : {}, isDef : isDef
    }
    return req
}

API.request.put = (url, isDef = true) => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'PUT',
        params : {}, init : {}, isDef : isDef
    }
    return req
}

API.request.delete = (url, isDef = true) => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'DELETE',
        params : {}, init : {}, isDef : isDef
    }
    return req
}

API.request.connect = (url, isDef = true) => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'CONNECT',
        params : {}, init : {}, isDef : isDef
    }
    return req
}

API.request.options = (url, isDef = true) => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'OPTIONS',
        params : {}, init : {}, isDef : isDef
    }
    return req
}

API.request.trace = (url, isDef = true) => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'TRACE',
        params : {}, init : {}, isDef : isDef
    }
    return req
}

API.request.patch = (url, isDef = true) => {
    let req = {
        params : obj => params(req, obj),
        headers : obj => headers(req, obj),
        body : obj => body(req, obj),
        options : obj => options(req, obj),
        send : (callback, error) => send(req, callback, error)
    }
    req.send['_data'] = {
        url : url, method : 'PATCH',
        params : {}, init : {}, isDef : isDef
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
    let conf
    if(data.isDef) { conf = API.configure }
    else {
        conf = {
            params : {},
            options : {},
            headers : {},
            body : {}
        }
    }
    // params
    let params = objectAssign(conf.params, data.params || {})
    // init
    let request = objectAssign(conf.options, {})
    // method
    request.method = data.method
    // headers
    request.headers = objectAssign(conf.headers, init.headers || {})
    // body
    if(NOBODY.indexOf(data.method) === -1) {
        request.body = JSON.stringify(objectAssign(conf.body, init.body || {}))
    } else { delete request.body }
    // options
    request = objectAssign(request, data.options || {})
    // create url and add params
    let path
    data.url.indexOf(':') > -1
        ? path = data.url
        : conf.root === ''
            ? path = window.location.toString() + data.url
            : path = conf.root + data.url

    let url = new URL(path)

    let old = new URLSearchParams(url.search).entries()
    let obj = {}
    Array.from(old).forEach(item => obj[item[0]] = item[1])
    params = Object.assign(obj, params)
    url.search = new URLSearchParams(params)
    // request
    API.request(url.toString(), request, callback, error)
    return req
}

export default API