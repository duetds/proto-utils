const storageKey = "YRD-proto-sample-data"
const _get = (path: string, obj: {}) => {
  const parts = path.split(".")
  let current = obj

  for (const part of parts) {
    if (!current) return undefined
    current = current[part]
  }
  return current
}
const sampleData = {
  data: null,
  init() {
    this.data = JSON.parse(localStorage.getItem(storageKey) || "{}")
    // @ts-ignore we know DATA exists
    if (this.data.__lastUpdated < window.DATA.built) {
      console.log("Build is more recent that last sample data update, clearing")
      this.data = {}
      this.clear()
    }
    console.log("sampleData init")
  },
  set(path: string, value: any) {
    const _isObj = (maybeObj: any) => {
      if (typeof maybeObj === "object" && !Array.isArray(maybeObj)) return true
      console.error("ProtoUtils.sampleData.set: non-object path:", path, this.data)
      return false
    }
    const parts = path.split(".")
    const target = parts.pop()
    let current = this.data
    for (const part of parts) {
      if (!_isObj(current)) return
      if (!Object.hasOwn(current, part)) {
        current[part] = {}
      }
      current = current[part]
    }
    if (!_isObj(current)) return
    current[target] = value
    this.data.__lastUpdated = Date.now()
    localStorage.setItem(storageKey, JSON.stringify(this.data))
  },
  get(path: string) {
    // @ts-ignore we know DATA exists
    return _get(path, this.data) || _get(path, window.DATA)
  },
  clear() {
    localStorage.removeItem(storageKey)
  },
}

export { sampleData }
