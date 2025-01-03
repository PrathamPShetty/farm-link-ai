import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:farm_link_ai/core/cubit/customer/product/product_cubit.dart';
import '../../../consts/host.dart';
import '../../../core/cubit/customer/product/product.dart';
import '../../../utils/shared_pref.dart';
import '../../commons/nav_bar/NavBar.dart';


const String banner = 'assets/images/banner.jpg';

class CustomerProduct extends StatefulWidget {
  const CustomerProduct({super.key});

  @override
  State<CustomerProduct> createState() => _CustomerProductState();
}

class _CustomerProductState extends State<CustomerProduct> {
  final TextEditingController _searchController = TextEditingController();
  String searchQuery = "";

  @override
  void initState() {
    super.initState();
    context.read<CustomerProductCubit>().fetchProducts();
  }

  @override
  Widget build(BuildContext context) {
    return NavBar(
      bodyContent: BlocBuilder<CustomerProductCubit, ProductState>(
        builder: (context, state) {
          if (state is ProductLoading) {
            return const Center(child: CircularProgressIndicator());
          } else if (state is ProductLoaded) {
            final products = state.products
                .where((product) =>
                product.title.toLowerCase().contains(searchQuery.toLowerCase()))
                .toList();  // Filter the products based on the search query

            return SingleChildScrollView(
              child: Column(
                children: [
                  Container(
                    height: 250,
                    width: double.infinity,
                    decoration: const BoxDecoration(
                      image: DecorationImage(
                        image: AssetImage(banner),
                        fit: BoxFit.cover,
                      ),
                    ),
                    alignment: Alignment.center,
                    child: const Text(
                      "Our Products",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        backgroundColor: Colors.black54,
                      ),
                    ),
                  ),
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 20, vertical: 20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Text(
                          "Our Products",
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 28,
                            color: Color(0xFFEDDD5E),
                          ),
                        ),
                        Text(
                          "Our Products For Healthy Living",
                          style: TextStyle(
                            fontWeight: FontWeight.w600,
                            fontSize: 18,
                            color: Color(0xFF404A3D),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: TextField(
                      controller: _searchController,
                      decoration: InputDecoration(
                        prefixIcon: const Icon(Icons.search),
                        hintText: "Search products by title here",
                        hintStyle: const TextStyle(color: Colors.grey),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30),
                          borderSide: const BorderSide(width: 1),
                        ),
                        contentPadding: const EdgeInsets.symmetric(
                            vertical: 15, horizontal: 20),
                      ),
                      onChanged: (value) {
                        setState(() {
                          searchQuery = value;
                        });
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: GridView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      gridDelegate:
                      const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        childAspectRatio: 0.75,
                        crossAxisSpacing: 16,
                        mainAxisSpacing: 16,
                      ),
                      itemCount: products.length,
                      itemBuilder: (context, index) {
                        final product = products[index];
                        return ProductItem(product: product);
                      },
                    ),
                  ),
                  if (products.isEmpty) // Show message when no products match the search query
                    const Padding(
                      padding: EdgeInsets.all(20.0),
                      child: Text(
                        "No products found.",
                        style: TextStyle(fontSize: 18, color: Colors.grey),
                      ),
                    ),
                ],
              ),
            );
          } else if (state is ProductError) {
            return Center(child: Text(state.message));
          }
          return const Center(child: Text("No products available"));
        },
      ),
    );
  }
}
class ProductItem extends StatelessWidget {
  final Product product;

  const ProductItem({required this.product});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        _showProductDetails(context, product);
      },
      child: Card(
        elevation: 6,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Flexible(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(15),
                child: Image.network(
                  "http://172.232.110.246:8001/uploads/farmer/product/${product.picture}",
                  fit: BoxFit.cover,
                  height: 180,
                  width: double.infinity,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                children: [
                  Text(
                    product.title,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 16),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "₹${product.price}",
                        style: const TextStyle(
                            fontWeight: FontWeight.w600, color: Colors.green),
                      ),
                      const SizedBox(width: 8),
                      const Text(
                        "/unit",
                        style: TextStyle(fontSize: 12, color: Colors.grey),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Modal Bottom Sheet to show product details and form
  void _showProductDetails(BuildContext context, Product product) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return ProductOrderForm(product: product);
      },
    );
  }
}


class ProductOrderForm extends StatefulWidget {
  final Product product;

  const ProductOrderForm({required this.product});

  @override
  State<ProductOrderForm> createState() => _ProductOrderFormState();
}

class _ProductOrderFormState extends State<ProductOrderForm> {

  Dio dio = Dio();
  final _formKey = GlobalKey<FormState>();
  final Map<String, String> formData = {};

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
        left: 16,
        right: 16,
        top: 20,
      ),
      child: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Text(
                  "Order ${widget.product.title}",
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 22,
                    color: Color(0xFF404A3D),
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Input Fields
              _buildTextField("Name", "name"),
              _buildTextField("Phone", "phone"),
              _buildTextField("Email", "email"),
              _buildTextField("Quantity", "quantity"),
              _buildTextField("Address", "address"),
              _buildTextField("Location", "location"),
              _buildTextField("City", "city"),
              _buildTextField("Pin Code", "pin"),
              _buildTextField("Payment Method", "paymentMethod"),
              _buildTextField("Transaction ID", "transactionId"),

              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _submitForm,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF404A3D),
                    padding: const EdgeInsets.symmetric(vertical: 12),
                  ),
                  child: const Text(
                    "Submit Order",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTextField(String label, String key, {String? initialValue}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: TextFormField(
        initialValue: initialValue,
        decoration: InputDecoration(
          labelText: label,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
        onSaved: (value) {
          formData[key] = value ?? '';
        },
        validator: (value) {
          if (value == null || value.isEmpty) {
            return "$label is required";
          }
          return null;
        },
      ),
    );
  }

  Future<void> _submitForm() async{
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      print("Form Data: $formData");
      formData['product'] = widget.product.id.toString();
      formData['price'] = widget.product.price.toString();

      final token = await getToken(); // Get the token asynchronously

      // Set the token in headers before making the request
      dio.options.headers = {
        'auth-token': token,
      };

      final response = await dio.post('$host/customer/orderProduct', data: formData);
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Order placed successfully!")),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Failed to place order. Please try again later.")),
        );
      }

      Navigator.pop(context); // Close the modal
    }
  }
}
