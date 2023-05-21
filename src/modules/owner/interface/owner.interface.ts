export interface I_Owner extends Document {
  readonly id: string;

  readonly name: string;

  readonly age?: number;
}
