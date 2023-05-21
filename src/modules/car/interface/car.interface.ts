import { EBrand } from 'constant';
import { Owner } from 'modules/owner/schemas';

export interface I_Car extends Document {
  readonly id: string;

  readonly price: number;

  readonly brand: EBrand;

  readonly year?: number;

  readonly owners: Owner[];
}
