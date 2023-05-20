import { EBrand } from 'constant';

export interface I_Car extends Document {
  readonly id: string;

  readonly price: number;

  readonly brand: EBrand;

  readonly year?: number;
}
