'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularApp
 */
angular.module('starter.config',[])
    .constant('globalConfig',
    {
        
        apiUrl : "http://120.25.226.215/"
        // apiUrl : "http://localhost:8083/"
        
    })
    .config(['$httpProvider',function($httpProvider) {
        // AngularJS将拦截器排入一个队列中，在进行Ajax Call
        // 时，将触发器挨个触发
        $httpProvider.interceptors.push('errorInterceptor');
        //$httpProvider.interceptors.push('HttpResponseInterceptor');
    }])
    
