import 'package:flutter/material.dart';
import 'package:dio/dio.dart'; // Add Dio for HTTP requests
import 'package:farm_link_ai/consts/host.dart';
import 'package:farm_link_ai/utils/shared_pref.dart';

class ManageOrder extends StatefulWidget {
  const ManageOrder({super.key});

  @override
  State<ManageOrder> createState() => _ManageOrderState();
}

class _ManageOrderState extends State<ManageOrder> {
  final TextEditingController _searchController = TextEditingController();
  final Dio dio = Dio();

  List<Order> allOrders = []; // Full list of orders
  List<Order> filteredOrders = []; // Filtered list for search results

  @override
  void initState() {
    super.initState();
    _fetchOrders(); // Fetch orders when the page loads
  }

  Future<void> _fetchOrders() async {
    try {
      final token = await getToken(); // Assume this function retrieves the token

      // Set headers for authentication
      dio.options.headers = {'auth-token': token};

      // Perform API call
      final response = await dio.get('$host/farmer/getOrders');

      if (response.statusCode == 200) {
        final ordersJson = List<Map<String, dynamic>>.from(response.data['orders']);

        // Map JSON response to Order objects
        setState(() {
          allOrders = ordersJson.map((json) => Order.fromJson(json)).toList();
          filteredOrders = allOrders; // Initialize filtered list
        });
      }
    } catch (e) {
      print("Error fetching orders: $e");
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Failed to fetch orders. Please try again.")),
      );
    }
  }

  void _filterOrders(String query) {
    setState(() {
      if (query.isEmpty) {
        filteredOrders = allOrders;
      } else {
        filteredOrders = allOrders
            .where((order) =>
        order.product.toLowerCase().contains(query.toLowerCase()) ||
            order.customer.toLowerCase().contains(query.toLowerCase()))
            .toList();
      }
    });
  }

  void _handleManageAction(Order order) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text("Manage Order for ${order.customer}"),
        content: const Text("Edit or cancel functionality can go here."),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Close"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Manage Orders"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Search Bar
            TextField(
              controller: _searchController,
              onChanged: _filterOrders,
              decoration: InputDecoration(
                prefixIcon: const Icon(Icons.search),
                hintText: "Search orders here...",
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                ),
              ),
            ),
            const SizedBox(height: 20),
            // Orders Table
            Expanded(
              child: filteredOrders.isEmpty
                  ? Center(
                child: Text(
                  "No orders found!",
                  style: Theme.of(context).textTheme.titleMedium,
                ),
              )
                  : ListView(
                children: filteredOrders.map((order) {
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8.0),
                    child: ListTile(
                      title: Text("Product: ${order.product}"),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("Customer: ${order.customer}"),
                          Text("Total Amount: \$${order.totalAmount}"),
                          Text("Payment Method: ${order.paymentMethod}"),
                          Text("Status: ${order.status}"),
                        ],
                      ),
                      trailing: ElevatedButton(
                        onPressed: () => _handleManageAction(order),
                        child: const Text("Manage"),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Order Model Class
class Order {
  final String product;
  final String customer;
  final double totalAmount;
  final String paymentMethod;
  final String status;

  Order({
    required this.product,
    required this.customer,
    required this.totalAmount,
    required this.paymentMethod,
    required this.status,
  });

  // Factory constructor to create Order from JSON
  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      product: json['product'] ?? 'N/A',
      customer: json['customer'] ?? 'N/A',
      totalAmount: (json['totalAmount'] ?? 0).toDouble(),
      paymentMethod: json['paymentMethod'] ?? 'N/A',
      status: json['status'] ?? 'N/A',
    );
  }
}
