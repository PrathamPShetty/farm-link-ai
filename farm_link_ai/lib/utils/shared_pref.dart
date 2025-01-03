import 'package:shared_preferences/shared_preferences.dart';


Future<String?> setToken(token) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('authToken', token);
  print('Token saved');
}

Future<String?> getToken() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getString('authToken');
}


Future<void> clearToken() async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.remove('authToken');
  print('Token removed');
}
