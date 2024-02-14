export interface UserInterface {
  save(): unknown;
  _id: any;
  name: string;
  email: string;
  phone: string;
  password: string;
  CPF: string;
  image?: string;
}
