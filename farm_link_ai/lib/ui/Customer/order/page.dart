import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart'; // For Rating
import '../../../consts/host.dart';
import '../../../core/cubit/customer/orders/order_cubit.dart';
import '../../../utils/shared_pref.dart';
import '../../commons/nav_bar/NavBar.dart';

class CustomerOrder extends StatefulWidget {
  const CustomerOrder({super.key});

  @override
  State<CustomerOrder> createState() => _OrderState();
}

class _OrderState extends State<CustomerOrder> {
  double rating = 3.0; // Initial rating value

  // To track expanded order (showing tracking info)
  final List<bool> _expandedOrder = List.generate(4, (index) => false);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => OrderCubit()..loadOrders(), // Fetch orders on widget load
      child: BlocBuilder<OrderCubit, OrderState>(
        builder: (context, state) {
          if (state is OrderLoading) {
            return const Center(child: CircularProgressIndicator());
          } else if (state is OrderLoaded) {
            final orders = state.orders;
            if (orders.isEmpty) {
              // Show message when no orders are found
              return NavBar(bodyContent: Center(child: Text("No orders found")));
            }
            return NavBar(
              bodyContent: Padding(
                padding: const EdgeInsets.all(16.0),
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Order Details Section with Product Image
                      Text("Order Details", style: Theme.of(context).textTheme.titleLarge),
                      SizedBox(height: 10),
                      ListView.builder(
                        shrinkWrap: true, // Ensures the list doesn't overflow
                        physics: NeverScrollableScrollPhysics(), // Disable scrolling here
                        itemCount: orders.length,
                        itemBuilder: (context, index) {
                          var order = orders[index]; // This assumes `orders` is a List of Map
                          debugPrint(order.toString());
                          var product = order['product']['product']; // Ensure 'product' is a Map and access 'product'
                          var quantity = int.tryParse(order['quantity'].toString()) ?? 0; // Ensure quantity is an integer
                          var price = double.tryParse(order['price'].toString()) ?? 0.0; // Ensure price is a double
                          return Card(
                            child: Column(
                              children: [
                                ListTile(
                                  title: Text('${product['title']} x $quantity'),
                                  subtitle: Text('${quantity} ${product['unitOfMeasure']}'),
                                  trailing: Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      // Cancel Order Button
                                      IconButton(
                                        icon: Icon(Icons.cancel),
                                        onPressed: () => showCancelDialog(
                                          context,
                                          product['title'],
                                          quantity,
                                          product['unitOfMeasure'],
                                          order['_id'], // Changed to '_id' for the product ID
                                        ),
                                      ),
                                      // Rating Button
                                      IconButton(
                                        icon: Icon(Icons.star_rate),
                                        onPressed: () => showRatingDialog(context),
                                      ),
                                    ],
                                  ),
                                  leading: Image.network(
                                    "http://172.232.110.246:8001/uploads/farmer/product/"+product['picture'], // Changed to 'picture' for the product image
                                    width: 50,
                                    height: 50,
                                    fit: BoxFit.cover,
                                  ),
                                ),
                                // Order Tracking Button / Expansion Tile
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Text("Order status: ${order['orderStatus']}"),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ),
            );
          } else if (state is OrderError) {
            return Center(child: Text(state.message));
          }
          return const Center(child: Text("No orders found"));
        },
      ),
    );
  }

  // Cancel Order Dialog
  void showCancelDialog(BuildContext context, String productTitle, int quantity, String unitOfMeasure, String id) {
    Dio dio = Dio();
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Cancel Order'),
          content: Text(
              'Are you sure you want to cancel the order of $productTitle x $quantity $unitOfMeasure?'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('No'),
            ),
            TextButton(
              onPressed: () async{

                final token = await getToken(); // Get the token asynchronously
                dio.options.headers = {
                  'auth-token': token,
                };
                final response = await dio.put('$host/customer/cancelOrder/${id}');
                if(response.statusCode == 200){
                  Navigator.of(context).pop();
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text("Order cancelled successfully!")),
                  );
                }else{
                  Navigator.of(context).pop();
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text("Failed to cancel order. Please try again later.")),
                  );
                }

                Navigator.of(context).pop();
              },
              child: Text('Yes, Cancel'),
            ),
          ],
        );
      },
    );
  }

  // Rating Order Dialog
  void showRatingDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Rate your order experience'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                RatingBar.builder(
                  initialRating: rating,
                  minRating: 1,
                  itemSize: 40,
                  itemCount: 5,
                  itemPadding: EdgeInsets.symmetric(horizontal: 4),
                  onRatingUpdate: (rating) {
                    setState(() {
                      this.rating = rating;
                    });
                  },
                  itemBuilder: (context, index) {
                    return Icon(
                      Icons.star,
                      color: index < rating ? Colors.yellow : Colors.grey,
                    );
                  },
                ),
                SizedBox(height: 10),
                TextField(
                  decoration: InputDecoration(hintText: 'Enter feedback'),
                  maxLines: 3,
                  onChanged: (value) {
                    // Handle feedback input
                  },
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                // Submit rating and feedback logic here
                Navigator.of(context).pop();
              },
              child: Text('Submit'),
            ),
          ],
        );
      },
    );
  }
}
