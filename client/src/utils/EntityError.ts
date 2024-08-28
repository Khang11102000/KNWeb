import { EntityErrorResponse } from '@/types/http-type'

class EntityError extends Error {
  status: 422
  errors: EntityErrorResponse
  constructor({
    status,
    errors
  }: {
    status: 422
    errors: EntityErrorResponse
  }) {
    super('Entity Error')
    this.status = status
    this.errors = errors
  }
}

export default EntityError
