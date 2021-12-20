import React, { Component } from 'react'
import { genClassList } from '../methods'
import './index.css'

class HoverTooltip extends Component {

    constructor(props) {
        super(props)
        this.container = React.createRef()
        this.state = { data : null }
    }

    componentDidMount() {
        this.container.current._this = this
    }

    render() {
        return (
            <div
                ref={this.container}
                className={genClassList(this.props, 'ht')}
            >{ this.state.data }</div>
        )
    }

}

HoverTooltip.hide = () => {
    let root = document.querySelector('.rjx-ht-container')
    if(root) {
        root.style.display = 'none'
        root.style.opacity = '0'
    }
}

HoverTooltip.show = call => {
    let root = document.querySelector('.rjx-ht-container')
    call(inner => {
        if(root) {
            root._this.setState({ data : inner }, () => {
                root.style.display = 'block'
                setTimeout(() => {
                    root.style.opacity = '1'
                }, 10);
            })
        }
    })
}

window.addEventListener('mousemove', event => {
    let root = document.querySelector('.rjx-ht-container')
    if(root) {
        root.style.left = event.pageX + 20 + 'px'
        root.style.top = event.pageY + 20 + 'px'
    }
})

export default HoverTooltip