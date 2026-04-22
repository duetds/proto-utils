import { describe, it, expect } from "vitest"
import ProtoUtils from "../src/index"

describe("date.months", () => {
  it("returns 12 months", () => {
    expect(ProtoUtils.date.months("en")).toHaveLength(12)
  })

  it("returns Finnish month names capitalized", () => {
    const result = ProtoUtils.date.months("fi")
    expect(result[0]).toBe("Tammikuu")
    expect(result[1]).toBe("Helmikuu")
    expect(result[11]).toBe("Joulukuu")
  })

  it("returns Swedish month names capitalized", () => {
    const result = ProtoUtils.date.months("sv")
    expect(result[0]).toBe("Januari")
    expect(result[1]).toBe("Februari")
    expect(result[11]).toBe("December")
  })

  it("returns English month names capitalized", () => {
    const result = ProtoUtils.date.months("en")
    expect(result[0]).toBe("January")
    expect(result[6]).toBe("July")
    expect(result[11]).toBe("December")
  })

  it("returns plain strings", () => {
    const result = ProtoUtils.date.months("en")
    result.forEach(month => expect(typeof month).toBe("string"))
  })
})
