export const hexToRGB = (hex: string, alpha: number | undefined) => {

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
    } else {
        return `rgba(${r}, ${g}, ${b}, 0)`;
    }

}