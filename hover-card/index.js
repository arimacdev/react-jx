import React, { Component } from 'react'
import { addPreloader, genClassList, remPreloader } from '../methods'
import './index.css'

class HoverCard extends Component {

    constructor(props) {
        super(props)
        this.container = React.createRef()
        this.state = { content : null, showing : false }
    }

    componentDidMount() {
        this.container.current._this = this
        addEventOnParent(this)
    }

    render() {
        return (
            <div
                ref={this.container}
                className={genClassList(this.props, 'hc')}
            >{ this.state.content }</div>
        )
    }

}

let addEventOnParent = _this => {
    let card = _this.container.current
    let tool = card.parentElement

    // open card and preloader
    tool.addEventListener('mouseenter', event => {
        if(event.target === tool) {
            addPreloader(_this)
            show(_this, event, true)
        }
    })
    // move card wihtout preloader
    tool.addEventListener('mousemove', event => {
        if(event.target === tool) {
            show(_this, event, false)
        }
    })
    // hide card
    tool.addEventListener('mouseout', () => { hide(_this) })
    tool.addEventListener('mouseleave', () => { hide(_this) })
}

let show = (_this, event, preload) => {
    // move with cursor or not
    _this.props.placement ? fixed(_this) : follow(_this, event)
    // fade in card
    let card = _this.container.current
    if(card) {
        card.style.display = 'block'
        setTimeout(() => { card.style.opacity = '1' }, 10);
        // request content
        _this.props.toLoad(content => {
            _this.setState({ content : content, showing : true }, () => {
                if(content === null || content === undefined) { hide(_this) }
                if(preload) { remPreloader(_this) }
            })
        }, event)
    }
}

let hide = _this => {
    // hide card
    let card = _this.container.current
    if(card) {
        card.style.display = 'none'
        card.style.opacity = '0'
    }
}

let follow = (_this, event) => {
    let card = _this.container.current
    if(card) {
        let of = (_this.props.offsetX || 20)
        let oy = (_this.props.offsetY || 20)
        card.style.left = event.offsetX + of + 'px'
        card.style.top = event.offsetY + oy + 'px'
    }
}

let fixed = _this => {
    // vard element
    let card = _this.container.current
    if(card === null) { return }
    // tool element
    let tool = card.parentElement
    if(tool === null) { return }
    // get rects
    let tool_box = tool.getBoundingClientRect()
    let card_box = card.getBoundingClientRect()

    // left
    let l_x = -card_box.width
    let l_y = tool_box.height / 2 - card_box.height / 2
    // right
    let r_x = tool_box.width
    let r_y = l_y
    // top
    let t_x = tool_box.width / 2 - card_box.width / 2
    let t_y = -card_box.height
    // bottom
    let b_x = t_x
    let b_y = tool_box.height

    // offsets
    let ox = parseInt(_this.props.offsetX) || 0
    let oy = parseInt(_this.props.offsetY) || 0

    // final object
    let obj = {
        left : { x : parseInt(l_x - ox), y : parseInt(l_y) },
        right : { x : parseInt(r_x + ox), y : parseInt(r_y) },
        top : { x : parseInt(t_x), y : parseInt(t_y - oy) },
        bottom : { x : parseInt(b_x), y : parseInt(b_y + oy) }
    }

    let arr = _this.props.placement
    if(Array.isArray(arr)) {
        let ok = false
        // possible placement
        arr.forEach(p => {
            if(ok === false) {
                ok = setCardPossible(tool, card, p, obj, false)
            }
        })
        // set first one if impossible
        if(!ok) { setCardPossible(tool, card, arr[0], obj, true) }
    }

}

let setCardPossible = (tool, card, type, obj, override) => {
    let tool_box = tool.getBoundingClientRect()
    let card_box = card.getBoundingClientRect()
    let p = obj[type]
    if(p === undefined) { return false }
    if(!override) {
        if(p.x === undefined || p.y === undefined) { return false }
        let iw = window.innerWidth
        let ih = window.innerHeight
        if(p.x + tool_box.x < 0 || p.y + tool_box.y < 0) { return false }
        if(p.x + card_box.width + tool_box.x > iw) { return false }
        if(p.y + card_box.height + tool_box.y > ih) { return false }
    }
    card.style.left = p.x + 'px'
    card.style.top = p.y + 'px'
    return true
}

export default HoverCard