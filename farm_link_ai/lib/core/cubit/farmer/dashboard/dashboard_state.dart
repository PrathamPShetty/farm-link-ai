part of 'dashboard_cubit.dart';

@immutable
sealed class DashboardState {}

final class DashboardInitial extends DashboardState {}

final class DashboardLoading extends DashboardState {}

final class DashboardLoaded extends DashboardState {
  final Map<String,dynamic> products;

  DashboardLoaded({required this.products});
}

final class DashboardError extends DashboardState {
  final String message;

  DashboardError(this.message);
}