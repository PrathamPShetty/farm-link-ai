import 'package:farm_link_ai/core/cubit/customer/orders/order_cubit.dart';
import 'package:farm_link_ai/core/cubit/farmer/dashboard/dashboard_cubit.dart';
import 'package:farm_link_ai/core/router/router.dart';
import 'package:farm_link_ai/ui/SplashScreen/page.dart';
import 'package:farm_link_ai/utils/hive_utils.dart';
import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shimmer/shimmer.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:farm_link_ai/core/cubit/SplashScreen/splashScreen_cubit.dart'; // Import flutter_bloc for BlocProvider
import 'package:farm_link_ai/core/cubit/farmer/product/product_cubit.dart'; // Import flutter_bloc for BlocProvider
import 'package:farm_link_ai/core/cubit/customer/product/product_cubit.dart'; // Import flutter_bloc for BlocProvider

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await HiveUtils.init();

  runApp(
    MultiBlocProvider(
        providers: [
          BlocProvider(create: (context) => SplashCubit()),
          BlocProvider(create: (context) => ProductCubit()),
          BlocProvider(create: (context) => CustomerProductCubit()),
          BlocProvider(create: (context)=>DashboardCubit()),
          BlocProvider(create: (context)=>OrderCubit()),
        ],
      child: const MyApp(),  // MyApp should be the child of the BlocProvider
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      routerConfig: router,  // Define your router configuration here
    );
  }
}


