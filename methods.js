let argMap = args => {
    let obj = {
        bigint : [], boolean : [], function : [], number : [],
        object : [], string : [], symbol : [], undefined : []
    }
    Array.from(args).forEach(arg => obj[typeof arg].push(arg))
    return obj
}

let objAsg = (tar, obj) => {
    return (
        Object.assign(
            JSON.parse(JSON.stringify(tar)),
            JSON.parse(JSON.stringify(obj))
        )
    )
}

let genCls = (name, type) => {
    if(name) {
        return name + ` rjx-${type}-container rjx-loading`
    } else {
        return `rjx-${type}-container rjx-loading`
    }
}

let remLod = element => {
    if(element) {
        element.classList.remove('rjx-loading')
        element.classList.add('rjx-loaded')
    }
}

export { argMap, objAsg, genCls, remLod }