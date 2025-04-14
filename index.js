import { animation } from "./src/animation.js"
import { date } from "./src/date.js"
import { downloadFile } from "./src/download-file.js"
import { sampleData } from "./src/sample-data.js"
import { stepperPaginator } from "./src/stepper-paginator.js"
import { store } from "./src/store.js"
import { themeSwitch } from "./src/theme-switch.js"
import { Validator as validator } from "./src/validator.js"

// id that is locally unique enough (up to 2^52 ids per ms)
const id = (prefix = "proto-id-") =>
  `${prefix}${`${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`}`
const currency = (number, hideCents) =>
  new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: hideCents ? 0 : 2,
  }).format(number)
const queryParam = param => new URLSearchParams(window.location.search).get(param)
const dobFromSsn = ssn => {
  const day = ssn.substring(0, 2)
  const month = ssn.substring(2, 4)
  const year = ssn.substring(4, 6)
  const separator = ssn.substring(6, 7)
  const century = separator === "-" ? "19" : "20"
  return `${century}${year}-${month}-${day}`
}
const ucFirst = string => `${string[0].toUpperCase()}${string.slice(1)}`
const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const str = {
  dobFromSsn,
  ucFirst,
}
window.ProtoUtils = {
  animation,
  currency,
  date,
  downloadFile,
  id,
  queryParam,
  rnd,
  sampleData,
  stepperPaginator,
  store,
  str,
  themeSwitch,
  validator,
}
themeSwitch.init()
sampleData.init()
