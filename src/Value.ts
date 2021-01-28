import {
  ObservableValue,
  ValueListener,
  ValueListenerUnsubscribe,
  ValueListenOptions,
  ValueConfig,
} from "./types"
import { ValueListenerWithDiffer } from "./ValueListenerWithDiffer"
import { defaultDiffer } from "./defaultDiffer"

export class Value<TValue> implements ObservableValue<TValue> {
  initialValue: TValue
  value: TValue
  config: ValueConfig<TValue>
  listeners: ValueListenerWithDiffer<TValue>[]

  constructor(initialValue: TValue, config?: Partial<ValueConfig<TValue>>) {
    this.initialValue = initialValue
    this.value = this.initialValue
    this.config = {
      differ: config?.differ ?? defaultDiffer,
    }
    this.listeners = []
  }

  get(): TValue {
    return this.value
  }

  set(newValue: TValue) {
    this.value = newValue
    this.notify()
  }

  reset(initialValue?: TValue) {
    if (initialValue !== undefined) {
      this.initialValue = initialValue
    }

    this.set(this.initialValue)
  }

  listen(
    callback: ValueListener<TValue>,
    options?: ValueListenOptions<TValue>
  ): ValueListenerUnsubscribe {
    const differ = options?.differ ?? this.config.differ
    const listener = new ValueListenerWithDiffer<TValue>(callback, differ)

    this.listeners.push(listener)

    if (options?.immediate) {
      listener.notify(this.value)
    }

    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener)
    }
  }

  protected notify() {
    this.listeners.forEach((listener) => listener.notify(this.value))
  }
}
