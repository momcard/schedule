export const justifyContent = (val: "left" | "center" | "right" | undefined) => {

    switch (val) {
        case 'left':
            return 'flex-start'
        case 'center':
            return 'center'
        case 'right':
            return 'flex-end'
        default :
            return 'center'

    }
}