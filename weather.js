


var APPID = "23f36ca1bfadd2adc206be6c15bf9147";
//var temperature;
//var zipSubmit = false;
//var tempIsF = true;

//var zipInput = 68128;
//var cityInput = "seattle";




function getWeather(input){

	var zipCodeRegEx = /\d{5}/;
	var zipCodeTest = zipCodeRegEx.test(input);
  console.log("zip test: " + zipCodeTest);

	var urlCityCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + input + ",us&units=imperial&APPID=" + APPID;

  var urlZipCurrent = "https://api.openweathermap.org/data/2.5/weather?zip=" + input + ",us&units=imperial&APPID=" + APPID;
 
  
  if (zipCodeTest && input.length == 5){
  	console.log("Input is a valid zip code!");
    sendRequest(urlZipCurrent);
  }else{
  	console.log("non zip code entered");
  	sendRequest(urlCityCurrent);
  }
  
}


function sendRequest(url){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
  	
    console.log("Status: " + xmlhttp.status);
  
    if (xmlhttp.readyState == 4 && xmlhttp.status ==200){
      //var data = xmlhttp.responseText;
      var data = JSON.parse(xmlhttp.responseText);
      console.log(data);
      
      //location
      //var zipCode = zip;
      var cityName = data.name;
      
      //console.log("Zip Code: " + zipCode);
      console.log("City: " + cityName);
      
      //weather
      var currentTemp = Math.floor(data.main.temp);
      var tempHigh = Math.floor(data.main.temp_max);
      var tempLow = Math.floor(data.main.temp_min);
      var humidity = data.main.humidity;
      var conditions = data.weather[0].main;
      var weatherId = data.weather[0].id;
      var pressure = ((data.main.pressure * 0.02953).toString()).substr(0, 4);
      var wind = Math.floor(data.wind.speed);
      
      
      console.log("Current Temp: " + currentTemp);
      console.log("High: " + tempHigh);
      console.log("Low: " + tempLow);
      console.log("Humidity: " + humidity);
      console.log("Conditions: " + conditions);
      console.log("weather ID: " + weatherId);
      console.log("Pressure: " + pressure);
      console.log("Wind: " + wind);
      
      //weatherBackground(957)
      
      weatherBackground(cityName, currentTemp, tempHigh, tempLow, humidity, conditions, weatherId, pressure, wind)
      
      
    };
    
  };
  
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  
  xmlhttp.onloadend = function() {
    if(xmlhttp.status == 404){
    	console.log("Please enter valid input");
      
      //set invalid text for 1s and shake
      $("#submit-button").effect("shake", {distance:5});
      $("#user-input").val("Not a valid city or zip code");
      setTimeout(function(){
        $("#user-input").val(""); }, 1000);
    };    
	};
  
  
};


function weatherBackground(cityInput, currentTempInput, highInput, lowInput, humidityInput, conditionsInput, weatherInput, pressureInput, windInput){
	console.log("weather input: " + weatherInput);
  $(".WeatherBackground").css("width", "0%");
  $("#weather-background-container").css("filter", "blur(0px)");
  
  if (weatherInput>=200 && weatherInput<= 232){
  	console.log("Weather is: Storm");
    $("#weather-background-storm").css("width", "100%");
    
  }else if ((weatherInput >= 300 && weatherInput <= 531) || (weatherInput == 701)){
  	console.log("Weather is: Rain");
    $("#weather-background-rain").css("width", "100%");
  
  }else if (weatherInput >= 600 && weatherInput <= 622){
  	console.log("Weather is: Snow");
    $("#weather-background-snow").css("width", "100%");
  
  }else if (weatherInput >= 801 && weatherInput <= 804){
  	console.log("Weather is: Cloudy");  
    $("#weather-background-cloudy").css("width", "100%");
  
  }else if (weatherInput >=711 && weatherInput <=781){
    	console.log("Weather is: obscurred and hazy?");
      $("#weather-background-haze").css("width", "100%");
  
  }else if ((weatherInput >= 900 && weatherInput <= 906 && weatherInput != 905) || (weatherInput == 957) || (weatherInput == 962)){
  	console.log("Weather is: EXTREME!!");
    $("#weather-background-extreme").css("width", "100%");
  
  }else if ((weatherInput>= 951 && weatherInput <= 956) || (weatherInput == 905)){
  	console.log("Weather is: windy");
    $("#weather-background-windy").css("width", "100%");
  
  }else{
  	console.log("weather is: clear");
    $("#weather-background-clear").css("width", "100%");
  }
  
  //clear input
  $("#user-input").val("");
  
  //Move input container
  $("#input-container").css("transform", "translateY(30vh)");
  
  //Display Weather data
  /*cityInput, currentTempInput, highInput, lowInput, humidityInput, conditionsInput, weatherInput*/
  //$("#output-container-main").css("visibility", "visible");
  $("#output-container-main").css({"visibility": "visible", "opacity": "1"});
  //$(".OutputContainer").css("opacity", "1");
      
  $("#city-name").text(cityInput);    
  $("#current-temp").html(currentTempInput + "&deg;F");
  $("#current-condition").text(conditionsInput);
  $("#low-temp").html("Low: " + lowInput + "&deg;F");
  $("#high-temp").html("High: " + highInput + "&deg;F");
  $("#humidity").text("Humidity: " + humidityInput + "%");
  $("#pressure").text("Pressure: " + pressureInput + " inHg");
  $("#wind").text("Wind Speed: " + windInput + " mph");
  
}



//getWeather(cityInput);

$(document).ready(function(){
	$(window).resize(function() {
  	var width = $(window).width(); 
  	console.log(width);
	});
  
  
  
	$("#submit-button").click(function(){
  	//console.log("button clicked");
    event.preventDefault();
    var $userInput = $("#user-input").val();
    console.log("!!User Input: " + $userInput);
    
    if ($userInput != ""){
    	console.log("User Input: " + $userInput);
      getWeather($userInput); 
    }else{
      $("#submit-button").effect("shake", {distance:5});
    }
  });
  
  /*$("#user-input").keyup(function(e) {
         if(e.which == 13) {
             e.preventDefault();
             console.log('Enter key hit');
             //$("#submit-button").click();
          }
    });*/
	
    /*$("#submit-button").hover(
  function() {
    $( this ).css({"background-color": "white", "color": "orange", "border": "2px solid orange"});
  }, function() {
    $( this ).css({"background-color": "orange", "color": "white", "border": "none"});
  }
);*/
  
});



