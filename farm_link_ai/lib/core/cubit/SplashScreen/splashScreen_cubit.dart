// splashScreen_cubit.dart
import 'package:bloc/bloc.dart';
import 'package:farm_link_ai/core/cubit/SplashScreen/splashScreen_state.dart';
import 'package:permission_handler/permission_handler.dart';

class SplashCubit extends Cubit<SplashState> {
  SplashCubit() : super(SplashInitial());

  // Function to check and request permissions
  Future<void> checkAndRequestPermissions() async {
    emit(SplashLoading());  // Emit loading state to indicate permission check is in progress

    Map<Permission, PermissionStatus> statuses = await [
      Permission.camera,
      Permission.storage,
      Permission.photos, // For iOS
    ].request();

    bool allPermissionsGranted = statuses.values.every((status) => status.isGranted);

    if (allPermissionsGranted) {
      emit(SplashSuccess());  // Emit success state if all permissions are granted
    } else {
      emit(SplashFailure());  // Emit failure state if permissions are not granted
    }
  }
}
