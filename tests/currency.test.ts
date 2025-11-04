import { describe, it, expect } from "vitest"
import ProtoUtils from "../src/index"

describe("currency", () => {
  it("should format number as currency with € symbol", () => {
    const result = ProtoUtils.currency(1234.56, false)
    expect(result).toBe("1\u00A0234,56\u00A0€")
  })

  it("should format number as currency without cents (rounded)", () => {
    const result = ProtoUtils.currency(1234.56, true)
    expect(result).toBe("1\u00A0235\u00A0€")
  })

  it("should format number as currency with € symbol by default", () => {
    const result = ProtoUtils.currency(1234.56, false, false)
    expect(result).toBe("1\u00A0234,56\u00A0€")
  })

  it("should remove € symbol when hideSymbol is true", () => {
    const result = ProtoUtils.currency(1234.56, false, true)
    expect(result).toBe("1\u00A0234,56")
  })

  it("should remove € symbol and hide cents when both options are true", () => {
    const result = ProtoUtils.currency(1234.56, true, true)
    expect(result).toBe("1\u00A0235")
  })

  it("should handle zero value", () => {
    expect(ProtoUtils.currency(0, false)).toBe("0,00\u00A0€")
    expect(ProtoUtils.currency(0, false, true)).toBe("0,00")
  })

  it("should handle large numbers", () => {
    const result = ProtoUtils.currency(1000000.99, false)
    expect(result).toBe("1\u00A0000\u00A0000,99\u00A0€")

    const resultNoSymbol = ProtoUtils.currency(1000000.99, false, true)
    expect(resultNoSymbol).toBe("1\u00A0000\u00A0000,99")
  })
})
