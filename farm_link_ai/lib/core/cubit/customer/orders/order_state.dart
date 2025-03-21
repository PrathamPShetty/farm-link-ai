part of 'order_cubit.dart';

@immutable
sealed class OrderState {}

final class OrderInitial extends OrderState {}

final class OrderLoading extends OrderState {}

final class OrderLoaded extends OrderState {
  final List<Map<String, dynamic>> orders;
  OrderLoaded(this.orders);
}

final class OrderError extends OrderState {
  final String message;
  OrderError(this.message);
}
