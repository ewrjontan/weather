


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
      var city = data.name;
      
      //console.log("Zip Code: " + zipCode);
      console.log("City: " + city);
      
      //weather
      var currentTemp = data.main.temp;
      var tempHigh = data.main.temp_max;
      var tempLow = data.main.temp_min;
      var humidity = data.main.humidity;
      var conditions = data.weather[0].main;
      var weatherId = data.weather[0].id;
      
      console.log("Current Temp: " + currentTemp);
      console.log("High: " + tempHigh);
      console.log("Low: " + tempLow);
      console.log("Humidity: " + humidity);
      console.log("Conditions: " + conditions);
      console.log("weather ID: " + weatherId);
      
      //weatherBackground(957)
      weatherBackground(weatherId)
    };
    
  };
  
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  
  xmlhttp.onloadend = function() {
    if(xmlhttp.status == 404){
    	console.log("Please enter valid input");
    } ;    
	};
  
  
};


function weatherBackground(weatherInput){
	console.log("weather input: " + weatherInput);
  $(".WeatherBackground").css("width", "0%");
  
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
  
}



//getWeather(cityInput);

$(document).ready(function(){
	$("#submit-button").click(function(){
  	console.log("button clicked");
    
    var $userInput = $("#user-input").val();
    console.log("User Input: " + $userInput);
    
    getWeather($userInput);
    
    
  })
});


