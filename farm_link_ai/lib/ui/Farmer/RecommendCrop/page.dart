import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:farm_link_ai/consts/host.dart';

class RecommendCrop extends StatefulWidget {
  const RecommendCrop({super.key});

  @override
  State<RecommendCrop> createState() => _RecommendCropState();
}

class _RecommendCropState extends State<RecommendCrop> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _nitrogenController = TextEditingController();
  final TextEditingController _phosphorusController = TextEditingController();
  final TextEditingController _potassiumController = TextEditingController();
  final TextEditingController _temperatureController = TextEditingController();
  final TextEditingController _humidityController = TextEditingController();
  final TextEditingController _phValueController = TextEditingController();
  final TextEditingController _rainfallController = TextEditingController();

  // Function to handle API request
  Future<void> _submitForm() async {
    if (_formKey.currentState?.validate() ?? false) {
      // Collect form data
      final formData = {
        "features": [
          double.tryParse(_nitrogenController.text) ?? 0.0,
          double.tryParse(_phosphorusController.text) ?? 0.0,
          double.tryParse(_potassiumController.text) ?? 0.0,
          double.tryParse(_temperatureController.text) ?? 0.0,
          double.tryParse(_humidityController.text) ?? 0.0,
          double.tryParse(_phValueController.text) ?? 0.0,
          double.tryParse(_rainfallController.text) ?? 0.0,
        ],
      };

      try {
        // Replace with your API URL
        const String apiUrl = '$flask/predict_crop';
        final response = await http.post(
          Uri.parse(apiUrl),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode(formData),
        );

        if (response.statusCode == 200) {
          final responseData = jsonDecode(response.body);
          if (responseData['success']) {
            _showResultDialog(
              crop: responseData['predicted_crop'],
              tips: responseData['growing_tips'],
            );
          } else {
            _showErrorDialog('Error', 'Failed to get recommendation.');
          }
        } else {
          _showErrorDialog('Error', 'Server error: ${response.statusCode}');
        }
      } catch (e) {
        _showErrorDialog('Error', 'An error occurred: $e');
      }
    }
  }

  void _showResultDialog({required String crop, required String tips}) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Crop Recommendation'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Predicted Crop: $crop'),
              const SizedBox(height: 10),
              Text('Growing Tips:\n$tips'),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  void _showErrorDialog(String title, String message) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(title),
          content: Text(message),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Crop Recommendation'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildTextField(_nitrogenController, 'Nitrogen (N)', 'Enter nitrogen value'),
              _buildTextField(_phosphorusController, 'Phosphorus (P)', 'Enter phosphorus value'),
              _buildTextField(_potassiumController, 'Potassium (K)', 'Enter potassium value'),
              _buildTextField(_temperatureController, 'Temperature', 'Enter temperature value'),
              _buildTextField(_humidityController, 'Humidity', 'Enter humidity value'),
              _buildTextField(_phValueController, 'pH Value', 'Enter pH value'),
              _buildTextField(_rainfallController, 'Rainfall', 'Enter rainfall value'),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  ElevatedButton(
                    onPressed: _clearForm,
                    style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
                    child: const Text('Clear All'),
                  ),
                  ElevatedButton(
                    onPressed: _submitForm,
                    style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                    child: const Text('Submit'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTextField(TextEditingController controller, String label, String hint) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10.0),
      child: TextFormField(
        controller: controller,
        keyboardType: TextInputType.number,
        decoration: InputDecoration(labelText: label, hintText: hint),
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'Please enter $label';
          }
          return null;
        },
      ),
    );
  }

  void _clearForm() {
    _nitrogenController.clear();
    _phosphorusController.clear();
    _potassiumController.clear();
    _temperatureController.clear();
    _humidityController.clear();
    _phValueController.clear();
    _rainfallController.clear();
  }
}
