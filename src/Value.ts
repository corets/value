import { ObservableValue, ValueCallback, ValueCallbackUnsubscribe, ValueDiffer } from "./types"
import { ValueListener } from "./ValueListener"
import { defaultDiffer } from "./defaultDiffer"

export class Value<TValue> implements ObservableValue<TValue> {
  initialValue: TValue
  value: TValue
  differ: ValueDiffer<any>
  listeners: ValueListener<TValue>[]

  constructor(
    initialValue: TValue,
    differ: ValueDiffer<TValue> = defaultDiffer,
  ) {
    this.initialValue = initialValue
    this.value = this.initialValue
    this.differ = differ
    this.listeners = []
  }

  get(): TValue {
    return this.value
  }

  set(newValue: TValue) {
    const isDifferent = this.differ(this.value, newValue)

    if (isDifferent) {
      this.value = newValue
      this.notify()
    }
  }

  reset(initialValue?: TValue) {
    if (initialValue !== undefined) {
      this.initialValue = initialValue
    }

    this.set(this.initialValue)
  }

  listen(callback: ValueCallback<TValue>, notifyImmediately = true): ValueCallbackUnsubscribe {
    const listener = new ValueListener<TValue>(callback, this.differ)

    this.listeners.push(listener)

    if (notifyImmediately) {
      listener.notify(this.value)
    }

    return () => {
      this.listeners = this.listeners.filter(item => item !== listener)
    }
  }

  protected notify() {
    this.listeners.forEach(listener => listener.notify(this.value))
  }
}
