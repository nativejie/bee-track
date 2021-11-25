export enum HttpMessageEnum {
  Ok = 'ok',
  /** Deadline expired before operation could complete. */
  DeadlineExceeded = 'deadline_exceeded',
  /** 401 Unauthorized (actually does mean unauthenticated according to RFC 7235) */
  Unauthenticated = 'unauthenticated',
  /** 403 Forbidden */
  PermissionDenied = 'permission_denied',
  /** 404 Not Found. Some requested entity (file or directory) was not found. */
  NotFound = 'not_found',
  /** 429 Too Many Requests */
  ResourceExhausted = 'resource_exhausted',
  /** Client specified an invalid argument. 4xx. */
  InvalidArgument = 'invalid_argument',
  /** 501 Not Implemented */
  Unimplemented = 'unimplemented',
  /** 503 Service Unavailable */
  Unavailable = 'unavailable',
  /** Other/generic 5xx. */
  InternalError = 'internal_error',
  /** Unknown. Any non-standard HTTP status code. */
  UnknownError = 'unknown_error',
  /** The operation was cancelled (typically by the user). */
  Cancelled = 'cancelled',
  /** Already exists (409) */
  AlreadyExists = 'already_exists',
  /** Operation was rejected because the system is not in a state required for the operation's */
  FailedPrecondition = 'failed_precondition',
  /** The operation was aborted, typically due to a concurrency issue. */
  Aborted = 'aborted',
  /** Operation was attempted past the valid range. */
  OutOfRange = 'out_of_range',
  GatewayTimeout = 'gatewat_timeout',
  BadGateway = 'bad_gateway',
  RequestEntityTooLarge = 'request_entity_too_large',
  Forbidden = 'forbidden',
}

export const formatHttpStatus = (status: number): string => {
  if (status < 400) {
    return HttpMessageEnum.Ok;
  }
  if (status >= 400 && status < 500) {
    switch (status) {
      case 401:
        return HttpMessageEnum.Unauthenticated;
      case 403:
        return HttpMessageEnum.Forbidden;
      case 404:
        return HttpMessageEnum.NotFound;
      case 409:
        return HttpMessageEnum.AlreadyExists;
      case 413:
        return HttpMessageEnum.RequestEntityTooLarge;
      case 416:
        return HttpMessageEnum.OutOfRange;
      default:
        return HttpMessageEnum.InvalidArgument;
    }
  }

  if (status >= 500 && status < 600) {
    switch (status) {
      case 501:
        return HttpMessageEnum.Unimplemented;
      case 503:
        return HttpMessageEnum.Unavailable;
      case 502:
        return HttpMessageEnum.BadGateway;
      case 504:
        return HttpMessageEnum.GatewayTimeout;
      default:
        return HttpMessageEnum.InternalError;
    }
  }
  return '';
};
