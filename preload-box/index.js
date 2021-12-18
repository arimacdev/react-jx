import React, { Component } from 'react'
import { genCls } from '../methods'
import './index.css'

class PreloadBox extends Component {

    constructor(props) {
        super(props)
        this.state = { child : null }
        this.container = React.createRef()
        this.inner = React.createRef()
    }

    componentDidMount() {
        this.container.current._this = this
        if(typeof this.props.toLoad ==='function') {
            this.props.toLoad(child => {
                this.setState({ child : child }, this.onLoad)
            })
        }
    }
    
    onLoad() {
        // unhide
        let container = this.container.current
        if(container) {
            container.classList.remove('rjx-loading')
            let inner = this.inner.current
            if(inner) {
                inner.style.opacity = '1'
                container.style.backgroundImage = 'none'
            }
        }
        // callback
        if(typeof this.props.onLoad ==='function') {
            this.props.onLoad()
        }
    }

    render() {
        let name = genCls(this.props.className, 'pb')
        if(typeof this.props.toLoad === 'function') {
            return (
                <div ref={this.container} className={name}>
                    <div className="rjx-pb-inner" ref={this.inner}>
                        { this.state.child }
                    </div>
                </div>
            )
        } else {
            return (
                <div ref={this.container} className={name}>
                    <div className="rjx-pb-inner" ref={this.inner}>
                    { this.props.children }
                    </div>
                </div>
            )
        }
    }

}

let loadLoop = () => {
    let arr = Array.from(document.querySelectorAll('.rjx-loaded'))
    arr.forEach(loading => {
        if(loading.parentElement.className === 'rjx-pb-inner') {
            loading.parentElement.parentElement._this.onLoad()
        }
        loading.classList.remove('rjx-loaded')
    })
    requestAnimationFrame(loadLoop)
}

loadLoop()

export default PreloadBox