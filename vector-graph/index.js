import React, { Component } from 'react'
import { addPreloader, genClassList, removePreloader, remPreloader } from '../methods'
import SVGBuilder from './svg.builder'

class VectorGraph extends Component {

    constructor(props) {
        super(props)
        this.container = React.createRef()
        this.state = { graphs : null }
    }

    componentDidMount() {
        this.container.current._this = this
        reload(this, this.props.toLoad)
        window.addEventListener('resize', () => {
            resize(this)
        })
    }

    render() {
        return (
            <div
                ref={this.container}
                className={genClassList(this.props, 'vg')}
                style={{
                    width : this.props.width,
                    height : this.props.height
                }}
            ></div>
        )
    }

}

// ============================================================================

VectorGraph.find = selector => {
    console.log(1)
    let _this = document.querySelector(selector)._this
    let obj = {
        reload : (toLoad) => {
            reload(_this, toLoad)
            return obj
        },
        resize : () => {
            resize(_this)
            return obj
        }
    }
    return obj
}

let reload = (_this, call) => {
    addPreloader(_this)
    call(obj => {
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
        remPreloader(_this)
    }
}

export default VectorGraph