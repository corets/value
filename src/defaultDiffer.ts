import isEqual from "fast-deep-equal"
import { ValueDiffer } from "./types"

export const defaultDiffer: ValueDiffer<any> = (oldValue, newValue) =>
  !isEqual(oldValue, newValue)
