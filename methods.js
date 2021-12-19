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
    let rjx_class = `rjx-${shortName}-container`
    return userClass
        ? `${userClass} ${rjx_class}`
        : `${rjx_class}`
}

let addPreloader = _this => {
    if(_this.props.preloader !== true) { return }
    let root = _this.container.current
    if(root) {
        root.classList.add('rjx-preloader')
    }
}

let remPreloader = _this => {
    if(_this.props.preloader !== true) { return }
    let root = _this.container.current
    setTimeout(() => {
        if(root) {
            root.classList.add('rjx-preloader-end')
            setTimeout(() => {
                root.classList.remove('rjx-preloader')
                root.classList.remove('rjx-preloader-end')
            }, 300);
        }
    }, 10);
}

export {
    argumentsMap,
    objectAssign,
    genClassList,
    addPreloader,
    remPreloader
}