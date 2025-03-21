import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';
import 'package:dio/dio.dart';
import 'package:farm_link_ai/consts/host.dart';
import 'package:farm_link_ai/utils/shared_pref.dart';
part 'auth_state.dart';



class AuthCubit extends Cubit<AuthState> {
  AuthCubit() : super(AuthInitial());

  final Dio _dio = Dio(); // Use Dio for HTTP calls (or any other HTTP client).

  Future<void> login(String emailOrAadhar, String password, bool isFarmer) async {
    emit(AuthLoading());
    final endpoint = isFarmer ? '$host/farmer/Login' : '$host/customer/Login';
    final data = isFarmer
        ? {
      'aadhaarNumber': emailOrAadhar,
      'password': password,
    }
        : {
      'email': emailOrAadhar,
      'password': password,
    };

    try {
      final response = await _dio.post(
        endpoint,
        data:data,
      );
      setToken(response.data['token']);
      emit(AuthSuccess(response.data)); // Emit success state with API response.
    } catch (error) {
      emit(AuthFailure(error.toString()));
    }
  }

  Future<void> register(Map<String, dynamic> data, bool isFarmer) async {
    emit(AuthLoading());
    final endpoint = isFarmer ? '$host/farmer/Register' : '$host/customer/Register';
    try {
      final response = await _dio.post(endpoint, data: data);
      setToken(response.data['token']);
      emit(AuthSuccess(response.data)); // Emit success state with API response.
    } catch (error) {
      emit(AuthFailure(error.toString()));
    }
  }
}
