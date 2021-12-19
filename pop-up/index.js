import React, { Component } from 'react'
import './index.css'

class PopUp extends Component {

    constructor(props) {
        super(props)
        this.container = React.createRef()
        this.inner = React.createRef()
        this.outer = React.createRef()
        this.state = {
            contentInner : this.props.innerElement || <div></div>,
            contentOuter : this.props.outerElement || <div></div>
        }
    }

    componentDidMount() {
        this.container.current._this = this
    }

    render() {
        return (
            <div
                ref={this.container}
                className={genPopUpClass(this.props, 'pu')}
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

let genPopUpClass = (props, shortName) => {
    let userClass = props.className
    let rjx_class = `rjx-${shortName}-container`
    return userClass
        ? `${userClass} ${rjx_class}`
        : `${rjx_class}`
}

// ==============================================================================

PopUp.find = selector => {
    let _this = document.querySelector(selector)._this
    let obj = {
        show : () => {
            show(_this)
            return obj
        },
        hide : () => {
            hide(_this)
            return obj
        }
    }
    return obj
}

let show = _this => {
    let inner = _this.props.innerElement || <div></div>
    _this.setState({ contentInner : inner }, () => {
        load(_this)
        let inner = _this.inner.current.firstElementChild
        let outer = _this.outer.current.firstElementChild
        inner.style.display = 'block'
        outer.style.display = 'block'
        setTimeout(() => {
            outer.style.opacity = '1'
            inner.style.opacity = '1'
            inner.style.transform = 'scale(1)'
        }, 10);
    })
}

let load = _this => {
    let child = _this.inner.current.firstElementChild
    child.classList.remove('rjx-loaded')
    child.classList.remove('rjx-preloader-end')
    child.classList.add('rjx-preloader')
    _this.props.toLoad(data => {
        _this.setState({ contentInner : data }, () => {
            child.classList.remove('rjx-loaded')
            child.classList.remove('rjx-preloader-end')
            child.classList.remove('rjx-preloader')
        })
    })
}

let hide = _this => {
    let inner = _this.inner.current.firstElementChild
    let outer = _this.outer.current.firstElementChild
    outer.style.opacity = '0'
    inner.style.opacity = '0'
    inner.style.transform = 'scale(0.95)'
    setTimeout(() => {
        outer.style.display = 'none'
        inner.style.display = 'none'
    }, 300);
}

export default PopUp