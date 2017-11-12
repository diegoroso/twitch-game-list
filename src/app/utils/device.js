
export const deviceLimit = () => {
    const width = window.innerWidth
    if (width < 480) {
        return 25
    } else if (width < 1025) {
        return 50
    }
    return 100
}
