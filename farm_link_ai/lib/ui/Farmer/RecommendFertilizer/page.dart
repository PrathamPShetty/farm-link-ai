import 'dart:convert';
import 'package:farm_link_ai/consts/host.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:farm_link_ai/consts/host.dart';

class RecommendFertilizer extends StatefulWidget {
  const RecommendFertilizer({super.key});

  @override
  State<RecommendFertilizer> createState() => _RecommendFertilizerState();
}

class _RecommendFertilizerState extends State<RecommendFertilizer> {
  // Form data variables
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  TextEditingController temperatureController = TextEditingController();
  TextEditingController humidityController = TextEditingController();
  TextEditingController soilMoistureController = TextEditingController();
  TextEditingController nitrogenController = TextEditingController();
  TextEditingController potassiumController = TextEditingController();
  TextEditingController phosphorusController = TextEditingController();

  String? selectedSoilType;
  String? selectedCropType;
  bool loading = false;
// Example list for soil types and crop types
  List<String> soilTypes = ["Sandy", "Loamy", "Black", "Red", "Clayey"];
  List<String> cropTypes = [  "Maize", "Sugarcane", "Cotton", "Tobacco",
    "Paddy",
    "Barley",
    "Wheat",
    "Millets",
    "Oil seeds",
    "Pulses",
    "Ground Nuts"];

  // API URL (replace with your API endpoint)
  final String apiUrl = '$flask/predict_fertilizer';

  // Handle form submission
  Future<void> handleSubmit() async {
    if (_formKey.currentState?.validate() ?? false) {
      setState(() {
        loading = true;
      });

      // Prepare data for API call
      final Map<String, dynamic> features = {
        'jsont': temperatureController.text,
        'jsonh': humidityController.text,
        'jsonsm': soilMoistureController.text,
        'jsonn': nitrogenController.text,
        'jsonp': potassiumController.text,
        'jsonk': phosphorusController.text,
        'jsonsoil': selectedSoilType,
        'jsoncrop': selectedCropType,
      };

      try {
        // Make the API call
        final response = await http.post(
          Uri.parse(apiUrl),
          headers: {
            'Content-Type': 'application/json',
          },
          body: json.encode(features),
        );

        if (response.statusCode == 200) {
          // If the server returns a successful response
          final responseData = json.decode(response.body);
          // Handle the response (e.g., show recommendations)
          showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: Text('Fertilizer Recommendations'),
                content: Column(
                  mainAxisSize: MainAxisSize.min, // Ensures the dialog resizes to fit its content
                  children: [
                    Text('Predicted Fertilizer: ${responseData['predicted_fertilizer']}'),
                    SizedBox(height: 8), // Adds spacing between the texts
                    Text('Water Requirements: ${responseData['water_requirements']}'),
                  ],
                ),
                actions: [
                  TextButton(
                    onPressed: () => Navigator.pop(context),
                    child: Text('OK'),
                  ),
                ],
              );
            },
          );
        } else {
          // If the server returns an error
          throw Exception('Failed to load recommendations');
        }
      } catch (error) {
        // Handle any errors
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text('Error'),
              content: Text('Failed to get recommendations. Please try again later.'),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: Text('OK'),
                ),
              ],
            );
          },
        );
      } finally {
        setState(() {
          loading = false;
        });
      }
    }
  }

  // Handle clear button click
  void handleClear() {
    setState(() {
      temperatureController.clear();
      humidityController.clear();
      soilMoistureController.clear();
      nitrogenController.clear();
      potassiumController.clear();
      phosphorusController.clear();
      selectedSoilType = null;
      selectedCropType = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Fertilizer Recommendation'),
      ),
      body: SingleChildScrollView(
        // Wrap the content to make it scrollable
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Temperature Field
                TextFormField(
                  controller: temperatureController,
                  decoration: InputDecoration(
                    labelText: 'Temperature (°C)',
                    hintText: 'Enter temperature value',
                  ),
                  keyboardType: TextInputType.number,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter temperature';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 16),

                // Humidity Field
                TextFormField(
                  controller: humidityController,
                  decoration: InputDecoration(
                    labelText: 'Humidity (%)',
                    hintText: 'Enter humidity value',
                  ),
                  keyboardType: TextInputType.number,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter humidity';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 16),

                // Soil Moisture Field
                TextFormField(
                  controller: soilMoistureController,
                  decoration: InputDecoration(
                    labelText: 'Soil Moisture (%)',
                    hintText: 'Enter soil moisture value',
                  ),
                  keyboardType: TextInputType.number,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter soil moisture';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 16),

                // Soil Type Dropdown
                DropdownButtonFormField<String>(
                  value: selectedSoilType,
                  hint: Text('Select Soil Type'),
                  items: soilTypes.map((soilType) {
                    return DropdownMenuItem<String>(
                      value: soilType,
                      child: Text(soilType),
                    );
                  }).toList(),
                  onChanged: (value) {
                    setState(() {
                      selectedSoilType = value;
                    });
                  },
                  validator: (value) {
                    if (value == null) {
                      return 'Please select soil type';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 16),

                // Crop Type Dropdown
                DropdownButtonFormField<String>(
                  value: selectedCropType,
                  hint: Text('Select Crop Type'),
                  items: cropTypes.map((cropType) {
                    return DropdownMenuItem<String>(
                      value: cropType,
                      child: Text(cropType),
                    );
                  }).toList(),
                  onChanged: (value) {
                    setState(() {
                      selectedCropType = value;
                    });
                  },
                  validator: (value) {
                    if (value == null) {
                      return 'Please select crop type';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 16),

                // Nitrogen Field
                TextFormField(
                  controller: nitrogenController,
                  decoration: InputDecoration(
                    labelText: 'Nitrogen (N)',
                    hintText: 'Enter nitrogen value',
                  ),
                  keyboardType: TextInputType.number,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter nitrogen value';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 16),

                // Potassium Field
                TextFormField(
                  controller: potassiumController,
                  decoration: InputDecoration(
                    labelText: 'Potassium (K)',
                    hintText: 'Enter potassium value',
                  ),
                  keyboardType: TextInputType.number,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter potassium value';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 16),

                // Phosphorus Field
                TextFormField(
                  controller: phosphorusController,
                  decoration: InputDecoration(
                    labelText: 'Phosphorus (P)',
                    hintText: 'Enter phosphorus value',
                  ),
                  keyboardType: TextInputType.number,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter phosphorus value';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 16),

                // Buttons
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    ElevatedButton(
                      onPressed: handleClear,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.red,
                      ),
                      child: Text('Clear All'),
                    ),
                    SizedBox(width: 16),
                    ElevatedButton(
                      onPressed: loading ? null : handleSubmit,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.yellow,
                      ),
                      child: loading
                          ? CircularProgressIndicator(color: Colors.black)
                          : Text('Submit'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
