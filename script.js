angular.module('app',[]);

angular.module('app').controller('mainCtrl', function($scope){

    $scope.userOne = {
        name: 'Alex Pohrebniak',
        address: {
            street: 'Teremkivska',
            city: 'Kyiv',
            planet: 'Earth'
        },
        friends: [
            'Sunnat',
            'Kate',
            'Stanislav'
        ]
    };

    $scope.userTwo = {
        name: 'Stanislav Khlolodny',
        address: {
            street: 'Drujby Narodiv',
            city: 'Kyiv',
            planet: 'Earth'
        },
        friends: [
            'Kate',
            'Alex',
            'Khana'
        ]
    };

});

angular.module('app').directive('userInfoCard', function(){
    return {
        templateUrl: 'userInfoCard.html',
        restrict: 'E',
        scope: {
            user:'=', //передача данных, под данными обычно подразумевается объект
            //свойство в контроллере : свойство в атрибуте
            initialCollapsed: '@collapsed'
        },        
        controller: function($scope){

            $scope.collapsed = $scope.initialCollapsed === 'true';
 
            $scope.knightMe = function(user){
                user.rank = "knight";
            }

            $scope.collapse = function() {
                $scope.collapsed = !$scope.collapsed; 
            } 

            $scope.removeFriend = function(friend){
                var index = $scope.user.friends.indexOf(friend);
                if (index > -1){
                    $scope.user.friends.splice(index,1);
                }
            }

    
        }
        // ,link: function(scope){
        //     console.log('We are in a link function...'); 
        //     console.log(scope.collapsed);
        // }
    }
});

angular.module('app').directive('address', function(){
    return {
        //наследуемый скоуп
        scope:true,
        restrict: 'E',
        templateUrl: 'address.html',
        controller: function($scope){
            $scope.collapsed = false;
            $scope.collapseAddress = function(){
                 $scope.collapsed = true;
            }
            $scope.expandAddress = function(){
                 $scope.collapsed = false;
            }
        }
    };
});

angular.module('app').directive('removeFriend', function(){
    return {

        scope: {
            notifyParent: '&method'
        },

        restrict: 'E',
        templateUrl: 'removeFriend.html',
        controller: function($scope)  {
  
            $scope.removing = false;

            $scope.startRemove = function(){
                 $scope.removing = true;
            }

            $scope.cancelRemove = function(){
                 $scope.removing = false;
            }

            $scope.confirmRemove = function(){
                $scope.notifyParent(/*{friend:'Kate'}*/);
            }
        }
    };

}); 