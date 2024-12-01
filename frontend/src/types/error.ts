export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message || 'Unauthorized');
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message || 'Forbidden');
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message || 'Not Found');
    this.name = 'NotFoundError';
  }
}

export class ServerError extends Error {
  constructor(message: string) {
    super(message || 'Server Error');
    this.name = 'ServerError';
  }
}

export class RefreshTokenExpiredError extends Error {
  constructor(message: string) {
    super(message || 'Refresh Token Expired');
    this.name = 'RefreshTokenExpiredError';
  }
}
