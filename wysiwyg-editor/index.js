import React, { Component } from 'react'
import './index.css'
import checkExtensions from './extensions/state'
import { Extensions } from './extensions'
import { genClassList, remPreloader } from '../methods'

let getContainer = _this => {
    return _this.container.current
}

let getEditor = _this => {
    return getContainer(_this).querySelector('.rjx-we-textbox-editor')
}

class WYSIWYGEditor extends Component {

    constructor(props) {
        super(props)
        this.container = React.createRef()
    }

    componentDidMount() {
        if(typeof this.props.toLoad === 'function') {
            let root = getContainer(this)
            let text = getEditor(this)
            this.props.toLoad(content => {
                text.innerHTML = content
                checkExtensions(root)
                remPreloader(this.container.current)
            })
        }
    }

    onInput() {
        let root = getContainer(this)
        let text = getEditor(this)
        checkExtensions(root)
        if(typeof this.props.onInput === 'function') {
            this.props.onInput(text.innerHTML)
        }
    }

    render() {
        let text = { __html : this.props.content || '' }
        let hold = this.props.placeholder || 'Type here...'
        return (
            <div ref={this.container} className={genClassList(this.props, 'we')}>
                <div className="rjx-we-toolbox">
                    { (this.props.extensions || Extensions).map((ext, i) => ext(i)) }
                </div>
                <div className="rjx-we-textbox">
                    <div className="rjx-we-textbox-holder">{ hold }</div>
                    <div
                        className="rjx-we-textbox-editor"
                        dangerouslySetInnerHTML={ text }
                        onInput={ () => this.onInput() }
                        spellCheck="false"
                        contentEditable
                    ></div>
                </div>
            </div>
        )
    }

}

export default WYSIWYGEditor