class HttpError extends Error {
  constructor(status, message, details = null) {
    super(message);
    this.status = status;
    if (details) {
      this.details = details;
    }
  }
}

module.exports = HttpError;
