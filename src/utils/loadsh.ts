import * as _ from 'loadsh'

export function throttleHandle(fun: Function, interval: number) {
  return _.throttle(fun, interval)
}
export function debounceHandle(fun: Function, interval: number) {
  return _.debounce(fun, interval)
}
