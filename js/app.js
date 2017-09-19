let seats=[];
let rows=["A","B","C","D","E","F","G","H","I","J"];
let columns=[1,2,3,4,5,6,7,8,9,10,11,12];
let rowseats=[];
for(let i=0;i<rows.length;i++) {
  let temp={};
  seats.push(temp);
	for(let j=1;j<=12;j++) {
  	let temp={};
  	seats[i][rows[i]+j]={"booked":false,"bookedBy":""}
  }
}
var app=angular.module('MyApp',[])
.controller('MainController',['$scope','$http',function($scope,$http) {
  $scope.name="";
  $scope.seatscount;
  $scope.StartSelection=false;
  $scope.currentseatselection=0;
  $scope.SeatsBooked=0;
  $scope.temp=[];
  $scope.BookedSeats=[];
  $scope.SeatsLeft=120;
  $scope.Seats=seats;
  $scope.Rows=rows;
  $scope.Columns=columns;
  $scope.SeatSelection=function() {
    if($scope.seatscount<=$scope.SeatsLeft) {
      console.log("booking");
      $scope.StartSelection=true;
    }
    else {
      alert("Seats are not available");
    }
  };
  $scope.ConfirmBooking=function() {
    if($scope.currentseatselection===$scope.seatscount) {
      console.log("Booking seats");
      console.log($scope.temp);
      for(let i=0;i<$scope.temp.length;i++) {
        for(let j=0;j<$scope.Rows.length;j++) {
          if($scope.temp[i].indexOf($scope.Rows[j])>=0) {
            $scope.Seats[j][$scope.temp[i]].booked=true;
            $scope.Seats[j][$scope.temp[i]].bookedBy=$scope.name;
          }
        }
      }
      console.log($scope.Seats);
      $scope.SeatsLeft-=$scope.seatscount;
      $scope.SeatsBooked+=$scope.seatscount;
      $scope.BookedSeats.push({"name":$scope.name,"noofseats":$scope.seatscount,"detailsofseats":$scope.temp});
      $scope.name="";
      $scope.seatscount=null;
      $scope.BookingForm.$setPristine();
      $scope.StartSelection=false;
    }
    else {
      console.log("Please select the seats");
      alert("Please select the Seats");
    }
  };
  $scope.SelectedSeat=function(event,index) {
    if($scope.StartSelection) {
      for(let i=0;i<$scope.Rows.length;i++) {
        if(event.target.id.indexOf($scope.Rows[i])>=0) {
          if($scope.Seats[i][event.target.id].booked==true && $scope.Seats[i][event.target.id].bookedBy.length>0) {
            alert("Already booked by others");
          }
          else if($(event.target).hasClass('red')) {
              $scope.Seats[i][event.target.id].booked=false;
              $scope.currentseatselection-=1;
              for(let j=0;j<$scope.temp.length;j++) {
                if($scope.temp[j]==event.target.id) {
                  $scope.temp.splice(j,1);
                }
              }
          }
          else if($scope.currentseatselection<$scope.seatscount) {
            $scope.currentseatselection++;
            $scope.Seats[i][event.target.id].booked=true;
            $scope.temp.push(event.target.id);
          }
          else {
            alert("You have been trying to select more seats than you have entered");
          }
        }
      }
    }
    else {
      alert("Enter the details first");
    }
  };
}]);