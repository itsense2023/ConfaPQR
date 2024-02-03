export interface BodyResponse<T> {
  code: number;
  message: string;
  data: T;
}
