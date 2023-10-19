const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

// Do the Same Work
const asyncWrapperWithPromise = (fn) => {
  return async (req, res, next) => {
    Promise.all(fn(req, res, next)).catch(next)
  }
}

export { asyncWrapper, asyncWrapperWithPromise }
