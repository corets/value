import { createValue, Value } from "./index"

describe("createValue", () => {
  it("creates a value", () => {
    const value = createValue(1)

    expect(value instanceof Value).toBe(true)
    expect(value.get()).toBe(1)
  })
})