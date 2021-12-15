import { pickBy } from 'lodash'

export type RemoveUndefined<T> = Pick<T, { [K in keyof T]: T[K] extends undefined ? never : K }[keyof T]>

export default function removeUndefined<T extends object>(obj: T): RemoveUndefined<T> {
    return pickBy(obj, x => x !== undefined) as RemoveUndefined<T>
}
