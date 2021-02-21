import { createValue, Value } from "./index"

describe("Value", () => {
  it("creates value with initial state", () => {
    const value = new Value(1)

    expect(value.get()).toEqual(1)
  })

  it("listens", () => {
    const value = createValue(1)
    const callback = jest.fn()

    value.listen(callback)

    expect(callback).toHaveBeenCalledTimes(0)

    value.set(2)

    expect(callback).toHaveBeenCalledWith(2)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("listens with immediate", () => {
    const value = createValue(1)
    const callback = jest.fn()

    value.listen(callback, { immediate: true })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(1)

    value.set(2)

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(2)

    value.set(2)

    expect(callback).toHaveBeenCalledTimes(2)
  })

  it("listens with a custom differ", () => {
    const value = createValue(1)
    const callback = jest.fn()

    value.listen(callback, { immediate: true, differ: () => true })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(1)

    value.set(2)

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(2)

    value.set(2)

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith(2)
  })

  it("diffs changes", () => {
    const value = createValue(1)
    const callback = jest.fn()

    value.listen(callback, { immediate: true })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(1)

    value.set(1)

    expect(callback).toHaveBeenCalledTimes(1)

    value.set(2)

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(2)
  })

  it("creates value with a custom differ trough constructor", () => {
    const value = new Value(1, { differ: () => true })
    const callback = jest.fn()

    value.listen(callback, { immediate: true })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(1)

    value.set(1)

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(1)

    value.set(2)

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith(2)
  })

  it("takes a custom differ trough listen", () => {
    const value = createValue(1)
    const callback = jest.fn()

    value.listen(callback, { immediate: true, differ: () => true })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(1)

    value.set(1)

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(1)

    value.set(2)

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith(2)
  })

  it("is usable", () => {
    const counter = createValue(1)
    const [value, setValue] = counter.use()

    expect(counter.get()).toBe(1)
    expect(counter.get()).toBe(value)

    setValue(2)

    expect(counter.get()).toBe(2)

    setValue((oldValue) => oldValue + 1)

    expect(counter.get()).toBe(3)
  })
})
