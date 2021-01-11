import isEqual from "lodash/isEqual"
import { ValueDiffer } from "./types"

export const defaultDiffer: ValueDiffer<any> = (oldValue, newValue) =>
  !isEqual(oldValue, newValue)
