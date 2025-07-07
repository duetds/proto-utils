# ProtoUtils

This repository contains various utilities for prototypes.

## Install

`$ npm install https://github.com/duetds/proto-utils#semver:v1.0.3`

## Utils

- `currency` formats numbers as currency string according to Finnish standard
- `date`
  - `ISO` obeject with three members `today`, `tomorrow` and `yesterday` - ISO string dates
  - `ISO2Local` converts ISO date to Finnish locale date
  - `ISO2LocalRange` given object with `startDate` and `endDate` as ISO strings returns date range with Finnish locale dates
  - `ISO2LocalShortDay`
  - `ISO2LocalShortMonth`
  - `addDaysToDate`
  - `current`
  - `date2ISO`
  - `date2Local`
  - `date2LocalShortDay`
  - `date2LocalShortMonth`
  - `dateFromToday`
  - `dayInMS`
  - `isISO`
  - `local2ISO`
  - `string2ISO`
  - `string2Local`
  - `today`
  - `tomorrow`
  - `yesterday`
- `downloadFile` triggers a file download
- `id` generates an id that is locally unique enough (up to 2^52 ids per ms)
- `queryParam`
- `rnd` generates a random integer in given range
- `sampleData`
  - `set`
  - `get`
  - `clear`
- `stepperPaginator`
- `store`
  - `set`
  - `get`
  - `del`
- `str.dobFromSsn`
- `str.ucFirst`
- `themeSwitch`
- `validator`
  - `isValidEmail`
  - `isValidPhoneNumber`
  - `isValidFinnishSSN`
  - `isValidBusinessId`
  - `isValidDate`

## Development

When making changes update the version in package.json, this README in Install section, and make a new release tag in GitHub.
