interface UserInterface {
  params: any;
  file: any;
  body: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmpassword: string;
    CPF: string;
    image?: string;
  };
  save(): unknown;
  name: string;
  email: string;
  phone: string;
  password: string;
  image?: string;
}
export { UserInterface };
