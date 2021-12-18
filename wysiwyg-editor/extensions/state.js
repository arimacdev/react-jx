let getCommand = x => document.queryCommandValue(x)

let setExtensionState = (container, command) => {
    let ext  = container.querySelector('.rjx-we-tool-' + command)
    if(ext === null) { return }
    getCommand(command) === 'true'
        ? ext.classList.add('rjx-we-tool-active')
        : ext.classList.remove('rjx-we-tool-active')
}

let checkExtensions = container => {
    // control buttons
    setExtensionState(container, 'bold')
    setExtensionState(container, 'italic')
    setExtensionState(container, 'underline')
    setExtensionState(container, 'strikeThrough')
    setExtensionState(container, 'insertUnorderedList')
    setExtensionState(container, 'insertOrderedList')
    setExtensionState(container, 'justifyLeft')
    setExtensionState(container, 'justifyCenter')
    setExtensionState(container, 'justifyRight')
    setExtensionState(container, 'justifyFull')
    setExtensionState(container, 'superscript')
    setExtensionState(container, 'subscript')
    // placeholder
    let text = container.querySelector('.rjx-we-textbox-editor')
    let hold = container.querySelector('.rjx-we-textbox-holder')
    if(text.innerHTML.indexOf('l>') > -1 || text.innerHTML.indexOf('<h') > -1) {
        hold.style.visibility = 'hidden'
    } else {
        if(text.innerText.replace('\n', '') === '') {
            hold.style.visibility = 'visible'
            if(getCommand('justifyLeft') === 'true') {
                hold.style.textAlign = 'left'
            } else if(getCommand('justifyCenter') === 'true') {
                hold.style.textAlign = 'center'
            } else if(getCommand('justifyRight') === 'true') {
                hold.style.textAlign = 'right'
            } else {
                hold.style.textAlign = 'left'
            }
        } else {
            hold.style.visibility = 'hidden'
        }
    }
}

export default checkExtensions