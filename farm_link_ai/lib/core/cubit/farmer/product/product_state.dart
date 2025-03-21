
part of 'product_cubit.dart';

class ProductState {
  const ProductState();
}

class ProductInitial extends ProductState {}

class ProductLoading extends ProductState {}

class ProductLoaded extends ProductState {
  final List<Product> products;
  ProductLoaded({required this.products});
}

class ProductAdded extends ProductState {
  final Product newProduct;
  ProductAdded({required this.newProduct});
}

class ProductUpdated extends ProductState {
  final Product updatedProduct;
  ProductUpdated({required this.updatedProduct});
}

class ProductDeleted extends ProductState {
  final String productId;
  ProductDeleted({required this.productId});
}

class ProductError extends ProductState {
  final String message;
  ProductError(this.message);
}

class Product {
  final String name;
  final String id;
  final String price;
  final String unit;
  final String unitOfMeasure;
  final String description;
  final String? picture; // Store the picture URL or path here

  Product({
    required this.name,
    required this.price,
    required this.unit,
    required this.id,
    required this.unitOfMeasure,
    required this.description,
    this.picture,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    debugPrint("Product JSON: $json");
    return Product(
      id: json['_id'],
      name: json['title'],
      price: json['price'],
      unit: json['unit'],
      unitOfMeasure: json['unitOfMeasure'],
      description: json['description'],
      picture: json['picture'],  // Assuming the image URL is returned
    );
  }
}
