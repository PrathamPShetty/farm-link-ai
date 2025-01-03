class Product {
  final String id;
  final String title;
  final String farmer;
  final String description;
  final String price;
  final String unit;
  final String unitOfMeasure;
  final String picture;
  final String status;
  final String createdAt;
  final String updatedAt;

  Product({
    required this.id,
    required this.title,
    required this.farmer,
    required this.description,
    required this.price,
    required this.unit,
    required this.unitOfMeasure,
    required this.picture,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id:json['_id'],
      title: json['title'],
      farmer: json['farmer'],
      description: json['description'],
      price: json['price'],
      unit: json['unit'],
      unitOfMeasure: json['unitOfMeasure'],
      picture: json['picture'],
      status: json['status'],
      createdAt: json['createdAt'],
      updatedAt: json['updatedAt'],
    );
  }
}
