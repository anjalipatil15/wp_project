angular
  .module("discordAuthApp", [])

  .directive("compareTo", () => ({
    require: "ngModel",
    scope: {
      otherModelValue: "=compareTo",
    },
    link: (scope, element, attrs, ngModel) => {
      ngModel.$validators.compareTo = (val) => val === scope.otherModelValue;
      scope.$watch("otherModelValue", () => ngModel.$validate());
    },
  }))

  .controller("LoginController", [
    "$scope",
    "$timeout",
    ($scope, $timeout) => {
      $scope.user = {
        email: "",
        password: "",
      };

      $scope.errorMessage = "";
      $scope.isLoading = false;

      $scope.submitLogin = () => {
        if ($scope.loginForm.$valid) {
          $scope.isLoading = true;

          $timeout(() => {
            $scope.isLoading = false;

            if (
              $scope.user.email === "test@example.com" &&
              $scope.user.password === "Password@123"
            ) {
              console.log("Login successful:", $scope.user);
              window.location.href = "index.html";
            } else {
              $scope.errorMessage = "Invalid email or password. Please try again.";
            }
          }, 1000);
        } else {
          $scope.loginForm.email.$setTouched();
          $scope.loginForm.password.$setTouched();
          $scope.errorMessage = "Please fix the errors in the form.";
        }
      };
    },
  ])

  .controller("RegisterController", [
    "$scope",
    "$timeout",
    ($scope, $timeout) => {
      $scope.user = {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        terms: false,
      };

      $scope.errorMessage = "";
      $scope.isLoading = false;

      $scope.submitRegister = () => {
        if ($scope.registerForm.$valid) {
          $scope.isLoading = true;

          $timeout(() => {
            $scope.isLoading = false;

            if ($scope.user.email !== "taken@example.com") {
              console.log("Registration successful:", $scope.user);
              window.location.href = "login.html";
            } else {
              $scope.errorMessage = "This email is already registered.";
            }
          }, 1500);
        } else {
          angular.forEach($scope.registerForm.$error, (field) => {
            angular.forEach(field, (errorField) => {
              errorField.$setTouched();
            });
          });
          $scope.errorMessage = "Please fix the errors in the form.";
        }
      };
    },
  ]);
