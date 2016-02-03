/**
 * Created by Kaygee on 29/01/2016.
 */


angular.module('mogoDashboard', [
    'ui.router',
    'ui.bootstrap',
    'templates'
])
    .config(['$stateProvider', function ($stateProvider) {

    }])
    .run([function () {

    }]);
/**
 * Created by Kaygee on 29/01/2016.
 */

/**
 * Created by Kaygee on 29/01/2016.
 */

angular.module('mogoDashboard')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {
            controller : 'SPHomeController',
            url : '/',
            templateUrl : 'src/home/home.html'
        })
}]);
/**
 * Created by Kaygee on 29/01/2016.
 */

angular.module('mogoDashboard')
    .controller('SPHomeController', ['$scope', function ($scope) {
        $scope.page = 'home';
}]);