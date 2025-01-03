part of 'auth_cubit.dart';

@immutable
abstract class AuthState {}

class AuthInitial extends AuthState {}

class AuthLoading extends AuthState {}

class AuthSuccess extends AuthState {
  final dynamic data; // Response data from API.
  AuthSuccess(this.data);
}

class AuthFailure extends AuthState {
  final String error;
  AuthFailure(this.error);
}
