export interface ControllerResult<T> {
  data: T;
  msg?: string;
}

export interface ServiceResult<T> {
  data: T;
  msg?: string;
}

export interface DatabaseResult<T> {
  data: T;
  msg?: string;
}
