import {
  ObservableValue,
  ValueListener,
  ValueListenerUnsubscribe,
  ValueListenOptions,
  ValueConfig,
  ValueSetter,
} from "./types"
import { ValueListenerWithDiffer } from "./ValueListenerWithDiffer"
import { defaultDiffer } from "./defaultDiffer"
import { createValueSetter } from "./createValueSetter"

export class Value<TValue> implements ObservableValue<TValue> {
  value: TValue
  config: ValueConfig<TValue>
  listeners: ValueListenerWithDiffer<TValue>[]

  constructor(value: TValue, config?: Partial<ValueConfig<TValue>>) {
    this.value = value
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

  use(): [TValue, ValueSetter<TValue>] {
    return [this.get(), createValueSetter(this)]
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
