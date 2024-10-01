export interface IBase {
  createdAt?: Date
  updatedAt?: Date
}

export interface ISearchParams {
  page?: string
  limit?: string
  filter?: any
  sort?: any
}
