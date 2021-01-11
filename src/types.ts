export interface ObservableValue<TValue = any> {
  value: TValue
  initialValue: TValue

  get(): TValue
  set(newValue: TValue): void
  reset(initialValue?: TValue): void
  listen(callback: ValueCallback<TValue>, notifyImmediately?: boolean): ValueCallbackUnsubscribe
}

export type ValueCallback<TValue> = (newValue: TValue) => void
export type ValueCallbackUnsubscribe = () => void
export type ValueDiffer<TValue> = (oldValue: TValue, newValue: TValue) => boolean
export type CreateValue = <TValue>(initialValue: TValue) => ObservableValue<TValue>
