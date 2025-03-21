import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:lottie/lottie.dart';

import 'package:farm_link_ai/consts/assets.dart';
import 'package:farm_link_ai/utils/hive_utils.dart';
import 'package:farm_link_ai/core/cubit/login/auth_cubit.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  _LoginSignupPageState createState() => _LoginSignupPageState();
}

class _LoginSignupPageState extends State<Login> {
  bool isFarmer = true;
  bool isLogin = true;
  final TextEditingController emailController = TextEditingController();
  final TextEditingController AadharController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  final TextEditingController nameController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => AuthCubit(),
      child: Scaffold(
        body: SafeArea(
          child: BlocConsumer<AuthCubit, AuthState>(
            listener: (context, state) {
              if (state is AuthSuccess) {
                HiveUtils.saveUserType(isFarmer);
                GoRouter.of(context).go(isFarmer ? '/farmer' : '/customer');
              } else if (state is AuthFailure) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text(state.error)),
                );
              }
            },
            builder: (context, state) {
              return SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Lottie.asset(
                        loginAnimation,
                        height: 150,
                      ),
                      Text(
                        isLogin ? "Login" : "Sign Up",
                        style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 10),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          ChoiceChip(
                            label: const Text("Farmer"),
                            selected: isFarmer,
                            onSelected: (selected) {
                              setState(() {
                                isFarmer = selected;
                              });
                            },
                          ),
                          const SizedBox(width: 10),
                          ChoiceChip(
                            label: const Text("Customer"),
                            selected: !isFarmer,
                            onSelected: (selected) {
                              setState(() {
                                isFarmer = !selected;
                              });
                            },
                          ),
                        ],
                      ),
                      const SizedBox(height: 20),
                      if (state is AuthLoading) const CircularProgressIndicator(),
                      if (isLogin) buildLoginFields(),
                      if (!isLogin) buildSignupFields(),
                      const SizedBox(height: 20),
                      ElevatedButton(
                        onPressed: () {
                          final cubit = context.read<AuthCubit>();
                          if (isLogin) {
                            cubit.login(
                              isFarmer ? AadharController.text : emailController.text,
                              passwordController.text,
                              isFarmer,
                            );

                          } else {
                            final data = {
                              'email': emailController.text,
                              'password': passwordController.text,
                              'name': nameController.text,
                              'phone': phoneController.text,
                              if (isFarmer) 'aadhaarNumber': AadharController.text,
                            };
                            cubit.register(data, isFarmer);
                          }
                        },
                        child: Text(isLogin ? "Login" : "Sign Up"),
                      ),
                      TextButton(
                        onPressed: () {
                          setState(() {
                            isLogin = !isLogin;
                          });
                        },
                        child: Text(
                          isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login",
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }
  Widget buildLoginFields() {
    return Column(
      children: [
        isFarmer
            ? TextField(
          controller: AadharController,
          decoration: InputDecoration(
            labelText: "Aadhar Card Number",
          ),
          keyboardType: TextInputType.number,
        )
            : TextField(
          controller: emailController,
          decoration: InputDecoration(
            labelText: "Email Id",
          ),
          keyboardType: TextInputType.emailAddress,
        ),
        TextField(
          controller: passwordController,
          decoration: const InputDecoration(labelText: "Password"),
          obscureText: true,
        ),
      ],
    );
  }


  Widget buildSignupFields() {
    return Column(
      children: [
        if (isFarmer)
          TextField(
            controller: AadharController,
            decoration: const InputDecoration(labelText: "Aadhar Card Number"),
            keyboardType: TextInputType.number,
          ),
        TextField(
          controller: nameController,
          decoration: const InputDecoration(labelText: "Name"),
        ),
        TextField(
          controller: emailController,
          decoration: const InputDecoration(labelText: "Email"),
          keyboardType: TextInputType.emailAddress,
        ),
        TextField(
          controller: passwordController,
          decoration: const InputDecoration(labelText: "Password"),
          obscureText: true,
        ),
        TextField(
          controller: phoneController,
          decoration: const InputDecoration(labelText: "Phone Number"),
          keyboardType: TextInputType.phone,
        ),
      ],
    );
  }
}
