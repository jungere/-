angular.module('starter.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('ProductsCtrl', function($scope) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 },
            { title: 'few', id: 7 },
            { title: 'bbww', id: 8 },
            { title: 'fewfewf', id: 9 },
            { title: 'iiiiii', id: 10 },
            { title: 'mmmmmm', id: 11 },
            { title: 'vvvvvv', id: 12 }
        ];
    })
    .controller('PaymentCtrl', function($scope, $stateParams, $state) {
        console.log($state)
        var order = {
            id : "",
            amount : $stateParams.amount,
            remark : ""
        }
        $scope.order = angular.copy(order);
        $scope.doPayment = function(){
            console.log($scope.order);
        }
    })
    .controller('PaymentsCtrl', function($scope, $stateParams, $state, $ionicModal, PayAPI) {
        
        $scope.businesss = [{
            // id : 16,
            // name : '麦宝商户',
            // key : "544vI4S8uB",
            // secret : "e2omdw4k1gL5T5hJUeS6"
            id : 20,
            name : '麦宝商户',
            key : "nvdSRWrm7u",
            secret : "6o4suRq9NfpYnbYrbl4F"
        }]
        
        var order = {
            id : "",
            amount : "",
            remark : "",
            code : "",
            account :"",
            key  : "",
            secret : ""
        }
        $scope.order = angular.copy(order);
        $scope.doPayment = function(){
            console.log($scope.order);
            PayAPI.post($scope.order, function(data)
            {
                console.log(data);  
                $scope.close();
                if(200 == data.code){
                    $scope.show_tis(1, "购买债券成功");
                }else{
                    $scope.show_tis(0, "购买债券失败");
                }
                
            })
        }
        
        // $scope.pay = function(amount)
        // {
        //     $state.go('app.payment', {amount: amount})
        // }
        
        $ionicModal.fromTemplateUrl('templates/payment.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });
        
        // Triggered in the login modal to close it
        $scope.close = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.pay = function(bs) {
            $scope.order.id = bs.id;
            $scope.order.amount = "";
            $scope.order.remark = "";
            $scope.order.name = bs.name;
            $scope.order.key = bs.key;
            $scope.order.secret = bs.secret;
            $scope.modal.show();
        };
        
        $ionicModal.fromTemplateUrl('templates/tis.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal_tis = modal;
        });
        
        // Triggered in the login modal to close it
        $scope.close_tis = function() {
            $scope.modal_tis.hide();
        };

        // Open the login modal
        $scope.show_tis = function(result, txt) {
            $scope.tis = txt;
            if(result){
                $scope.log_title = "操作成功";
            }else{
                $scope.log_title = "操作失败";
            }
            $scope.modal_tis.show();
        };
        
    })
    .controller('PaymentListCtrl', function($scope, $stateParams, PayAPI) {
        $scope.records = [];
        $scope.getlist = function(){
            
            PayAPI.query({}, function(data)
            {
                console.log(data);  
                $scope.records = data;
                
            })
        }
        $scope.getlist();
    })
    .controller('ProductCtrl', function($scope, $stateParams) {
        
    })
    .controller('ShoppingCartCtrl', function($scope, $stateParams) {

    });
