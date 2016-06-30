var Bebella = angular.module('Bebella', ['ui.router', 'datatables']);

var APP_URL = $("#APP_URL").val();

function view(path) {
    return APP_URL + '/admin/' + path;
}

function api_v1(path) {
    return APP_URL + '/api/v1/' + path;
}

function attr(dest, src) {
    for (var e in src) {
        if (e == "created_at" || e == "updated_at") {
            dest[e] = new Date(src[e]);
        } else if (e.startsWith("has_") || e.startsWith("is_") || e.startsWith("used_for_") || e == "active") {
            dest[e] = (src[e] === 1);
        } else {
            dest[e] = src[e];
        }
    }
}

Bebella.run([
    function () {
        
    }
]);

Bebella.factory('Category', [
    function () {
        var Category = new Function();
        
        return Category;
    }
]);


Bebella.factory('User', [
    function () {
        var User = new Function();
        
        return User;
    }
]);


Bebella.service('CurrentCategory', ['Category',
    function (Category) {
        var service = this;
        
        var _category = new Category();
        
        service.get = function () {
            return _category;
        };
        
        service.clear = function () {
            delete _category;
            
            _category = new Category();
        };
        
    }
]);


Bebella.service('CategoryRepository', ['$http', '$q', 'Category',
    function ($http, $q, Category) {
        var repository = this;
        
        repository.find = function (id) {
            var deferred = $q.defer();
            
            $http.get(api_v1('category/find/' + id)).then(
                function (res) {
                    var category = new Category();
                    
                    attr(category, res.data);
                    
                    deferred.resolve(category);
                },
                function (res) {
                    deferred.reject(res);
                }
            );

            return deferred.promise;
        };
        
        repository.all = function () {
            var deferred = $q.defer();
            
            $http.get(api_v1("category/all")).then(
                function (res) {
                    var categories = _.map(res.data, function (json) {
                        var category = new Category();
                        
                        attr(category, json);
                        
                        return category;
                    });
                    
                    deferred.resolve(categories);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
        
        repository.edit = function (category) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(category);
            
            $http.post(api_v1("category/edit"), data).then(
                 function (res) {
                     deferred.resolve(category);
                 },
                 function (res) {
                     deferred.reject(res);
                 }
            );
            
            return deferred.promise;
        };
        
        repository.save = function (category) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(category);
            
            $http.post(api_v1("category/save"), data).then(
                function (res) {
                    category.id = res.data.id;
                    
                    deferred.resolve(category);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
    }
]);



Bebella.service('UserRepository', ['$http', '$q', 'User',
    function ($http, $q, User) {
        var repository = this;
        
        repository.all = function () {
            var deferred = $q.defer();
            
            $http.get(api_v1("user/all")).then(
                function (res) {
                    
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
    }
]);


Bebella.controller('CategoryEditCtrl', ['$scope', '$stateParams', 'CategoryRepository',
    function ($scope, $stateParams, CategoryRepository) {
    
        $scope.edit = function () {
            CategoryRepository.edit($scope.category).then(
                function onSuccess (category) {
                    alert("Categoria editada com sucesso.");
                },
                function onError (res) {
                    alert("Erro ao criar esta categoria.");
                }
            );
        };
        
        CategoryRepository.find($stateParams.categoryId).then(
            function onSuccess (category) {
                $scope.category = category;
            },
            function onError (res) {
                alert("Houve um erro na obtenção dos dados desta categoria");
            }
        );
        
    }
]);




Bebella.controller('CategoryListCtrl', ['$scope', 'CategoryRepository',
    function ($scope, CategoryRepository) {
        
        CategoryRepository.all().then(
            function onSuccess (list) {
                $scope.categories = list;
            },
            function onError (res) {
                alert("Houve um erro na obtenção da lista de categorias");
            }
        );
        
    }
]);


Bebella.controller('CategoryNewCtrl', ['$scope', 'CurrentCategory', 'CategoryRepository',
    function ($scope, CurrentCategory, CategoryRepository) {
        $scope.category = CurrentCategory.get();
    
        $scope.create = function () {
            CategoryRepository.save($scope.category).then(
                function onSuccess (category) {
                    alert("Categoria cadastrada com sucesso.");
                    CurrentCategory.clear();
                },
                function onError (res) {
                    alert("Erro ao criar esta categoria.");
                }
            );
        };
        
        $scope.clear = function () {
            CurrentCategory.clear();
            $scope.category = CurrentCategory.get();
        };
    }
]);



Bebella.controller('ChannelListCtrl', ['$scope',
    function ($scope) {
        $scope.test = "Channel List";
    }
]);


Bebella.controller('ChannelNewCtrl', ['$scope',
    function ($scope) {
        $scope.test = "Channel New";
    }
]);



Bebella.controller('ProductOptionListCtrl', ['$scope',
    function ($scope) {
        $scope.test = "Product Option List";
    }
]);


Bebella.controller('ProductOptionNewCtrl', ['$scope',
    function ($scope) {
        $scope.test = "Product Option New";
    }
]);



Bebella.controller('ProductListCtrl', ['$scope',
    function ($scope) {
        $scope.test = "Product List";
    }
]);


Bebella.controller('ProductNewCtrl', ['$scope',
    function ($scope) {
        $scope.test = "Product New";
    }
]);



Bebella.controller('RecipeListCtrl', ['$scope',
    function ($scope) {
        $scope.test = "Recipe List";
    }
]);


Bebella.controller('RecipeNewCtrl', ['$scope',
    function ($scope) {
        $scope.test = "Recipe New";
    }
]);



Bebella.controller('StoreListCtrl', ['$scope',
    function ($scope) {
        $scope.test = "Store List";
    }
]);


Bebella.controller('StoreNewCtrl', ['$scope',
    function ($scope) {
        $scope.test = "Store New";
    }
]);



Bebella.controller('UserListCtrl', ['$scope',
    function ($scope) {
        $scope.test = "User List";
    }
]);


Bebella.controller('UserNewCtrl', ['$scope',
    function ($scope) {
        $scope.test = "User New";
    }
]);



Bebella.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                };
                
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    };
}]);


Bebella.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
        
                .state('user_new', {
                    url: '/user/new',
                    views: {
                        MainContent: {
                            templateUrl: view('user/new')
                        }
                    }
                })
                
                .state('user_list', {
                    url: '/user/list',
                    views: {
                        MainContent: {
                            templateUrl: view('user/list')
                        }
                    }
                })

                .state('recipe_new', {
                    url: '/recipe/new',
                    views: {
                        MainContent: {
                            templateUrl: view('recipe/new')
                        }
                    }
                })
                
                .state('recipe_list', {
                    url: '/recipe/list',
                    views: {
                        MainContent: {
                            templateUrl: view('recipe/list')
                        }
                    }
                })
                
                .state('category_new', {
                    url: '/category/new',
                    views: {
                        MainContent: {
                            templateUrl: view('category/new')
                        }
                    }
                })
                
                .state('category_list', {
                    url: '/category/list',
                    views: {
                        MainContent: {
                            templateUrl: view('category/list')
                        }
                    }
                })
                
                .state('category_edit', {
                    url: '/category/edit/{categoryId}',
                    views: {
                        MainContent: {
                            templateUrl: view('category/edit')
                        }
                    }
                })
                
                .state('store_new', {
                    url: '/store/new',
                    views: {
                        MainContent: {
                            templateUrl: view('store/new')
                        }
                    }
                })
                
                .state('store_list', {
                    url: '/store/list',
                    views: {
                        MainContent: {
                            templateUrl: view('store/list')
                        }
                    }
                })
                
                .state('channel_new', {
                    url: '/channel/new',
                    views: {
                        MainContent: {
                            templateUrl: view('channel/new')
                        }
                    }
                })
                
                .state('channel_list', {
                    url: '/channel/list',
                    views: {
                        MainContent: {
                            templateUrl: view('channel/list')
                        }
                    }
                })
                
                .state('product_new', {
                    url: '/product/new',
                    views: {
                        MainContent: {
                            templateUrl: view('product/new')
                        }
                    }
                })
                
                .state('product_list', {
                    url: '/product/list',
                    views: {
                        MainContent: {
                            templateUrl: view('product/list')
                        }
                    }
                })
                
                .state('product_option_new', {
                    url: '/product_option/new',
                    views: {
                        MainContent: {
                            templateUrl: view('product_option/new')
                        }
                    }
                })
                
                .state('product_option_list', {
                    url: '/product_option/list',
                    views: {
                        MainContent: {
                            templateUrl: view('product_option/list')
                        }
                    }
                })
        
                .state('home', {
                    url: '/',
                    views: {
                        MainContent: {
                            templateUrl: view('dashboard')
                        }
                    }
                });
        
    }
]);