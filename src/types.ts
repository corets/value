export interface ObservableValue<TValue = any> {
  value: TValue
  initialValue: TValue
  config: ValueConfig<TValue>

  get(): TValue
  set(newValue: TValue): void
  reset(initialValue?: TValue): void
  listen(
    callback: ValueListener<TValue>,
    options?: ValueListenOptions<TValue>
  ): ValueListenerUnsubscribe
}

export type ValueConfig<TValue> = {
  differ: ValueDiffer<TValue>
}

export type ValueListenOptions<TValue> = {
  immediate?: boolean
  differ?: ValueDiffer<TValue>
}

export type ValueListener<TValue> = (newValue: TValue) => void
export type ValueListenerUnsubscribe = () => void
export type ValueDiffer<TValue> = (
  oldValue: TValue,
  newValue: TValue
) => boolean
export type CreateValue = <TValue>(
  initialValue: TValue,
  options?: ValueConfig<TValue>
) => ObservableValue<TValue>
