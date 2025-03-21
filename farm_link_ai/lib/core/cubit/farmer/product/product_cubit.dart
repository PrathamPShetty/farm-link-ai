import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';  // Import Dio
import 'package:flutter/cupertino.dart';
import 'dart:convert';
import 'dart:io';
import 'package:image_picker/image_picker.dart';
import 'package:farm_link_ai/consts/host.dart';
import 'package:farm_link_ai/utils/shared_pref.dart';

part 'product_state.dart';

class ProductCubit extends Cubit<ProductState> {
  final Dio _dio = Dio(); // Instantiate Dio

  ProductCubit() : super(ProductInitial());

  // Fetch products from the API
  Future<void> loadProducts() async {
    try {
      emit(ProductLoading());

      final token = await getToken(); // Get the token asynchronously

      // Set the token in headers before making the request
      _dio.options.headers = {
        'auth-token': token,
      };

      final response = await _dio.get('$host/farmer/getAllProducts');

      if (response.statusCode == 200) {
        List<dynamic> productList = response.data['products'];
        List<Product> products = productList.map((json) => Product.fromJson(json)).toList();
        debugPrint("Products loaded: $products");
        emit(ProductLoaded(products: products));
      } else {
        emit(ProductError("Failed to load products"));
      }
    } catch (e) {
      emit(ProductError("An error occurred: $e"));
    }
  }

  // Add a new product with an image using Dio
  Future<void> addProduct(Product product, File? image) async {
    try {
      emit(ProductLoading());

      final token = await getToken(); // Get the token asynchronously

      // Set the token in headers before making the request
      _dio.options.headers = {
        'auth-token': token,
      };

      FormData formData = FormData.fromMap({
        'title': product.name,
        'price': product.price.toString(),
        'unit': product.unit,
        'unitOfMeasure': product.unitOfMeasure,
        'description': product.description,
      });

      // If there is an image, add it to the FormData
      if (image != null) {
        formData.files.add(MapEntry(
          'picture',
          await MultipartFile.fromFile(image.path, filename: image.path.split('/').last),
        ));
      }

      final response = await _dio.post(
        '$host/farmer/insertProduct',
        data: formData,
      );

      if (response.statusCode == 200) {
        final newProduct = Product.fromJson(response.data);
        emit(ProductAdded(newProduct: newProduct));
      } else {
        emit(ProductError("Failed to add product"));
      }
    } catch (e) {
      emit(ProductError("An error occurred: $e"));
    }
  }

  // Update an existing product with new data and optional image
  Future<void> updateProduct(Product product, File? image) async {
    try {
      emit(ProductLoading());

      final token = await getToken(); // Get the token asynchronously

      // Set the token in headers before making the request
      _dio.options.headers = {
        'auth-token': token,
      };

      // Initialize FormData with necessary fields
      FormData formData = FormData.fromMap({
        'title': product.name,
        'price': product.price.toString(),
        'unit': product.unit,
        'unitOfMeasure': product.unitOfMeasure,
        'description': product.description,
        // If status is null, don't send it or send a default value like an empty string.
        'status':  '',  // Use empty string if status is null
      });



      final response = await _dio.put(
        '$host/farmer/updateProduct/${product.id}',
        data: formData,
      );

      if (response.statusCode == 200) {
        final updatedProduct = Product.fromJson(response.data);
        emit(ProductUpdated(updatedProduct: updatedProduct));
      } else {
        emit(ProductError("Failed to update product"));
      }
    } catch (e) {
      emit(ProductError("An error occurred: $e"));
    }
  }



  // Delete a product by its ID
  Future<void> deleteProduct(String productId) async {
    try {
      emit(ProductLoading());

      final token = await getToken(); // Get the token asynchronously

      // Set the token in headers before making the request
      _dio.options.headers = {
        'auth-token': token,
      };

      final response = await _dio.delete(
        '$host/farmer/deleteProduct/$productId',
      );

      if (response.statusCode == 200) {
        emit(ProductDeleted(productId: productId));
      } else {
        emit(ProductError("Failed to delete product"));
      }
    } catch (e) {
      emit(ProductError("An error occurred: $e"));
    }
  }
}
