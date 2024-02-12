interface UserInterface {
  body: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmpassword: string;
    CPF: string;
  };
  save(): unknown;
  name: string;
  email: string;
  phone: string;
  password: string;
  image?: string;
}
export { UserInterface };
