let getEditor = e => {
    e.preventDefault()
    return (
        e.target
        .parentElement.parentElement
        .querySelector('.rjx-we-textbox-editor')
    )
}

let Undo = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-undo"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('undo')
            }}
        ></div>
    )
}

let Redo = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-redo"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('redo')
            }}
        ></div>
    )
}

let Bold = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-bold"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('bold')
            }}
        ></div>
    )
}

let Italic = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-italic"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('italic')
            }}
        ></div>
    )
}

let Underline = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-underline"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('underline')
            }}
        ></div>
    )
}

let StrikeThrough = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-strikeThrough"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('strikeThrough')
            }}
        ></div>
    )
}

let UnorderedList = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-insertUnorderedList"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('insertUnorderedList')
            }}
        ></div>
    )
}

let OrderedList = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-insertOrderedList"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('insertOrderedList')
            }}
        ></div>
    )
}

let Link = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-createLink"
            onMouseDown={e => {
                let text = getEditor(e)
                let link = window.prompt('Insert URL')
                if(document.activeElement !== text) { text.focus() }
                if(link) {
                    document.execCommand('createLink', false, link)
                }
            }}
        ></div>
    )
}

let Image = key => {
    return (
        <input
            key={key}
            type="file"
            className="rjx-we-tool-insertImage"
            onInput={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                if(e.target.files[0]) {
                    let reader = new FileReader()
                    reader.addEventListener('load', () => {
                        document.execCommand('insertImage', false, reader.result)
                    })
                    reader.readAsDataURL(e.target.files[0])
                    e.target.value = ''
                }
            }}
        ></input>
    )
}

let ForeColor = key => {
    return (
        <input
            key={key}
            type="color"
            className="rjx-we-tool-foreColor"
            onInput={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('foreColor', false, e.target.value)
            }}
        ></input>
    )
}

let BackColor = key => {
    return (
        <input
            key={key}
            type="color"
            className="rjx-we-tool-backColor"
            onInput={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('backColor', false, e.target.value)
            }}
        ></input>
    )
}

let Left = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-justifyLeft rjx-we-tool-active"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('justifyLeft')
            }}
        ></div>
    )
}

let Center = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-justifyCenter"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('justifyCenter')
            }}
        ></div>
    )
}

let Right = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-justifyRight"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('justifyRight')
            }}
        ></div>
    )
}

let Justify = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-justifyFull"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('justifyFull')
            }}
        ></div>
    )
}

let Indent = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-indent"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('indent')
            }}
        ></div>
    )
}

let Outdent = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-outdent"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('outdent')
            }}
        ></div>
    )
}

let Superscript = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-superscript"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('superscript')
            }}
        ></div>
    )
}

let Subscript = key => {
    return (
        <div
            key={key}
            className="rjx-we-tool-subscript"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('subscript')
            }}
        ></div>
    )
}

let RemoveFormat = key => {
    return [
        <div
            key={key + '_1'}
            className="rjx-we-tool-removeFormat"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('removeFormat')
            }}
        ></div>,
        <div
            key={key + '_2'}
            className="rjx-we-tool-removeBackgroundFormat"
            onMouseDown={e => {
                let text = getEditor(e)
                if(document.activeElement !== text) { text.focus() }
                document.execCommand('backColor', false, 'transparent')
            }}
        ></div>
    ]
}

let Extensions = [
    Undo,
    Redo,
    Bold,
    Italic,
    Underline,
    StrikeThrough,
    UnorderedList,
    OrderedList,
    ForeColor,
    BackColor,
    RemoveFormat,
    Link,
    Image,
    Left,
    Center,
    Right,
    Justify,
    Indent,
    Outdent,
    Superscript,
    Subscript
]

export {
    Extensions,
    Undo,
    Redo,
    Bold,
    Italic,
    Underline,
    StrikeThrough,
    UnorderedList,
    OrderedList,
    ForeColor,
    BackColor,
    RemoveFormat,
    Link,
    Image,
    Left,
    Center,
    Right,
    Justify,
    Indent,
    Outdent,
    Superscript,
    Subscript
}