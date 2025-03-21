import 'dart:io';
import 'dart:convert'; // For jsonEncode
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:dio/dio.dart'; // For making HTTP requests
import 'package:farm_link_ai/consts/host.dart';

class DetectCrop extends StatefulWidget {
  const DetectCrop({super.key});

  @override
  State<DetectCrop> createState() => _DetectCropState();
}

class _DetectCropState extends State<DetectCrop> {
  File? _selectedFile;
  final ImagePicker _picker = ImagePicker();

  // Function to pick an image from the gallery or camera
  Future<void> _chooseFile() async {
    // Show a dialog to ask whether to pick from gallery or camera
    final ImageSource? source = await showDialog<ImageSource>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Select Source'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context, ImageSource.camera),
              child: const Text('Camera'),
            ),
            TextButton(
              onPressed: () => Navigator.pop(context, ImageSource.gallery),
              child: const Text('Gallery'),
            ),
          ],
        );
      },
    );

    if (source == null) return;

    // Pick the image from the selected source
    final XFile? image = await _picker.pickImage(source: source);

    if (image != null) {
      setState(() {
        _selectedFile = File(image.path);
      });
    }
  }

  // Function to send the image file to the API and get the response
  Future<void> _predictCrop() async {
    if (_selectedFile == null) return;

    try {
      // Show loading indicator while waiting for the API response
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (context) => const Center(child: CircularProgressIndicator()),
      );

      // Prepare the API request
      FormData formData = FormData.fromMap({
        'image': await MultipartFile.fromFile(_selectedFile!.path),
      });

      Dio dio = Dio();
      final response = await dio.post(
        '$flask/predict', // Replace with your actual API URL
        data: formData,
      );

      // Close the loading dialog
      Navigator.pop(context);

      if (response.statusCode == 200) {
        final data = response.data;

        // Check if the response contains predicted crop and growing tips
        if (data['success']) {
          final String predictedCrop = data['prediction'];
          final String pesticiderecommendation = data['pesticide_recommendation'];

          // Show the result in a dialog
          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                title: const Text('Prediction Result'),
                content: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Predicted Crop: $predictedCrop'),
                    const SizedBox(height: 10),
                    Text('Growing Tips: $pesticiderecommendation'),
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
        } else {
          // Handle failure
          _showErrorDialog('Failed to predict crop');
        }
      } else {
        // Handle error in response
        _showErrorDialog('Failed to load prediction');
      }
    } catch (e) {
      // Handle exception
      Navigator.pop(context);
      _showErrorDialog('An error occurred while predicting the crop.');
    }
  }

  // Function to show error dialog
  void _showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Error'),
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
        title: const Text('Detect Crop Disease'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Title
            const Text(
              'Detect Crop Disease',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 20),

            // File selection section
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    _selectedFile != null
                        ? _selectedFile!.path.split('/').last
                        : 'No file chosen',
                    style: const TextStyle(fontSize: 16),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                const SizedBox(width: 10),
                ElevatedButton(
                  onPressed: _chooseFile,
                  child: const Text('Choose File'),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Preview section
            if (_selectedFile != null)
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Selected File:',
                    style: TextStyle(fontSize: 16),
                  ),
                  const SizedBox(height: 10),
                  Image.file(
                    _selectedFile!,
                    height: 200,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                ],
              ),

            const SizedBox(height: 20),

            // Predict button
            ElevatedButton(
              onPressed: _predictCrop,
              child: const Text('Predict Crop Disease'),
            ),
          ],
        ),
      ),
    );
  }
}
