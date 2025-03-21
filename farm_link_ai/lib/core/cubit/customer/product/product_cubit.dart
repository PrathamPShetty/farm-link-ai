import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
import 'package:farm_link_ai/utils/shared_pref.dart'; // Replace with your actual path
import 'package:meta/meta.dart';
import 'package:farm_link_ai/consts/host.dart';
import 'package:farm_link_ai/core/cubit/customer/product/product.dart';

part 'product_state.dart';

class CustomerProductCubit extends Cubit<ProductState> {
  final Dio _dio = Dio();
  List<Product> _allProducts = [];
  List<Product> _filteredProducts = [];

  CustomerProductCubit() : super(ProductInitial());

  Future<void> fetchProducts() async {
    try {
      emit(ProductLoading());

      final token = await getToken();
      if (token == null || token.isEmpty) {
        emit(ProductError("Failed to fetch token."));
        return;
      }

      _dio.options.headers = {'auth-token': token};

      final response = await _dio.get('$host/customer/viewAllProducts');

      if (response.statusCode == 200) {
        final data = response.data['products'];

        // Check if data is a valid list
        if (data is List) {
          // Convert JSON data to a list of Product objects
          List<Product> convertJsonToProducts(List<Map<String, dynamic>> jsonData) {
            return jsonData.map((json) => Product.fromJson(json)).toList();
          }

          // Emit the loaded products state
          emit(ProductLoaded(products: convertJsonToProducts(List<Map<String, dynamic>>.from(data))));
        } else {
          emit(ProductError("Unexpected response structure: $data"));
        }
      } else {
        emit(ProductError(
            "Failed to load products: Status code ${response.statusCode}, Response: ${response.data}"));
      }
    } catch (e) {
      print("Error fetching products: $e");
      if (e is DioError) {
        print("DioError Response: ${e.response?.data}");
      }

      emit(ProductError("An error occurred while loading products."));
    }
  }
}
