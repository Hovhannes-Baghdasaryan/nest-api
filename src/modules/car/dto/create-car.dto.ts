import { EBrand } from 'constant';
import { Transform } from 'class-transformer';
import {
  Max,
  Min,
  IsEnum,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateCarDto {
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(EBrand)
  brand: string;

  @Min(1900)
  // not older than current year
  @IsNumber()
  @IsNotEmpty()
  // make this field optional so client has not to pass
  @IsOptional()
  @Max(new Date().getFullYear())
  // Transforming the prop from string to number
  // {year: "1990"} => {year: 1990} so we do not have to throw validation error only if the value is string not the type
  @Transform(({ value }) => +value)
  year: number;
}
