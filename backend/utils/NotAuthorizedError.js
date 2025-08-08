class NotAuthorizedError extends Error {
  constructor(message = 'You have no permission to access this resource.') {
    super(message);
    this.name = 'NotAuthorizedError';
    this.statusCode = 404;
  }
}

export default NotAuthorizedError;