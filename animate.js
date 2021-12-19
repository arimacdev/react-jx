let preloadElementCleck = () => {
    let arr = Array.from(document.querySelectorAll('.rjx-loaded'))
    arr.forEach(loading => {
        loading.classList.remove('rjx-loaded')
        loading.classList.add('rjx-preloader-end')
        setTimeout(() => {
            loading.classList.remove('rjx-preloader')
            loading.classList.remove('rjx-preloader-end')
        }, 3000);
    })
    requestAnimationFrame(preloadElementCleck)
}

preloadElementCleck()