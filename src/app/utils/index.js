
export const deviceLimit = () => {
    const width = window.innerWidth
    if (width < 480) {
        return 25
    } else if (width < 1025) {
        return 50
    }
    return 100
}

export const numberPattern = number => {
    if (number === undefined) {
        return 0
    }
    if (number.toString().length > 3) {
        return (number / 100).toFixed(3)
    }
    return number
}
