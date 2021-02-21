import { CreateValueSetter, ValueSetter } from "./types"

export const createValueSetter: CreateValueSetter = (value) => {
  const setter: ValueSetter = (newValue) => {
    if (newValue instanceof Function) {
      value.set(newValue(value.get()))
    } else {
      value.set(newValue)
    }
  }

  return setter
}
