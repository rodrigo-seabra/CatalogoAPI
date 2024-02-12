interface UserInterface {
  save(): unknown;
  name: string;
  email: string;
  phone: string;
  password: string;
  image?: string;
}
export { UserInterface };
