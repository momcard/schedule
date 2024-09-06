export function setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key: string) {
    const res = localStorage.getItem(key);
    if (!res) return null
    return JSON.parse(res);
}