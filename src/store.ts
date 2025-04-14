const store = {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key: string) {
    return JSON.parse(localStorage.getItem(key))
  },
  del(key: string) {
    localStorage.removeItem(key)
  },
}

export { store }
