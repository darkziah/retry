export const retry = <T>(
    fn: () => Promise<T>,
    { retries, retryIntervalMs }: { retries: number; retryIntervalMs: number }
  ): Promise<T> =>
    fn().catch((error) =>
      retries > 0
        ? wait(retryIntervalMs).then(() =>
            retry(fn, { retries: retries - 1, retryIntervalMs })
          )
        : Promise.reject(error)
    )
  
export const wait = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms))


export const retrySync = <T>(
    fn: () => T,
    { retries, retryIntervalMs }: { retries: number; retryIntervalMs: number }
  ): T => {
    try {
        return fn()
    } catch (error) {
        if (retries > 0) {
            return retrySync(fn, { retries: retries - 1, retryIntervalMs })
        } else {
            throw Error('Failed to retry')
        }
        
    }
  }
    

export const waitSync = (ms = 0) => setTimeout(() => {}, ms)