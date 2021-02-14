// Assignment code here
async function generatePassword(){
  //sample of lower case for password
  var lower = "abcdefghijklmnopqrstuvwxyz";
  //sample of upper case for password
  var upper = lower.toUpperCase();
  //sample of number for password
  var number = "0123456789";
  //sample of special character for password
  var special = "!\"#$%&\'()*+,-./:;<=>?@[\\ ]^_`{|}~";
  //what the samples append to for selections
  var passwordSelection = "";
  //collects and used to write promise resolves to password
  var passwordConcat = "";
  //final password to be printed
  var password = "";
  //keeps track of how many password selections user makes
  var counter = 0;
  //determines whether or not to append sample to selection
  var answer;
  //translates string num input into actual num
  var len = parseInt(window.prompt("How long would you like your password to be?\nEnter a value between 8-128:"));
  //divides len into chunks for promises
  var lenChunk;
  //gets remainder of len in case of not divisible by 4
  var lenDifference;
  //contains promise pendings
  var passwordChunkArray;
  //restricts password size from 8-128
  while(len < 8 || len > 128 ){
    len = parseInt(window.prompt("ERROR: Incorrect value.\n\nHow long would you like your password to be?\nEnter a value between 8-128:"));
  }
  //where the user selects samples, at least 1
  while(counter === 0){
    answer = window.confirm("Would you like to include lowercase letters in your password?");
    if(answer){
      //appends sample to selection
      passwordSelection += lower;
      //breaks out of loop
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
    //if no samples selected, restart selection
    if(counter === 0) window.alert("ERROR: You didn't select any option. Try again.");
    else{
      //if they want to reselect
      answer = window.confirm("Are you sure about your selections? Continue?");
      if(!answer){
        passwordSelection = "";
        counter = 0;
      }
    }
  }
  //preps selected length 
  lenChunk = Math.floor(len/4);
  //preps difference to be appended
  lenDifference = len%4;
  //pending promises array
  passwordChunkArray = [getPasswordChunk(lenChunk, passwordSelection),
                        getPasswordChunk(lenChunk, passwordSelection),
                        getPasswordChunk(lenChunk, passwordSelection),
                        getPasswordChunk(lenChunk, passwordSelection)
                       ];
  //calls all promises and waits until all return with all resolves in form of array. All resolves to be concatenated and appended to password
  passwordConcat = await Promise.all(passwordChunkArray); 
  //appends characters for lenDifference 
  for(var i = 0; i < lenDifference; i++){
    password += passwordSelection[getRandomValue(0, passwordSelection.length-1)];
  }
  //appends main password chunks from resolves
  for(var i = 0; i < passwordConcat.length; i++){
    password += passwordConcat[i];
  }
  //prints
  var passwordText = document.querySelector("#password");
  passwordText.value = password;

}

function getPasswordChunk(len, passwordSelection){
  //password chunk to be returned
  var passwordChunk = "";
  return new Promise((resolve) => {
    for(var i = 0; i < len; i++){
      //randomizes letter chosen from password selection
      passwordChunk += passwordSelection[getRandomValue(0, passwordSelection.length-1)];
    }
    //resolves promise and returns the password chunk
    resolve(passwordChunk);
  });
}

function getRandomValue(min, max){
  //grabs and returns random values
  var random = Math.floor(Math.random()*(max-min+1)+min);
  return random;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");
// Add event listener to generate button
generateBtn.addEventListener("click", generatePassword);
