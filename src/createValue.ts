import { CreateValue } from "./types"
import { Value } from "./Value"

export const createValue: CreateValue = (initialValue?) => new Value(initialValue)
