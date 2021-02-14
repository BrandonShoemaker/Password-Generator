// Assignment code here
async function generatePassword(){
  var lower = "abcdefghijklmnopqrstuvwxyz";
  var upper = lower.toUpperCase();
  var number = "0123456789";
  var special = "!\"#$%&\'()*+,-./:;<=>?@[\\ ]^_`{|}~";
  var passwordSelection = "";
  var counter = 0;
  var answer;
  var len = parseInt(window.prompt("How long would you like your password to be?\nEnter a value between 8-128:"));
  while(len < 8 || len > 128 ){
    len = parseInt(window.prompt("ERROR: Incorrect value.\n\nHow long would you like your password to be?\nEnter a value between 8-128:"));
  }
  while(counter === 0){
    answer = window.confirm("Would you like to include lowercase letters in your password?");
    if(answer){
      passwordSelection += lower;
      counter++;
    }
    answer = window.confirm("Would you like to include uppercase letters in your password?");
    if(answer){
      passwordSelection += upper;
      counter++;
    }
    answer = window.confirm("Would you like to include numbers in your password?");
    if(answer){
      passwordSelection += number;
      counter++;
    }
    answer = window.confirm("Would you like to include special characters in your password?");
    if(answer){
      passwordSelection += special;
      counter++;
    }
    if(counter === 0) window.alert("ERROR: You didn't select any option. Try again.");
    else{
      answer = window.confirm("Are you sure about your selections? Continue?");
      if(!answer) counter = 0;
    }
  }
  var lenChunk = len/4;
  var lenDifference = len%4;


}

function getPasswordChunk(len, passwordSelection){
  return new Promise((resolve) => {
    for(var i = 0; i < len; i++){
      
    }
    resolve(passwordChunk);
  });
}

function getRandomValue(min, max){
  var random = Math.floor(Math.random()*(max-min+1)+min);
  return random;
}
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
