let argumentsMap = args => {
    let obj = {
        bigint : [], boolean : [], function : [], number : [],
        object : [], string : [], symbol : [], undefined : []
    }
    Array.from(args).forEach(arg => obj[typeof arg].push(arg))
    return obj
}

let objectAssign = (tar, obj) => {
    return (
        Object.assign(
            JSON.parse(JSON.stringify(tar)),
            JSON.parse(JSON.stringify(obj))
        )
    )
}

let genClassList = (props, shortName) => {
    let userClass = props.className
    let preloader = props.preloader
    let rjx_class = `rjx-${shortName}-container`
    let pre_loads = preloader && props.toLoad ? ' rjx-preloader' : ''
    return userClass
        ? `${userClass} ${rjx_class} ${pre_loads}`
        : `${rjx_class} ${pre_loads}`
}

let removePreloader = element => {
    if(element) {
        element.classList.add('rjx-loaded')
    }
}

export {
    argumentsMap,
    objectAssign,
    genClassList,
    removePreloader
}