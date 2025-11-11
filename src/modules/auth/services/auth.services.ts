import { httpClient } from '@/core/htpp/httpClient';
import type { LoginPayload } from '../types/login';
import type { RegisterPayload } from '../types/register';

export const Login = async (payload: LoginPayload) => {
  const { data } = await httpClient.post('/login', payload);
  return data;
};
export const Register = async (payload: RegisterPayload) => {
  const { data } = await httpClient.post('/register', payload);
  return data;
};
