import { ValueListener, ValueDiffer } from "./types"

export class ValueListenerWithDiffer<TValue> {
  callback: ValueListener<TValue>
  value: TValue
  differ: ValueDiffer<TValue>

  constructor(callback: ValueListener<TValue>, differ: ValueDiffer<TValue>) {
    this.callback = callback
    this.value = undefined as any
    this.differ = differ
  }

  notify(newValue: TValue) {
    const isDifferent = this.differ(this.value, newValue)

    if (isDifferent) {
      this.value = newValue
      this.callback(newValue)
    }
  }
}
