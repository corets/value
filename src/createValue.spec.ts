import { createValue, Value } from "./index"

describe("createValue", () => {
  it("creates a value", () => {
    const differ = (value) => true
    const value = createValue(1, { differ })

    expect(value instanceof Value).toBe(true)
    expect(value.get()).toBe(1)
    expect(value.config.differ === differ).toBe(true)
  })
})
