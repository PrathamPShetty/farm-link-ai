import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:meta/meta.dart';

import '../../../../consts/host.dart';
import '../../../../utils/shared_pref.dart';

part 'dashboard_state.dart';

class DashboardCubit extends Cubit<DashboardState> {
  final Dio _dio = Dio();
  DashboardCubit() : super(DashboardInitial());


  Future<void> loadData() async {
    try {
      emit(DashboardLoading());
      final token = await getToken(); // Get the token asynchronously

      // Set the token in headers before making the request
      _dio.options.headers = {
        'auth-token': token,
      };
      final response = await _dio.get('$host/farmer/getCounts');
      debugPrint(response.data.toString());
      if (response.statusCode == 200) {
        emit(DashboardLoaded(products: response.data));
      } else {
        emit(DashboardError("Failed to load data"));
      }
    } catch (e) {
      emit(DashboardError("An error occurred: $e"));
    }
  }

}
