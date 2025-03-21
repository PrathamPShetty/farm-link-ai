import 'package:farm_link_ai/consts/strings.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:lottie/lottie.dart';
import 'package:go_router/go_router.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:farm_link_ai/core/cubit/SplashScreen/splashScreen_cubit.dart';
import 'package:farm_link_ai/core/cubit/SplashScreen/splashScreen_state.dart';
import 'package:farm_link_ai/consts/assets.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => SplashCubit()..checkAndRequestPermissions(),
      child: Scaffold(
        backgroundColor: Colors.blueAccent,
        body: BlocBuilder<SplashCubit, SplashState>(
          builder: (context, state) {
            if (state is SplashLoading) {
              return _buildSplashScreenLoading();
            }

            if (state is SplashFailure) {
              return _buildSplashScreenContent(context);
            }

            if (state is SplashSuccess) {
              return _buildSplashScreenContent(context);
            }

            // Default loading state
            return _buildSplashScreenLoading();
          },
        ),
      ),
    );
  }

  // Loading animation while checking permissions
  Widget _buildSplashScreenLoading() {
    return Center(
      child: Lottie.asset(
        loadingAnimation, // Add your Lottie JSON file here
        width: 200,
        height: 200,
        fit: BoxFit.cover,
      ),
    );
  }

  // Content when permissions are successfully granted
  Widget _buildSplashScreenContent(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        // Lottie Animation
        Expanded(
          flex: 3,
          child: Center(
            child: Lottie.asset(
              loadingAnimation, // Add your Lottie JSON file here
              width: 200,
              height: 200,
              fit: BoxFit.cover,
            ),
          ),
        ),

        // Title and Subtitle
        const Expanded(
          flex: 2,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                welcomeText,
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              SizedBox(height: 10),
              Text(
                welcomeText1,
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.white70,
                ),
              ),
            ],
          ),
        ),

        // Get Started Button
        Expanded(
          flex: 1,
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: Colors.blueAccent,
                minimumSize: const Size(double.infinity, 50),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              onPressed: () {
                context.go('/login');  // Navigate to login page
              },
              child: const Text(
                getStart,
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  // When permissions are denied
  Widget _buildSplashScreenDenied() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'Permissions Denied',
            style: TextStyle(
              fontSize: 20,
              color: Colors.white,
            ),
          ),
          ElevatedButton(
            onPressed: () async {
              await openAppSettings();  // Open app settings to allow permissions
            },
            child: const Text('Go to Settings'),
          ),
        ],
      ),
    );
  }
}
