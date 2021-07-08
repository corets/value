import { ValueListener, ValueDiffer } from "./types"

// todo: simplify listeners since, no need to diff since there are no more mappers
export class ValueListenerWithDiffer<TValue> {
  callback: ValueListener<TValue>
  value: TValue
  differ: ValueDiffer<TValue>

  constructor(
    callback: ValueListener<TValue>,
    value: TValue,
    differ: ValueDiffer<TValue>
  ) {
    this.callback = callback
    this.value = value
    this.differ = differ
  }

  notify(newValue: TValue, diff: boolean = true) {
    const isDifferent = diff ? this.differ(this.value, newValue) : true

    if (isDifferent) {
      this.value = newValue
      this.callback(newValue)
    }
  }
}
