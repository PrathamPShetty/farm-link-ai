import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:farm_link_ai/core/cubit/farmer/product/product_cubit.dart'; // Ensure correct import of the ProductCubit


class ManageProduct extends StatefulWidget {
  const ManageProduct({super.key});

  @override
  State<ManageProduct> createState() => _ManageProductState();
}

class _ManageProductState extends State<ManageProduct> {
  final TextEditingController _searchController = TextEditingController();
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _priceController = TextEditingController();
  final TextEditingController _unitController = TextEditingController();
  final TextEditingController _unitOfMeasureController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();

  File? _image; // Variable to store selected image
  final ImagePicker _picker = ImagePicker();

  @override
  void initState() {
    super.initState();
    context.read<ProductCubit>().loadProducts();  // Load products on init
  }

  // Pick image from gallery
  Future<void> _pickImage() async {
    try {
      final pickedFile = await _picker.pickImage(source: ImageSource.gallery);
      if (pickedFile != null) {
        setState(() {
          _image = File(pickedFile.path);
        });
        debugPrint("Image picked: ${pickedFile.path}");
      } else {
        debugPrint("No image selected");
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('No image selected')),
        );
      }
    } catch (e) {
      debugPrint("Error picking image: $e");
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Failed to pick image')),
      );
    }
  }

  // Show dialog to add new product
  void _showAddProductDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Add New Product", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        content: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Column(
              children: [
                // Title Field
                Padding(
                  padding: const EdgeInsets.only(bottom: 12.0),
                  child: TextField(
                    controller: _titleController,
                    decoration: const InputDecoration(
                      labelText: 'Product Title',
                      border: OutlineInputBorder(),
                      contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 10.0),
                    ),
                  ),
                ),
                // Price Field
                Padding(
                  padding: const EdgeInsets.only(bottom: 12.0),
                  child: TextField(
                    controller: _priceController,
                    decoration: const InputDecoration(
                      labelText: 'Price',
                      border: OutlineInputBorder(),
                      contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 10.0),
                    ),
                    keyboardType: TextInputType.number,
                  ),
                ),
                // Unit Field
                Padding(
                  padding: const EdgeInsets.only(bottom: 12.0),
                  child: TextField(
                    controller: _unitController,
                    decoration: const InputDecoration(
                      labelText: 'Unit',
                      border: OutlineInputBorder(),
                      contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 10.0),
                    ),
                  ),
                ),
                // Unit of Measure Field
                Padding(
                  padding: const EdgeInsets.only(bottom: 12.0),
                  child: TextField(
                    controller: _unitOfMeasureController,
                    decoration: const InputDecoration(
                      labelText: 'Unit of Measure',
                      border: OutlineInputBorder(),
                      contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 10.0),
                    ),
                  ),
                ),
                // Description Field
                Padding(
                  padding: const EdgeInsets.only(bottom: 12.0),
                  child: TextField(
                    controller: _descriptionController,
                    decoration: const InputDecoration(
                      labelText: 'Description',
                      border: OutlineInputBorder(),
                      contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 10.0),
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                // Image picker button
                _image == null
                    ? ElevatedButton(
                  onPressed: _pickImage,
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 12.0, horizontal: 25.0),
                    backgroundColor: Colors.blueAccent,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                  child: const Text('Pick Product Image'),
                )
                    : Column(
                  children: [
                    CircleAvatar(
                      radius: 50,
                      backgroundImage: FileImage(_image!),
                    ),
                    const SizedBox(height: 10),
                    TextButton(
                      onPressed: () {
                        setState(() {
                          _image = null;
                        });
                      },
                      child: const Text("Remove Image", style: TextStyle(color: Colors.red)),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        actions: [
          // Cancel Button
          TextButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text("Cancel", style: TextStyle(fontSize: 16, color: Colors.grey)),
          ),
          // Add Product Button
          TextButton(
            onPressed: () {
              if (_titleController.text.isEmpty ||
                  _priceController.text.isEmpty ||
                  _unitController.text.isEmpty ||
                  _unitOfMeasureController.text.isEmpty ||
                  _descriptionController.text.isEmpty) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Please fill all fields')),
                );
                return;
              }

              final product = Product(
                id: '',  // Placeholder, will be updated once added
                name: _titleController.text,
                price: _priceController.text,
                unit: _unitController.text,
                unitOfMeasure: _unitOfMeasureController.text,
                description: _descriptionController.text,
              );

              // Add the product with the image if provided
              context.read<ProductCubit>().addProduct(product, _image);

              // Close the dialog and reset fields
              Navigator.pop(context);
              _titleController.clear();
              _priceController.clear();
              _unitController.clear();
              _unitOfMeasureController.clear();
              _descriptionController.clear();
              setState(() {
                _image = null;
              });
            },
            child: const Text("Add Product", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  // Function to handle delete
  void _deleteProduct(String productId) {
    context.read<ProductCubit>().deleteProduct(productId);  // Call the cubit to delete
  }

  // Function to handle update
  void _updateProduct(Product product) {
    // Show a dialog to edit product details and update accordingly
    _titleController.text = product.name;
    _priceController.text = product.price.toString();
    _unitController.text = product.unit;
    _unitOfMeasureController.text = product.unitOfMeasure;
    _descriptionController.text = product.description;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Update Product", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        content: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Column(
              children: [
                // Title Field
                TextField(
                  controller: _titleController,
                  decoration: const InputDecoration(labelText: 'Product Title'),
                ),
                // Price Field
                TextField(
                  controller: _priceController,
                  decoration: const InputDecoration(labelText: 'Price'),
                  keyboardType: TextInputType.number,
                ),
                // Unit Field
                TextField(
                  controller: _unitController,
                  decoration: const InputDecoration(labelText: 'Unit'),
                ),
                // Unit of Measure Field
                TextField(
                  controller: _unitOfMeasureController,
                  decoration: const InputDecoration(labelText: 'Unit of Measure'),
                ),
                // Description Field
                TextField(
                  controller: _descriptionController,
                  decoration: const InputDecoration(labelText: 'Description'),
                ),
                const SizedBox(height: 12),
                ElevatedButton(
                  onPressed: () {
                    final updatedProduct = Product(
                      id: product.id,
                      name: _titleController.text,
                      price: _priceController.text,
                      unit: _unitController.text,
                      unitOfMeasure: _unitOfMeasureController.text,
                      description: _descriptionController.text,
                    );

                    context.read<ProductCubit>().updateProduct(updatedProduct, _image);

                    Navigator.pop(context); // Close the dialog
                    _titleController.clear();
                    _priceController.clear();
                    _unitController.clear();
                    _unitOfMeasureController.clear();
                    _descriptionController.clear();
                    setState(() {
                      _image = null;
                    });
                  },
                  child: const Text("Update Product"),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Manage Products")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ElevatedButton(
              onPressed: _showAddProductDialog,
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 12.0, horizontal: 25.0),
                backgroundColor: Colors.blueAccent,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              ),
              child: const Text("Add New Product"),
            ),
            const SizedBox(height: 20),
            // Display products list after loading
            BlocBuilder<ProductCubit, ProductState>(
              builder: (context, state) {
                if (state is ProductLoading) {
                  return const Center(child: CircularProgressIndicator());
                } else if (state is ProductLoaded) {
                  final products = state.products;
                  if (products.isEmpty) {
                    return const Center(child: Text("No products available"));
                  } else {
                    return Expanded(
                      child: ListView.builder(
                        itemCount: products.length,
                        itemBuilder: (context, index) {
                          final product = products[index];
                          return Card(
                            child: ListTile(
                              title: Text(product.name),
                              subtitle: Text('${product.price} ${product.unitOfMeasure}'),
                              onTap: () {
                                _showOptionsDialog(product); // Show options to update or delete
                              },
                            ),
                          );
                        },
                      ),
                    );
                  }
                } else if (state is ProductError) {
                  return Center(child: Text(state.message));
                }
                return const Center(child: Text("No products available"));
              },
            ),
          ],
        ),
      ),
    );
  }

  // Show options for update and delete
  void _showOptionsDialog(Product product) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Manage Product"),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              title: const Text("Update Product"),
              onTap: () {
                Navigator.pop(context);
                _updateProduct(product);
              },
            ),
            ListTile(
              title: const Text("Delete Product"),
              onTap: () {
                Navigator.pop(context);
                _deleteProduct(product.id); // Delete the product
              },
            ),
          ],
        ),
      ),
    );
  }
}
