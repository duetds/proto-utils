var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/finnish-ssn/dist/finnish-ssn.js
var require_finnish_ssn = __commonJS({
  "node_modules/finnish-ssn/dist/finnish-ssn.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FinnishSSN = void 0;
    var Sex;
    (function(Sex2) {
      Sex2["FEMALE"] = "female";
      Sex2["MALE"] = "male";
    })(Sex || (Sex = {}));
    var FinnishSSN2 = class {
      /**
       * Parse parameter given SSN string into Object representation.
       * @param ssn - {String} SSN to parse
       */
      static parse(ssn) {
        if (!SSN_REGEX.test(ssn)) {
          throw new Error("Not valid SSN format");
        }
        const dayOfMonth = parseInt(ssn.substring(0, 2), 10);
        const month = ssn.substring(2, 4);
        const centuryId = ssn.charAt(6);
        const year = parseInt(ssn.substring(4, 6), 10) + centuryMap.get(centuryId);
        const rollingId = ssn.substring(7, 10);
        const checksum = ssn.substring(10, 11);
        const sex = parseInt(rollingId, 10) % 2 ? this.MALE : this.FEMALE;
        const daysInMonth = daysInGivenMonth(year, month);
        if (!daysInMonthMap.get(month) || dayOfMonth > daysInMonth) {
          throw new Error("Not valid SSN");
        }
        const checksumBase = parseInt(ssn.substring(0, 6) + rollingId, 10);
        const dateOfBirth = new Date(year, parseInt(month, 10) - 1, dayOfMonth, 0, 0, 0, 0);
        const today2 = /* @__PURE__ */ new Date();
        return {
          valid: checksum === checksumTable[checksumBase % 31],
          sex,
          dateOfBirth,
          ageInYears: ageInYears(dateOfBirth, today2)
        };
      }
      /**
       * Validates parameter given SSN. Returns true if SSN is valid, otherwise false.
       * @param ssn - {String} For example '010190-123A'
       */
      static validate(ssn) {
        try {
          return this.parse(ssn).valid;
        } catch (error) {
          return false;
        }
      }
      /**
       * Creates a valid SSN using the given age (Integer). Creates randomly male and female SSN'n.
       * In case an invalid age is given, throws exception.
       *
       * @param age as Integer. Min valid age is 1, max valid age is 200
       */
      static createWithAge(age) {
        if (age < MIN_AGE || age > MAX_AGE) {
          throw new Error(`Given age (${age}) is not between sensible age range of ${MIN_AGE} and ${MAX_AGE}`);
        }
        const today2 = /* @__PURE__ */ new Date();
        let year = today2.getFullYear() - age;
        const month = randomMonth();
        let dayOfMonth = randomDay(year, month);
        const rollingId = randomNumber(800) + 99;
        if (!birthDayPassed(new Date(year, Number(month) - 1, Number(dayOfMonth)), today2)) {
          if (this.isLeapYear(year)) {
            if (dayOfMonth === "29" && month === february) {
              dayOfMonth = "28";
            }
          }
          year--;
        }
        const possibleCenturySigns = [];
        centuryMap.forEach((value, key) => {
          if (value === Math.floor(year / 100) * 100) {
            possibleCenturySigns.push(key);
          }
        });
        const centurySign = possibleCenturySigns[Math.floor(Math.random() * possibleCenturySigns.length)];
        year = year % 100;
        const yearString = yearToPaddedString(year);
        const checksumBase = parseInt(dayOfMonth + month + yearString + rollingId, 10);
        const checksum = checksumTable[checksumBase % 31];
        return dayOfMonth + month + yearString + centurySign + rollingId + checksum;
      }
      static isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }
    };
    exports2.FinnishSSN = FinnishSSN2;
    FinnishSSN2.FEMALE = Sex.FEMALE;
    FinnishSSN2.MALE = Sex.MALE;
    var centuryMap = /* @__PURE__ */ new Map();
    centuryMap.set("F", 2e3);
    centuryMap.set("E", 2e3);
    centuryMap.set("D", 2e3);
    centuryMap.set("C", 2e3);
    centuryMap.set("B", 2e3);
    centuryMap.set("A", 2e3);
    centuryMap.set("U", 1900);
    centuryMap.set("V", 1900);
    centuryMap.set("W", 1900);
    centuryMap.set("X", 1900);
    centuryMap.set("Y", 1900);
    centuryMap.set("-", 1900);
    centuryMap.set("+", 1800);
    var february = "02";
    var daysInMonthMap = /* @__PURE__ */ new Map();
    daysInMonthMap.set("01", 31);
    daysInMonthMap.set("02", 28);
    daysInMonthMap.set("03", 31);
    daysInMonthMap.set("04", 30);
    daysInMonthMap.set("05", 31);
    daysInMonthMap.set("06", 30);
    daysInMonthMap.set("07", 31);
    daysInMonthMap.set("08", 31);
    daysInMonthMap.set("09", 30);
    daysInMonthMap.set("10", 31);
    daysInMonthMap.set("11", 30);
    daysInMonthMap.set("12", 31);
    var checksumTable = "0123456789ABCDEFHJKLMNPRSTUVWXY".split("");
    var MIN_AGE = 1;
    var MAX_AGE = 200;
    var SSN_REGEX = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d\+|\d\d[-U-Y]|[012]\d[A-F])\d{3}[\dA-Z]$/;
    function randomMonth() {
      return `00${randomNumber(12)}`.substr(-2, 2);
    }
    function yearToPaddedString(year) {
      return year % 100 < 10 ? `0${year}` : year.toString();
    }
    function randomDay(year, month) {
      const maxDaysInMonth = daysInGivenMonth(year, month);
      return `00${randomNumber(maxDaysInMonth)}`.substr(-2, 2);
    }
    function daysInGivenMonth(year, month) {
      const daysInMonth = daysInMonthMap.get(month);
      return month === february && FinnishSSN2.isLeapYear(year) ? daysInMonth + 1 : daysInMonth;
    }
    function randomNumber(max) {
      return Math.floor(Math.random() * max) + 1;
    }
    function ageInYears(dateOfBirth, today2) {
      return today2.getFullYear() - dateOfBirth.getFullYear() - (birthDayPassed(dateOfBirth, today2) ? 0 : 1);
    }
    function birthDayPassed(dateOfBirth, today2) {
      return dateOfBirth.getMonth() < today2.getMonth() || dateOfBirth.getMonth() === today2.getMonth() && dateOfBirth.getDate() <= today2.getDate();
    }
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/date.ts
var dayInMS = 24 * 60 * 60 * 1e3;
var today = /* @__PURE__ */ new Date();
var tomorrow = new Date(today.getTime() + dayInMS);
var yesterday = new Date(today.getTime() - dayInMS);
var isDate = (date2) => typeof date2.getMonth === "function";
var zeroPad = (num) => String(num).padStart(2, "0");
var date2ISO = (date2) => date2.toISOString().split("T")[0];
var date2Local = (date2) => date2.toLocaleDateString("fi");
var date2LocalShortMonth = (date2) => date2.toLocaleDateString("fi", { month: "short" });
var date2LocalShortDay = (date2) => date2.toLocaleDateString("fi", { day: "numeric" });
var addDaysToDate = (baseDate, days, format = "ISO") => {
  const isoDate = isDate(baseDate) ? date2ISO(baseDate) : string2ISO(baseDate);
  const date2 = new Date(new Date(isoDate).getTime() + dayInMS * days);
  if (format === "ISO") {
    return date2ISO(date2);
  }
  if (format === "local") {
    return date2Local(date2);
  }
  return date2;
};
var dateFromToday = (daysFromToday, format = "ISO") => {
  return addDaysToDate(today, daysFromToday, format);
};
var isISO = (string) => !!string && /^\d{4}-\d{2}-\d{2}$/.test(string);
var ISO2Local = (string) => string && date2Local(new Date(string));
var ISO2LocalShortMonth = (string) => date2LocalShortMonth(new Date(string));
var ISO2LocalShortDay = (string) => date2LocalShortDay(new Date(string));
var ISO2LocalRange = (dateObj) => `${ISO2Local((dateObj == null ? void 0 : dateObj.startDate) || "")} - ${ISO2Local((dateObj == null ? void 0 : dateObj.endDate) || "")}`;
var local2ISO = (string) => string.split(".").map((n) => n.padStart(2, "0")).reverse().join("-");
var ISO = {
  today: date2ISO(today),
  tomorrow: date2ISO(tomorrow),
  yesterday: date2ISO(yesterday)
};
var current = {
  year: Number.parseInt(ISO.today.split("-")[0]),
  month: Number.parseInt(ISO.today.split("-")[1]),
  day: Number.parseInt(ISO.today.split("-")[2])
};
var string2ISO = (string) => {
  if (!string) {
    return "";
  }
  if (isISO(string)) {
    return string;
  }
  if (/^[+-]?\d+$/.test(string)) {
    return dateFromToday(Number.parseInt(string), "ISO");
  }
  const [number, unit, date2] = string.split(" ");
  if (!unit || !/^[+-]?\d+$/.test(number)) {
    return "";
  }
  if (unit.toLowerCase().startsWith("month")) {
    const baseDate = /* @__PURE__ */ new Date();
    if ((date2 == null ? void 0 : date2.toLowerCase()) === "first") {
      baseDate.setDate(15);
      return date2ISO(new Date(baseDate.setMonth(baseDate.getMonth() + Number.parseInt(number), 1)));
    }
    if ((date2 == null ? void 0 : date2.toLowerCase()) === "last") {
      baseDate.setDate(15);
      const nextMonthFirst = new Date(baseDate.setMonth(baseDate.getMonth() + Number.parseInt(number) + 1, 1));
      return date2ISO(new Date(nextMonthFirst.getTime() - dayInMS));
    }
    return date2ISO(new Date(baseDate.setMonth(baseDate.getMonth() + Number.parseInt(number))));
  }
  if (unit.toLowerCase().startsWith("year")) {
    if ((date2 == null ? void 0 : date2.toLowerCase()) === "start") {
      return `${current.year + Number.parseInt(number)}-01-01`;
    }
    if ((date2 == null ? void 0 : date2.toLowerCase()) === "end") {
      return `${current.year + Number.parseInt(number)}-12-31`;
    }
    return `${current.year + Number.parseInt(number)}-${zeroPad(current.month)}-${zeroPad(current.day)}`;
  }
  if (unit.toLowerCase().startsWith("day")) {
    return dateFromToday(Number.parseInt(number), "ISO");
  }
  return "";
};
var string2Local = (string) => ISO2Local(string2ISO(string));
var date = {
  ISO,
  ISO2Local,
  ISO2LocalRange,
  ISO2LocalShortDay,
  ISO2LocalShortMonth,
  addDaysToDate,
  current,
  date2ISO,
  date2Local,
  date2LocalShortDay,
  date2LocalShortMonth,
  dateFromToday,
  dayInMS,
  isISO,
  local2ISO,
  string2ISO,
  string2Local,
  today,
  tomorrow,
  yesterday
};

// src/download-file.ts
var downloadFile = (url, fileName) => {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.download = fileName || url.split("/").pop();
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    link.parentNode.removeChild(link);
  }, 0);
};

// src/sample-data.ts
var storageKey = "YRD-proto-sample-data";
var _get = (path, obj) => {
  const parts = path.split(".");
  let current2 = obj;
  for (const part of parts) {
    if (!current2) return void 0;
    current2 = current2[part];
  }
  return current2;
};
var sampleData = {
  data: null,
  init() {
    this.data = JSON.parse(localStorage.getItem(storageKey) || "{}");
    if (this.data.__lastUpdated < window.DATA.built) {
      console.log("Build is more recent that last sample data update, clearing");
      this.data = {};
      this.clear();
    }
    console.log("sampleData init");
  },
  set(path, value) {
    const _isObj = (maybeObj) => {
      if (typeof maybeObj === "object" && !Array.isArray(maybeObj)) return true;
      console.error("ProtoUtils.sampleData.set: non-object path:", path, this.data);
      return false;
    };
    const parts = path.split(".");
    const target = parts.pop();
    let current2 = this.data;
    for (const part of parts) {
      if (!_isObj(current2)) return;
      if (!Object.hasOwn(current2, part)) {
        current2[part] = {};
      }
      current2 = current2[part];
    }
    if (!_isObj(current2)) return;
    current2[target] = value;
    this.data.__lastUpdated = Date.now();
    localStorage.setItem(storageKey, JSON.stringify(this.data));
  },
  get(path) {
    return _get(path, this.data) || _get(path, window.DATA);
  },
  clear() {
    localStorage.removeItem(storageKey);
  }
};

// src/stepper-paginator.ts
var MAX_PAGE_SIZE = 40;
var stepperPaginator = (elementOrName, items, config = {}) => {
  let stepperElement;
  if (typeof elementOrName === "string") {
    stepperElement = document.getElementById(`${elementOrName}-pagination-stepper`);
    if (!stepperElement) {
      throw new Error(`Paginator container not found with name: ${elementOrName}`);
    }
  } else if (elementOrName instanceof HTMLElement) {
    stepperElement = elementOrName;
  } else {
    throw new Error("Paginator needs either a container element or a name string");
  }
  return {
    allItems: items,
    displayItems: [],
    displayPage: [],
    pageSize: config.pageSize || 10,
    total: items.length,
    index: 1,
    paginationStepper: stepperElement.querySelector(".pagination-step"),
    paginationSizer: stepperElement.querySelector(".pagination-size"),
    setPaginationSizeItems() {
      const optionCount = Math.ceil(this.total / 10);
      const items2 = [];
      if (config.show5Size || config.pageSize < 10) {
        items2.push({
          label: "5",
          value: "5"
        });
      }
      for (let i = 1; i < optionCount && i * 10 <= MAX_PAGE_SIZE; i++) {
        items2.push({
          label: `${i}0`,
          value: `${i}0`
        });
      }
      this.paginationSizer.items = items2;
    },
    setPage() {
      this.displayPage = this.displayItems.slice((this.index - 1) * this.pageSize, this.index * this.pageSize);
    },
    checkPageIndex() {
      if (this.total < this.index * this.pageSize) {
        const index = Math.floor(this.total / this.pageSize) || 1;
        this.index = index;
        this.paginationStepper.stepIndex = index;
      }
    },
    changePageSize(event) {
      this.pageSize = event.detail.value * 1;
      this.checkPageIndex();
      this.setPage();
    },
    changePage(event) {
      this.index = event.detail.index;
      this.setPage();
    },
    filterList() {
      this.displayItems = this.allItems.filter(config.filtering);
      this.total = this.displayItems.length;
      this.checkPageIndex();
      this.setPaginationSizeItems();
      this.setPage();
    },
    init() {
      this.displayItems = this.allItems;
      this.index = 1;
      this.paginationStepper.stepIndex = 1;
      this.setPaginationSizeItems();
      this.setPage();
    }
  };
};

// src/store.ts
var store = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  del(key) {
    localStorage.removeItem(key);
  }
};

// src/theme-switch.ts
var themeSwitch = {
  set(theme) {
    if (theme === "turva") {
      window.turvaTheme = true;
      document.documentElement.classList.add("duet-theme-turva");
    } else {
      window.turvaTheme = false;
      document.documentElement.classList.remove("duet-theme-turva");
    }
    const hydratedElements = document.querySelectorAll(".hydrated");
    if (hydratedElements == null ? void 0 : hydratedElements[0]) {
      hydratedElements.forEach((el) => {
        el.setAttribute("theme", theme);
      });
    }
    const buttonText = theme === "turva" ? "L\xE4hiTapiola teema" : "Turva teema";
    const toggle = document.getElementById("themeSwitchToggle");
    if (toggle) {
      toggle.innerText = buttonText;
    }
  },
  swap() {
    const current2 = ProtoUtils.store.get("theme") || "";
    const next = current2 === "turva" ? "" : "turva";
    ProtoUtils.store.set("theme", next);
    this.set(next);
  },
  init() {
    const current2 = ProtoUtils.store.get("theme") || "";
    this.set(current2);
  }
};

// src/validator.ts
var finnishSSNModule = __toESM(require_finnish_ssn());
var validator = {
  /**
   * Basic email validation
   *
   * @param email - The email to validate
   * @returns True if the email is valid, false otherwise
   */
  isValidEmail(email) {
    if (!email) return false;
    return /^[a-zA-Z0-9\._\-]+@[a-zA-Z0-9\._\-]+\.[a-zA-Z]{2,6}$/.test(email);
  },
  /**
   * Basic phone validation
   * Checks it starts with + and has some numbers
   *
   * @param phone - The phone number to validate
   * @returns True if the phone number is valid, false otherwise
   */
  isValidPhoneNumber(phone) {
    if (!phone) return false;
    return phone.startsWith("+") && phone.length > 3;
  },
  /**
   * Finnish SSN validation using 3rd party library
   *
   * @param ssn - The SSN to validate
   * @param strict - Whether to use the strict validation
   * @returns True if the SSN is valid, false otherwise
   */
  isValidFinnishSSN(ssn, strict = false) {
    if (!ssn) return false;
    return strict ? finnishSSNModule.FinnishSSN.validate(ssn) : /^\d{6}[\+\-aA]\d{3}[\da-zA-Z]$/.test(ssn);
  },
  /**
   * Basic business ID validation
   * Checks the format XXXXXXX-X
   *
   * @param businessId - The business ID to validate
   * @returns True if the business ID is valid, false otherwise
   */
  isValidBusinessId(businessId) {
    if (!businessId) return false;
    return /^\d{7}-\d$/.test(businessId);
  },
  /**
   * Basic date validation
   * Checks if the string can be parsed as a date
   *
   * @param dateStr - The date string to validate
   * @returns True if the date string is valid, false otherwise
   */
  isValidDate(dateStr) {
    if (!dateStr) return false;
    const date2 = new Date(dateStr);
    return !Number.isNaN(date2.getTime());
  }
};

// src/form-validator.ts
var FormValidator = class _FormValidator {
  static create(options) {
    return new _FormValidator(options);
  }
  formFields;
  validatorFunctions;
  errorMessages;
  submitErrorMessage;
  submitErrorVisibleMessage;
  submitErrorHiddenMessage;
  isValid;
  hasValidationErrors;
  constructor({
    formFields,
    alertElement,
    notSubmittedErrorMessage,
    validatorFunctions = {},
    lang,
    errorMessages = {}
  }) {
    this.formFields = formFields;
    this.validatorFunctions = validatorFunctions;
    this.errorMessages = { missing: "", invalid: "", notSubmitted: "" };
    this.submitErrorMessage = alertElement;
    this.submitErrorVisibleMessage = alertElement.querySelector(".visible");
    this.submitErrorHiddenMessage = alertElement.querySelector("duet-visually-hidden");
    this.isValid = false;
    this.hasValidationErrors = false;
    this.setUp({ formFields, notSubmittedErrorMessage, lang, errorMessages });
  }
  clearSubmitErrorMessage() {
    this.submitErrorVisibleMessage.textContent = "";
    this.submitErrorHiddenMessage.textContent = "";
    this.submitErrorMessage.style.display = "none";
    this.hasValidationErrors = false;
  }
  setUp({
    formFields: nextFormFields,
    notSubmittedErrorMessage,
    lang,
    errorMessages = {}
  }) {
    this.formFields = nextFormFields;
    for (const field in nextFormFields) {
      nextFormFields[field].addEventListener("duetChange", () => {
        var _a, _b;
        const nativeElement = nextFormFields[field].querySelector("input, textarea");
        const value = nextFormFields[field].value;
        if ((_a = nextFormFields[field]) == null ? void 0 : _a.matches("duet-date-picker")) {
          nextFormFields[field].error = "";
        }
        if ((_b = nextFormFields[field]) == null ? void 0 : _b.matches("duet-checkbox")) {
          nextFormFields[field].error = "";
        }
        if (value && (!nativeElement || nativeElement.validity.valid)) {
          nextFormFields[field].error = "";
        }
        if (value && Object.values(this.formFields).every((f) => !f.error || f.error === "")) {
          this.clearSubmitErrorMessage();
        }
      });
    }
    this.clearSubmitErrorMessage();
    const safeLang = lang || "fi";
    const defaults = {
      missing: { fi: "Puuttuu", en: "Missing", sv: "Saknas" }[safeLang],
      invalid: { fi: "Virheellinen", en: "Invalid", sv: "Felaktig" }[safeLang]
    };
    this.errorMessages = {
      missing: errorMessages.missing || defaults.missing,
      invalid: errorMessages.invalid || defaults.invalid,
      notSubmitted: notSubmittedErrorMessage
    };
  }
  validate() {
    this.clearSubmitErrorMessage();
    this.isValid = false;
    const invalidFields = [];
    const checkFieldsValidityObject = (field) => {
      const invalidities = Object.entries(field.validity).filter(([key, invalid]) => invalid && key !== "valid").map(([key]) => key);
      const errorMessages = [];
      invalidities.forEach((i) => {
        if (field.dataset[i]) {
          errorMessages.push(field.dataset[i]);
        } else if (i === "valueMissing" && field.dataset.errorMissing) {
          errorMessages.push(field.dataset.errorMissing);
        }
      });
      field.error = errorMessages.join(" ") || field.dataset.errorInvalid || this.errorMessages.invalid;
      invalidFields.push(field);
    };
    if (this.formFields) {
      Object.values(this.formFields).forEach((f) => {
        if (f.dataset.conditionallyOptionalIn) {
          document.querySelector(f.dataset.conditionallyOptionalIn).error = "";
        }
      });
    }
    for (const fieldName in this.formFields) {
      const field = this.formFields[fieldName];
      field.error = "";
      const value = `${field.value || ""}`.trim();
      const isCheckbox = field.matches("duet-checkbox");
      const isMissing = isCheckbox ? !field.checked : value === "";
      if (field.matches("duet-date-picker") && !field.validity.valid) {
        checkFieldsValidityObject(field);
      } else if (isMissing && !field.dataset.conditionallyOptionalIn && !field.dataset.optional) {
        field.error = field.dataset.errorMissing || this.errorMessages.missing;
        invalidFields.push(field);
        field.required = true;
      } else if (field.validity && !field.validity.valid) {
        checkFieldsValidityObject(field);
      }
      if (field.dataset.conditionallyOptionalIn) {
        const container = document.querySelector(field.dataset.conditionallyOptionalIn);
        const optionalFields = [...container.querySelectorAll("[data-conditionally-optional-in]")];
        if (!optionalFields.some((f) => `${f.value || ""}`.trim() !== "") && !invalidFields.find((f) => f.label === container.label)) {
          container.error = container.dataset.errorMissing || this.errorMessages.missing;
          invalidFields.push(container);
        }
      }
      if (!field.error && value !== "" && field.dataset.validatorFunction && !this.validatorFunctions[field.dataset.validatorFunction](field.value)) {
        field.error = field.dataset.errorInvalid || this.errorMessages.invalid;
        invalidFields.push(field);
      }
    }
    if (invalidFields.length) {
      this.hasValidationErrors = true;
      this.submitErrorVisibleMessage.textContent = this.errorMessages.notSubmitted;
      this.submitErrorHiddenMessage.textContent = invalidFields.map((field) => `${field.label}, ${field.error}`).join(". ");
      this.submitErrorMessage.style.display = "block";
      return false;
    }
    this.isValid = true;
    return true;
  }
};

// src/index.ts
var currency = (number, hideCents, hideSymbol = false) => {
  return new Intl.NumberFormat("fi-FI", {
    style: hideSymbol ? "decimal" : "currency",
    ...hideSymbol ? {} : { currency: "EUR" },
    minimumFractionDigits: hideCents ? 0 : 2,
    maximumFractionDigits: hideCents ? 0 : 2
  }).format(number);
};
var dobFromSsn = (ssn) => {
  const day = ssn.substring(0, 2);
  const month = ssn.substring(2, 4);
  const year = ssn.substring(4, 6);
  const separator = ssn.substring(6, 7);
  const century = separator === "-" ? "19" : "20";
  return `${century}${year}-${month}-${day}`;
};
var id = (prefix = "proto-id-") => `${prefix}${`${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`}`;
var queryParam = (param) => new URLSearchParams(window.location.search).get(param);
var rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
var ucFirst = (string) => `${string[0].toUpperCase()}${string.slice(1)}`;
var ProtoUtils2 = {
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
    ucFirst
  },
  themeSwitch,
  validator,
  FormValidator
};
var index_default = ProtoUtils2;
