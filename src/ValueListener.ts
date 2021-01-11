import { ValueCallback, ValueDiffer } from "./types"

export class ValueListener<TValue> {
  callback: ValueCallback<TValue>
  value: TValue
  differ: ValueDiffer<TValue>

  constructor(
    callback: ValueCallback<TValue>,
    differ: ValueDiffer<TValue>,
  ) {
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
