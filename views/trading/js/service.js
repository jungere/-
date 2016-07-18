'use strict';

/**
 */
angular.module('starter.service', ['ngResource'])

    .service('globalFunction', ['globalConfig', '$resource', function(globalConfig, $resource)
    {
        this.getApiUrl = function(url)
        {
            return globalConfig.apiUrl + url;
        };
        this.generateUrlParams = function(condtion, fields){
            var params ={};
            //set condition
            var setParams = function(params,obj,prefix){
                _.each(obj,function(value,key,list){
                    if(_.isArray(value)){
                        if(value.length == 1){
                            params[prefix+key+'-range'] = value;
                        }else if(value.length == 3){
                            params[prefix+key+'-range'] = value[2];
                            params[prefix+key+'-min'] = value[0];
                            params[prefix+key+'-max'] = value[1];
                        }else{
                            params[prefix+key+'-min'] = value[0];
                            params[prefix+key+'-max'] = value[1];
                        }
                    }else if(_.isObject(value)){
                        setParams(params,value,prefix+key+'.')
                    }else{
                        params[prefix+key] = value;
                    }

                })
                return obj;
            }
            setParams(params,condtion,'');

            //set fields
            if(fields){
                params['fields'] =[];
                params['expand'] = [];
                params['expand-fields'] = {};
                _.each(fields,function(value,key,list){
                    if(_.isObject(value)){
                        //console.log(key);
                        params['expand'].push(key);
                        setParams(params['expand-fields'],value,key+'.');
                    }else{
                        params['fields'].push(key);
                    }
                })
                params['fields']=params['fields'].join(',');
                params['expand']=params['expand'].join(',');
                params['expand-fields']= _.keys(params['expand-fields']).join(',');
            }
            params['method'] = params['method']? params['method'] : 'and';
            return params;
        };
        this.createResource = function(url,param_defaults,actions){
            var inner_actions = {
                'get': {method:'GET',url:this.getApiUrl(url+'/:id')},
                'post': {method:'POST'},
                'query':  {method:'GET', isArray: true},
                'update': { method:'PUT',url:this.getApiUrl(url+'/:id') },
                'delete': { method:'DELETE',url:this.getApiUrl(url+'/:id') }
            };
            var inner_param_defaults = { };
            actions = _.extend(inner_actions,actions);
            param_defaults = _.extend(inner_param_defaults,param_defaults);
            return $resource(this.getApiUrl(url), param_defaults, actions);
        }

    }])
    .service('ProductsSV', function()
    {

    })
    .service('ShoppingCartSV', function()
    {
        this.cart = {};

        this.add = function(product){

        }

        this.reduce = function(pId)
        {

        }

    })
    
    // .service('TisSV', function($scope, $ionicModal)
    // {
    //     $ionicModal.fromTemplateUrl('templates/tis.html', {
    //         scope: $scope
    //     }).then(function(modal) {
    //         $scope.modal_tis = modal;
    //     });
        
    //     // Triggered in the login modal to close it
    //     this.close = function() {
    //         $scope.modal_tis.hide();
    //     };

    //     // Open the login modal
    //     this.show_tis = function(result, txt) {
    //         $scope.tis = txt;
    //         if(result){
    //             $scope.log_title = "操作成功";
    //         }else{
    //             $scope.log_title = "操作失败";
    //         }
    //         $scope.modal_tis.show();
    //     };

    // })


    .factory('errorInterceptor',['$q', 'globalConfig', '$window', '$timeout', function($q, globalConfig, $window, $timeout){
        return {
            'responseError': function(response) {
                if(response.status == 400){
                    //topAlert.warning(response.data.message);
                }else if(response.status == 401 ){
                    
                    localStorage.clear();
                    $timeout(function()
                    {
                        $window.location.href = globalConfig.loginUrl;
                    }, 400);
                }
                return $q.reject(response);
            }
        }
    }])

    .factory('UserApi',['globalFunction',function(globalFunction)
    {
        return globalFunction.createResource('users');
    }])
    .factory('PayAPI',['globalFunction',function(globalFunction)
    {
        return globalFunction.createResource('trading/pay');
    }])
    .factory('TPPayRecord',['globalFunction',function(globalFunction)
    {
        return globalFunction.createTPResource('Home/Subjectrecord', {}, {
            selectAll: {method:'query',url:globalFunction.getTPApiUrl('Home/Subjectrecord/selectall')},
            selectNeedChange: {method:'GET',url:globalFunction.getTPApiUrl('Home/Subjectrecord/selectneedchange')},
            updateOnce: {method:'GET',url:globalFunction.getTPApiUrl('Home/Subjectrecord/updateonce')},
            updateSelect: {method:'GET',url:globalFunction.getTPApiUrl('Home/Subjectrecord/updateselect'),isArray:true},
            changeOnceToobject: {method:'GET',url:globalFunction.getTPApiUrl('Home/Subjectrecord/changeoncetoobject')}
        });
    }])


