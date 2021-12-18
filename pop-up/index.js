import React, { Component } from 'react'
import './index.css'

class PopUp extends Component {

    constructor(props) {
        super(props)
        this.container = React.createRef()
        this.inner = React.createRef()
        this.outer = React.createRef()
        this.state = {
            contentInner : null,
            contentOuter : null,
            showing : false,
            loading : false
        }
    }

    componentDidMount() { this.container.current._this = this }

    render() {
        return (
            <div
                ref={this.container}
                className={getContainerClass(this.props.className)}
            >
                <div
                    ref={this.outer}
                    key="outer"
                    className="rjx-pu-outer"
                >{ this.state.contentOuter }</div>
                <div
                    ref={this.inner}
                    key="inner"
                    className="rjx-pu-inner"
                >{ this.state.contentInner }</div>
            </div>
        )
    }

}

let getContainerClass = name => {
    return name ? name + ' rjx-pu-container' : 'rjx-pu-container'
}

// ==============================================================================

PopUp.find = selector => {
    let _this = document.querySelector(selector)._this
    let obj = {
        open : () => {
            open(_this)
            return obj
        },
        close : () => {
            close(_this)
            return obj
        }
    }
    return obj
}

let open = _this => {
    let view = () => {
        let inner = _this.inner.current.firstElementChild
        let outer = _this.outer.current.firstElementChild
        inner.style.display = 'block'
        outer.style.display = 'block'
        setTimeout(() => {
            outer.style.opacity = '1'
            inner.style.opacity = '1'
            inner.style.transform = 'scale(1)'
        }, 10);
    }
    let time = (_this.props.duration || 300) / 1000
    _this.props.toLoad(data => {
        _this.setState({ contentInner : data }, () => {
            // apply transition
            let inner = _this.inner.current.firstElementChild
            inner.style.transitionDuration = time + 's'
            if(typeof _this.props.toBold === 'function') {
                _this.props.toBold(data => {
                    _this.setState({ contentOuter : data }, () => {
                        // apply transition
                        let outer = _this.outer.current.firstElementChild
                        outer.style.transitionDuration = time + 's'
                        view()
                    })
                })
            } else { view() }
        })
    })
}

let close = _this => {
    let inner = _this.inner.current.firstElementChild
    let outer = _this.outer.current.firstElementChild
    outer.style.opacity = '0'
    inner.style.opacity = '0'
    inner.style.transform = 'scale(0.95)'
    setTimeout(() => {
        outer.style.display = 'none'
        inner.style.display = 'none'
    }, _this.props.duration);
}

export default PopUp