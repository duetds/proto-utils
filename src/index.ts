import { date } from "./date"
import { downloadFile } from "./download-file"
import { sampleData } from "./sample-data"
import { stepperPaginator } from "./stepper-paginator"
import { store } from "./store"
import { themeSwitch } from "./theme-switch"
import { validator } from "./validator"
import { FormValidator } from "./form-validator"

/**
 * @param number
 * @param hideCents
 * @param hideSymbol - if true, uses decimal style instead of currency (no € symbol)
 * @returns a currency sting according to Finnish standard
 */
const currency = (number: number, hideCents: boolean, hideSymbol: boolean = false) => {
  return new Intl.NumberFormat("fi-FI", {
    style: hideSymbol ? "decimal" : "currency",
    ...(hideSymbol ? {} : { currency: "EUR" }),
    minimumFractionDigits: hideCents ? 0 : 2,
    maximumFractionDigits: hideCents ? 0 : 2,
  }).format(number)
}

/**
 * Date Of Birth from Social Security Number (personal identity code)
 * @param ssn
 * @returns ISO date for the ssn
 */
const dobFromSsn = (ssn: string) => {
  const day = ssn.substring(0, 2)
  const month = ssn.substring(2, 4)
  const year = ssn.substring(4, 6)
  const separator = ssn.substring(6, 7)
  const century = separator === "-" ? "19" : "20"
  return `${century}${year}-${month}-${day}`
}

/**
 * Generate an id that is locally unique enough (up to 2^52 ids per ms)
 */
const id = (prefix: string = "proto-id-"): string =>
  `${prefix}${`${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`}`

/**
 * @param param
 * @returns the param from query string
 */
const queryParam = (param: string): string => new URLSearchParams(window.location.search).get(param)

/**
 * Random integer in given range
 * @param min
 * @param max
 * @returns an integer no less than min and no more than max
 */
const rnd = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

/**
 * Upper Case First
 * @param string
 * @returns the string with its first character converted to upper case
 */
const ucFirst = (string: string) => `${string[0].toUpperCase()}${string.slice(1)}`

const ProtoUtils = {
  currency,
  date,
  downloadFile,
  id,
  queryParam,
  rnd,
  sampleData,
  stepperPaginator,
  store,
  str: {
    dobFromSsn,
    ucFirst,
  },
  themeSwitch,
  validator,
  FormValidator,
}

export default ProtoUtils
