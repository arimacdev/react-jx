let generateRandom = (range, count) => {
    let arr = []
    for(let i = 0; i < count; i++) {
      arr.push(
        range[0] + Math.floor(Math.random() * (range[1] - range[0]))
      )
    }
    return arr
  }
  
  let cssKey = x => {
      let k = ''
      Array.from(x).forEach(c => {
          if(c.toUpperCase() === c) {
              k += '-' + c.toLowerCase()
          } else {  k += c }
      })
      return k
  }
  
  let generateSingle = (dtX, data, gdata) => {
    let svg = ``
  
    let arr = data.data || generateRandom(data.random, gdata.count)
  
    let crX = 0
    let crY = gdata.height
  
    if(data.type === 'line') {
      arr.forEach(itm => {
        let val = (gdata.height - (itm * data.scale))
        if(val < 0) { val = 0 }
        svg += `<line `
        svg += `x1="${crX}" y1="${crY}" `
        svg += `x2="${crX + dtX}" y2="${val}"`
        svg += ` style="`
        Object.keys(data.style).forEach(key => {
          svg += `${cssKey(key)}: ${data.style[key]}; `
        })
        svg += `"></line>`
        crX += dtX
        crY = val
      })
    }
  
    if(data.type === 'bar') {
      arr.forEach(itm => {
        let val = (gdata.height - (itm * data.scale))
        svg += `<rect `
        svg += `x="${crX}" y="${val}" `
        svg += `width="${dtX - dtX * 0.3}" height="${itm * data.scale}" `
        svg += ` style="`
        Object.keys(data.style).forEach(key => {
          svg += `${key}: ${data.style[key]}; `
        })
        svg += `"></rect>`
        crX += dtX
        crY = val
      })
    }
  
    return svg
  }
  
  let SVGBuilder = data => {
      let svg  = `<svg width="${data.width}" height="${data.height}">`
      let dtX = data.width / data.count
      data.graphs.forEach((obj) => { svg += generateSingle(dtX, obj, data) })
      return svg + `</svg>`
  }
  
  export default SVGBuilder