import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Product } from './product.model';

@Injectable()
export class ProductService {
  products: Product[] = [];

  private findProduct(prodId: string): [Product, number] {
    const productIndex = this.products.findIndex((item) => item.id === prodId);
    const product = this.products.find((item) => item.id === prodId);
    console.log(product);
    if (!product) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: "Couldn't find product" },
        HttpStatus.BAD_REQUEST,
      );
    }

    return [product, productIndex];
  }

  insertProduct(title: string, description: string, price: number) {
    const newProduct = new Product(
      String(Math.floor(Math.random() * 100)),
      title,
      description,
      price,
    );

    this.products.push(newProduct);

    return { ...newProduct };
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(prodId: string) {
    const [product] = this.findProduct(prodId);

    return { ...product };
  }

  editSingleProduct(
    prodId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, productIndex] = this.findProduct(prodId);

    const newProduct = new Product(product.id, title, description, price);
    console.log(newProduct, this.products[productIndex]);
    this.products[productIndex] = newProduct;

    return { ...newProduct };
  }

  deleteSingleProduct(prodId: string) {
    const [product, productIndex] = this.findProduct(prodId);

    this.products.splice(productIndex, 1);

    console.log(this.products);

    return { ...product };
  }
}
