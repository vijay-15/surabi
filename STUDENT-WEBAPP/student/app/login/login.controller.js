(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['logger', '$state', '$scope', '$rootScope', '$timeout', 'authService', 'cacheService', 'loginService'];

    /* @ngInject */
    function LoginController(logger, $state, $scope, $rootScope, $timeout, authService, cacheService, loginService) {

        var vm = this;

        $rootScope.page = 'login';

        authService.removeToken();

        activate();

        function successHandler(data, status) {

          $rootScope.showProgress = false;

          authService.setToken(data.data.token);
          // Go to Dashboard
          $state.go('dashboard');
        }

        function failureHandler(data, status) {

          $rootScope.showProgress = false;

          if(status == 400) {
            logger.error("Invalid Username / Password");
          }
          else {
            logger.error(data.data.message)
          }
        }

        function activate() {

          vm.formData = {};

          $rootScope.showProgress = false;

          vm.submitForm = function() {

            $rootScope.showProgress = true;
            loginService
                .login(vm.formData)
                .then(successHandler, failureHandler);
          }

        }
    }
})();
