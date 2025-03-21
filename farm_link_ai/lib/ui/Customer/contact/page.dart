import 'package:dio/dio.dart';
import 'package:farm_link_ai/ui/commons/nav_bar/NavBar.dart';
import 'package:flutter/material.dart';

import '../../../consts/host.dart';
import '../../../utils/shared_pref.dart';

class Contact extends StatefulWidget {
  const Contact({super.key});

  @override
  State<Contact> createState() => _ContactState();
}
class _ContactState extends State<Contact> {
  Dio dio = Dio();

  final _formKey = GlobalKey<FormState>();
  final Map<String, String> _formInfo = {
    "name": "",
    "phone": "",
    "email": "",
    "subject": "",
    "message": "",
  };

  bool _isLoading = false; // To track the loading state

  Future<void> handleSubmit() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true; // Set loading to true
      });

      _formKey.currentState!.save();
      final token = await getToken(); // Get the token asynchronously

      dio.options.headers = {
        'auth-token': token,
      };

      try {
        final response = await dio.post(
          '$host/customer/customerFeedback',
          data: _formInfo,
        );

        if (response.statusCode == 200) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text("Feedback submitted successfully!")),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text("Failed to submit feedback. Please try again later.")),
          );
        }
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("An error occurred: $e")),
        );
      } finally {
        setState(() {
          _isLoading = false; // Set loading to false
        });
        _formKey.currentState!.reset();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return NavBar(
      bodyContent: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: Card(
            elevation: 8,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: SingleChildScrollView(
                child: Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Text(
                        "Get in Touch",
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF404A3D),
                        ),
                      ),
                      const SizedBox(height: 10),
                      Text(
                        "We'd love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.",
                        style: TextStyle(color: Colors.grey[700], fontSize: 16),
                      ),
                      const SizedBox(height: 20),
                      ..._buildTextFormFields(),
                      const SizedBox(height: 20),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: _isLoading ? null : handleSubmit,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF404A3D),
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8),
                            ),
                          ),
                          child: _isLoading
                              ? const SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(
                              color: Colors.white,
                              strokeWidth: 2.0,
                            ),
                          )
                              : const Text(
                            "Submit",
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFFFFFFFF),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  List<Widget> _buildTextFormFields() {
    return [
      _buildField(
        label: "Enter your name",
        key: "name",
        validator: (value) => value!.isEmpty ? "Please enter your name." : null,
      ),
      _buildField(
        label: "Enter your contact number",
        key: "phone",
        validator: (value) =>
        value!.isEmpty ? "Please enter your contact number." : null,
      ),
      _buildField(
        label: "Enter your email id",
        key: "email",
        validator: (value) {
          if (value!.isEmpty) return "Please enter your email.";
          if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(value)) {
            return "Please enter a valid email.";
          }
          return null;
        },
      ),
      _buildField(
        label: "Enter Subject",
        key: "subject",
        validator: (value) => value!.isEmpty ? "Please enter a subject." : null,
      ),
      _buildField(
        label: "Your Message",
        key: "message",
        maxLines: 5,
        validator: (value) =>
        value!.isEmpty ? "Please enter your message." : null,
      ),
    ];
  }

  Widget _buildField({
    required String label,
    required String key,
    int maxLines = 1,
    required String? Function(String?) validator,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: TextFormField(
        decoration: InputDecoration(
          labelText: label,
          border: const OutlineInputBorder(),
          filled: true,
          fillColor: Colors.grey[100],
        ),
        maxLines: maxLines,
        validator: validator,
        onSaved: (value) => _formInfo[key] = value!,
      ),
    );
  }
}
