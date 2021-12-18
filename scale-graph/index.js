import React, { Component } from 'react'
import SVGBuilder from './svg.builder'

class ScaleGraph extends Component {

    constructor(props) {
        super(props)
        this.container = React.createRef()
        this.state = { graphs : null }
    }

    componentDidMount() {
        this.container.current._this = this
        reload(this)
        window.addEventListener('resize', () => {
            resize(this)
        })
    }

    render() {
        return (
            <div
                ref={this.container}
                className={getClass(this.props.className)}
                style={{
                    width : this.props.width,
                    height : this.props.height
                }}
            ></div>
        )
    }

}

let getClass = name => {
    return name ? name + ' rjx-sg-container' : 'rjx-sg-container'
}

// ============================================================================

ScaleGraph.find = selector => {
    let _this = document.querySelector(selector)._this
    let obj = {
        reload : () => {
            reload(_this)
            return obj
        },
        resize : () => {
            resize(_this)
            return obj
        }
    }
    return obj
}

let reload = _this => {
    _this.props.toLoad(obj => {
        _this.setState({ graphs : obj }, () => {
            resize(_this)
        })
    })
}

let resize = _this => {
    let root = _this.container.current
    let list = _this.state.graphs
    if(root && list) {
        let box = root.getBoundingClientRect()
        root.innerHTML = SVGBuilder({
            width  : parseInt(box.width),
            height : parseInt(box.height),
            count  : list[0].data.length,
            graphs : list
        })
    }
}

export default ScaleGraph