const UNPROCESSABLE_ENTITY = {
  statusCode: 422,
  message: 'Unprocessable Entity'
}

const UNAUTHORIZED = {
  statusCode: 401,
  message: 'Unauthorized'
}

const NO_CONTENT = {
  statusCode: 204,
  message: 'No Content'
}

const HTTP_STATUS_CODES = {
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
  NO_CONTENT
}

export default HTTP_STATUS_CODES
