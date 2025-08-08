class InternalError extends Error {
  constructor(message = 'Internal Error') {
    super(message);
    this.name = 'InternalError';
    this.statusCode = 500;
  }
}

export default InternalError;