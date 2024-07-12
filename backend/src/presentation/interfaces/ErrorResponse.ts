export interface ErrorResponse {
  title: string
  status: number
  errors: Array<{
    message: string
  }>
}
