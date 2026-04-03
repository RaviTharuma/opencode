export namespace Unicode {
  export function toWellFormedString(value: string) {
    return value.toWellFormed()
  }

  export function sanitizeJSON<T>(value: T): T {
    return sanitize(value) as T
  }

  function sanitize(value: unknown): unknown {
    if (typeof value === "string") {
      return value.toWellFormed()
    }

    if (Array.isArray(value)) {
      return value.map(sanitize)
    }

    if (isPlainObject(value)) {
      return Object.fromEntries(
        Object.entries(value).map(([key, entryValue]) => [key.toWellFormed(), sanitize(entryValue)]),
      )
    }

    return value
  }

  function isPlainObject(value: unknown): value is Record<string, unknown> {
    if (!value || typeof value !== "object") return false
    const proto = Object.getPrototypeOf(value)
    return proto === Object.prototype || proto === null
  }
}
