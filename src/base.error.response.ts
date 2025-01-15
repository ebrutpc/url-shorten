export interface ErrorResponse {
  statusCode: number;
  timestamp: number;
  path: string;
  message: string;
}

export class BaseErrorResponse {
  error: ErrorResponse;
  constructor(error = {} as ErrorResponse) {
    this.error = error;
  }
}
