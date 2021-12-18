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

export { argMap, objAsg }