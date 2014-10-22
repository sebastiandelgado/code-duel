angular.module('app')
  .controller('loginCtrl', function($scope, $location, userService, socket) {
    $scope.submitUserRoom = function(){
      //send $scope.username and $scope.roomname to our sockets service somehow.
      console.log('you clicked the button');
      userService.user.username = $scope.username;
      userService.user.roomname = $scope.roomname;

      socket.emit('checkRoom', $scope.roomname);

      // socket.emit('butt');

      socket.on('roomStatus', function(isFull){
        console.log($scope.roomname);
        console.log("IS FULL:", isFull);
          if(isFull){
            console.log("Pick a new room!");
          } else if (isFull === false) {
            socket.emit('addToRoom', $scope.roomname);
          }
      });

      socket.on('joinedRoom', function(room){
        console.log("You are in room:", room);
      });

      $location.url('/room'); //TODO: fix this for case: room is full
    };
  });