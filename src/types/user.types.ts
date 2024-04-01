export type User = {
  email: string;
  id: string;
  firstName: string;
  LastName: string;
  age: number;
};

/**
 * Response object with user attached
 * @interface
 */
export interface UserRequest extends Request {
  isAuth?: boolean;
  userId?: string;
}
