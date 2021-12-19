let generateRandom = (range, count) => {
    let arr = []
    for(let i = 0; i < count; i++) {
      arr.push(
        range[0] + Math.floor(Math.random() * (range[1] - range[0]))
      )
    }
    return arr
  }

  let cssObj = obj => {
    let css = ''
    Object.keys(obj).forEach(key => {
      css += `${cssKey(key)}: ${obj[key]}; `
    })
    return css
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
  
    let crX = (data.type === 'line')
      ? -(dtX - dtX * 0.3) / 2
      : dtX - (dtX - dtX * 0.3) / 2

    let crY = gdata.height
  
    if(data.type === 'line') {
      arr.forEach(itm => {
        let val = (gdata.height - (itm * data.scale))
        if(val < 0) { val = 0 }
        svg += `<line `
        svg += `x1="${crX}" y1="${crY}" `
        svg += `x2="${crX + dtX}" y2="${val}"`
        svg += ` style="${cssObj(data.style)}"></line>`

        crX += dtX
        crY = val
      })

      // ground the endpoint
      svg += `<line x1="${crX}" y1="${crY}" `
      svg += `x2="${crX + dtX}" y2="${gdata.height}" `
      svg += `style="${cssObj(data.style)}"></line>`

    }
  
    if(data.type === 'bar') {
      arr.forEach(itm => {

        let rect_w = dtX - dtX * 0.3
        let rect_h = itm * data.scale

        let rect_x = crX - rect_w / 2
        let rect_y = gdata.height - (itm * data.scale)

        svg += `<rect `
        svg += `x="${rect_x}" y="${rect_y}" `
        svg += `width="${rect_w}" height="${rect_h}" `
        svg += ` style="${cssObj(data.style)}"></rect>`
        crX += dtX
        crY = rect_y

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