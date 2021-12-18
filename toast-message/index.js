import React, { Component } from 'react'
import './index.css'

class ToastMessage extends Component {

    constructor(props) {
        super(props)
        this.container = React.createRef()
    }

    componentDidMount() {
        this.container.current._this = this
        setContainerHeight()
    }

    render() {
        return (
            <div
                ref={this.container}
                className="rjx-tm-container"
                style={{ left : this.props.offsetX + 'px' }}
            ></div>
        )
    }

}

let getContainer = () => {
    let root = document.querySelector('.rjx-tm-container')
    if(root) {
        return document.querySelector('.rjx-tm-container')
    }
}

let buildSection = (data, type) => {
    let html = `<div class="rjx-tm-${type}">`
    html += `<div class="rjx-tm-${type}-text">`
    html += data.text || 'Untitled Message'
    html += `</div>`
    html += `</div>`
    return html
}

let buildIcon = file => {
    let html = `<div class="rjx-tm-icon`
    if(file.indexOf('ToastMessageIcon:') === 0) {
        html += ` ${file.split(':')[1]}"></div>`
    } else {
        html += `" style="background-image: url(${file});"></div>`
    }
    return html
}

ToastMessage.append = data => {
    let item = document.createElement('div')
    item.className = 'rjx-tm-message rjx-tm-message-' + (data.type || 'info')
    // icon
    if(data.icon) {
        item.innerHTML += buildIcon(data.icon)
        item.className += ' rjx-tm-message-icon-space'
    }
    // head and body
    if(data.head) { item.innerHTML += buildSection(data.head, 'head') }
    if(data.body) { item.innerHTML += buildSection(data.body, 'body') }
    // append
    if(data.time === undefined) { data.time = {} }
    setTimeout(() => {
        getContainer().appendChild(item)
        setContainerHeight()
        setTimeout(() => {
            clearToast(item)
        }, data.time.clear || 5000)
    }, data.time.delay || 0)
}

// ===========================================================================

let setContainerHeight = () => {
    let root = getContainer()
    if(root) {
        let size = window.innerHeight - root.getBoundingClientRect().height
        let offs = parseInt(root._this.props.offsetY || 0)
        root.style.top = size + 13 - offs + 'px'
    }
}

window.addEventListener('resize', setContainerHeight)

// ===========================================================================

let clearToast = item => {
    item.style.opacity = 0
    setTimeout(() => {
        item.remove()
        let root = getContainer()
        if(root) {
            let size = window.innerHeight - root.getBoundingClientRect().height
            let offs = parseInt(root._this.props.offsetY || 0)
            root.style.transition = 'none'
            root.style.top = size + 13 - offs + 'px'
            setTimeout(() => { root.style.transition = 'top 0.5s' }, 300)
        }
    }, 300)
}

ToastMessage.clearAll = () => {
    let list = getContainer().querySelectorAll('.rjx-tm-message')
    Array.from(list).forEach(clearToast)
}

// ===========================================================================

ToastMessage.TYPES = {
    ERROR : 'error',
    INFO : 'info',
    WARNING : 'warning'
}

ToastMessage.ICONS = {
    ERROR : 'ToastMessageIcon:rjx-tm-icon-error',
    INFO : 'ToastMessageIcon:rjx-tm-icon-info',
    WARNING : 'ToastMessageIcon:rjx-tm-icon-warning'
}

export default ToastMessage