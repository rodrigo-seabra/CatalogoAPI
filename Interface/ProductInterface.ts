export interface ProductInterface {
  save(): unknown;
  _id: any;
  modelo: string;
  marca: string;
  categoria: string;
  ano: string;
  descricao: string;
  image?: string;
  user: any;
}
