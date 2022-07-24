import { UserLoginBodyType, GetUserData } from 'types/Auth';
import { client } from './axios';

const login = (body: UserLoginBodyType): Promise<GetUserData> => client.post(`/api/v1/login`, body);

export default {
  login,
};
