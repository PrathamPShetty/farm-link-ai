import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:meta/meta.dart';

import '../../../../consts/host.dart';
import '../../../../utils/shared_pref.dart';

part 'order_state.dart';

class OrderCubit extends Cubit<OrderState> {
  OrderCubit() : super(OrderInitial());

  Dio dio = Dio();

  Future<void> loadOrders() async {
    emit(OrderLoading());

    try {
      final token = await getToken(); // Get the token asynchronously

      // Set the token in headers before making the request
      dio.options.headers = {
        'auth-token': token,
      };

      final response = await dio.get('$host/customer/viewOrders');

      if (response.statusCode == 200) {
        // Cast the 'orders' to a List<Map<String, dynamic>> explicitly
        final orders = List<Map<String, dynamic>>.from(response.data['orders']);

        // Now, we need to fetch product details for each order
        List<Map<String, dynamic>> updatedOrders = [];

        for (var order in orders) {
          var productId = order['product']; // This is the product ID

          try {
            // Fetch product details using productId
            final productResponse = await dio.get('$host/customer/viewSingleProduct/$productId');

            if (productResponse.statusCode == 200) {
              var product = productResponse.data['product'];

              // Update the order with product details
              order['product'] = product;

              // Add the updated order to the list
              updatedOrders.add(order);
            } else {
              debugPrint('Failed to fetch product details for order: ${order['_id']}');
              updatedOrders.add(order); // Add the order even if product details fetch fails
            }
          } catch (e) {
            debugPrint('Error fetching product details for order: ${order['_id']}, error: $e');
            updatedOrders.add(order); // Add the order even if product details fetch fails
          }
        }

        // Emit updated orders with product details
        emit(OrderLoaded(updatedOrders));
      } else {
        emit(OrderError('Failed to load orders. Please try again later.'));
      }
    } catch (e) {
      emit(OrderError('An error occurred: $e'));
    }
  }
}
