import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:vtable/vtable.dart';
import '../../../core/cubit/farmer/dashboard/dashboard_cubit.dart';

import '../../../../ui/commons/nav_bar/navbar.dart';

class Dashboard extends StatefulWidget {
  const Dashboard({super.key});

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  @override
  void initState() {
    super.initState();
    // Trigger Cubit to load data when widget is initialized
    context.read<DashboardCubit>().loadData();
  }

  @override
  Widget build(BuildContext context) {
    return NavBar(
      bodyContent: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: BlocBuilder<DashboardCubit, DashboardState>(
            builder: (context, state) {
              if (state is DashboardLoading) {
                return const Center(child: CircularProgressIndicator());
              } else if (state is DashboardLoaded) {
                final products = state.products; // Get fetched data
                return _buildDashboardUI(products);
              } else if (state is DashboardError) {
                return Center(
                  child: Text(
                    state.message,
                    style: const TextStyle(color: Colors.red),
                  ),
                );
              }
              return const Center(child: Text("Welcome to the Dashboard"));
            },
          ),
        ),
      ),
    );
  }

  // Build the main Dashboard UI
  Widget _buildDashboardUI(Map<String, dynamic> products) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Hero Section
        Container(
          height: 200,
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Colors.blue, Colors.lightBlueAccent],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Center(
            child: Text(
              "Welcome to the Dashboard",
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
        const SizedBox(height: 20),

        // Total Cards (Dynamic data from API)
        Wrap(
          spacing: 16.0,
          runSpacing: 16.0,
          children: [
            _buildTotalCard("Total Customers", products['customers'] ?? 0),
            _buildTotalCard("Total Products", products['products'] ?? 0),
            _buildTotalCard("Total Orders", products['orders'] ?? 0),
            _buildTotalCard("Total Revenue", products['revenue'] ?? 0.0),
          ],
        ),
        const SizedBox(height: 30),

        // Recent Orders Table
        Text(
          "Recent Orders",
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.bold,
            color: Colors.black,
          ),
        ),
        const SizedBox(height: 10),
        const Center(
          child: Text(
            "Order data ",
            style: TextStyle(color: Colors.grey),
          ),
        ),
      ],
    );
  }

  // Card UI for displaying totals
  Widget _buildTotalCard(String title, dynamic value) {
    return Card(
      elevation: 5,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              title,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            const SizedBox(height: 10),
            Text(
              value.toString(),
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
