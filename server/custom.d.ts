interface User {
  _id: string,
  user_name: string,
  password: string,
  user_email: string,
  make: string,
  model: string,
  year: string
}

declare namespace Express {
  export interface Request {
    user: User
  }
}