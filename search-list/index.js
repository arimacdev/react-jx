import React, { Component } from 'react'
import { genClassList } from '../methods'

class SearchList extends Component {

    constructor(props) {
        super(props)
        this.container = React.createRef()
        this.state = {
            items : [],
            query : this.props.query,
            loading : false
        }
    }

    componentDidMount() {
        this.toLoad()
        this.container.current._this = this
        window.addEventListener('resize', () => {
            this.checkOverflow()
        })
    }

    toLoad() {
        if(this.state.loading) { return }
        this.setState({ loading : true }, () => {
            let query = this.state.query
            let count = this.state.items.length
            this.props.toLoad(query, count, (resp) => {
                if(this.state.loading === false) { return }
                if(typeof resp === 'object') {
                    let arr = this.state.items
                    if(Array.isArray(resp)) {
                        arr = arr.concat(resp)
                    } else { arr.push(resp) }
                    this.setState({ items : arr, loading : false }, () => {
                        this.onLoad()
                        this.checkOverflow()
                    })
                } else {
                    this.setState({ items : [], loading : false })
                }
            })
        })
    }

    onLoad() {
        let callback = this.props.onLoad
        if(typeof callback === 'function') { callback() }
    }

    checkOverflow() {
        let container = this.container.current
        if(container !== null) {
            let x = container.scrollHeight - container.scrollTop
            let h = container.getBoundingClientRect().height
            if(x - h < (this.props.loadHeight || 200)) { this.toLoad() }
        }
    }

    render() {
        return (
            <div
                id={this.props.id}
                ref={this.container}
                style={{ overflowY: 'auto' }}
                className={genClassList(this.props, 'sl')}
                onScroll={() => { this.checkOverflow() }}
            >{ this.state.items }</div>
        )
    }

}

// ====================================================================

SearchList.find = selector => {
    let _this = document.querySelector(selector)._this
    let obj = {
        updateQueryByInputEvent : event => {
            updateQueryByInputEvent(_this, event)
            return obj
        },
        updateQueryByDataObject : input => {
            updateQueryByDataObject(_this, input)
            return obj
        },
        reloadList : () => {
            reloadList(_this)
            return obj
        }
    }
    return obj
}

let updateQueryByInputEvent = (_this, event) => {
    let key = event.target.name
    let val = event.target.value
    let obj = _this.state.query
    obj[key] = val
    _this.setState({ query : obj }, () => { reloadList(_this) })
}

let updateQueryByDataObject = (_this, input) => {
    let obj = _this.state.query
    Object.keys(input).forEach(key => { obj[key] = input[key] })
    _this.setState({ query : obj }, () => { reloadList(_this) })
}

let reloadList = _this => {
    _this.setState({ items : [], loading : false }, _this.toLoad)
}

export default SearchList