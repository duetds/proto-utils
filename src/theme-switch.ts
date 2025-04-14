const themeSwitch = {
  set(theme: string) {
    if (theme === "turva") {
      // @ts-ignore
      window.turvaTheme = true
      document.documentElement.classList.add("duet-theme-turva")
    } else {
      // @ts-ignore
      window.turvaTheme = false
      document.documentElement.classList.remove("duet-theme-turva")
    }

    const hydratedElements = document.querySelectorAll(".hydrated")
    if (hydratedElements?.[0]) {
      hydratedElements.forEach(el => {
        el.setAttribute("theme", theme)
      })
    }

    const buttonText = theme === "turva" ? "LähiTapiola teema" : "Turva teema"
    document.getElementById("themeSwitchToggle").innerText = buttonText
  },
  swap() {
    // @ts-ignore
    const current = ProtoUtils.store.get("theme") || ""
    const next = current === "turva" ? "" : "turva"
    // @ts-ignore
    ProtoUtils.store.set("theme", next)
    this.set(next)
  },
  init() {
    // @ts-ignore
    const current = ProtoUtils.store.get("theme") || ""
    this.set(current)
  },
}

export { themeSwitch }
