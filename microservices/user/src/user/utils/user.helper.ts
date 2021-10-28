import * as bcrypt from 'bcrypt';

const SALT = 10

export const hashedPassword = async (password: string): Promise<string> => {
  console.log(password);
  return await bcrypt.hash(password, SALT);
}

export const isMatch = async (password: string, hashedPassword: string): Promise<boolean> => {
  console.log("password", password);
  console.log("hash", hashedPassword);
  return await bcrypt.compare(password, hashedPassword);
}