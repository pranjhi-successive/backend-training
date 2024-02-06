import IBase from '../../../lib/base/interface';

export interface IUser extends IBase {
  name: string;
  phone: string;
  email: string;
  password: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
}
