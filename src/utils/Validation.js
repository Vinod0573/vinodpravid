// validating email
export const emailValidation = (value) =>{
  let errors = {};
  let isValid = true;
  if(!value){
   
    isValid = false;
    errors["message"] = "Please Enter your Email Address.";
  }
  else if(typeof(value) !== "undefined"){
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!pattern.test(value)) {
      isValid = false;

      errors["message"] = "Please Enter a valid Email Address.";

    }

  }
 
  return{
      isValid,
      errors
  } 
}


// Validating password   /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

export const passwordValidation = ( value ) =>{
  let errors = {};
  let isValid = true;
  if(!value){
    isValid = false;
    errors["message"] = "Please Enter your Password.";
  }
  // else if( value.length < 8){
  //     isValid = false;
  //     errors["message"] = "Password should be of 8 character";
  // }
  else{
    let pattern = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
    if (!pattern.test(value)) {
      isValid = false;
      errors["message"] = "Password shuold be min 8 characters, with at least a special character, upper and lower case letters and a number";
    }
  }
  return{
      isValid,
      errors
  } 
}



// Name validation
export const nameValidation = ( value ) =>{
let errors = {};
let isValid = true;
if(!value){
  isValid = false;
  errors["message"] = "Please Enter your Name.";
}
else if( value.length < 3){
    isValid = false;
    errors["message"] = "Name should be of length atleast 3 and all alphabet.";
}else if( value.length > 50){
  isValid = false;
  errors["message"] = "Name should not be of length more than 50.";
}else{
  let pattern = new RegExp(/^[a-zA-Z ]{3,50}$/);
  if (!pattern.test(value)) {
    isValid = false;
    errors["message"] = "Name should be only alphabet.";

  }
}
return{
    isValid,
    errors
} 
}

export const webValidation =(value)=>{
var a=value;
  var re=/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
  // var pattern = new RegExp(/^[a-zA-Z0-9+&_.-]+@[a-zA-Z0-9.-]+$/)
  return re.test(a);
  
}

//Phone Number validation 
export const phoneNumberValidation =  (digit) => {

let errors = {};
let isValid = true;
    let number = digit
if(!number){
  isValid = false;
  errors["message"] = "Please Enter your Phone Number.";
}
// else if((number.match(phoneno))){
//   console.log(number.match(phoneno))
//   isValid = true;
//   errors["message"] = null;
// }
else if(number?.length === 10){
  isValid = true
  errors["message"] = null;
}
else if(number?.length !==10 || number.length >10){
  isValid = false;
  errors["message"] = "Please Enter 10 digit  Phone Number";
}
else{
  var pattern =   new RegExp(/^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/);
  if (!pattern.test(number)) {
  isValid = false;
  errors["message"] = "Please Enter correct Phone Number ";
  }
}
return{
  isValid,
  errors
}  
}


 // validating username
 export const userNameValidation = (value) =>{
  let errors = {};
  let isValid = true;
  if(!value){
   
    isValid = false;
    errors["message"] = "Please Enter your Username.";
  }
  else if(typeof(value) !== "undefined"){
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!pattern.test(value)) {
      isValid = false;

      errors["message"] = "Please Enter a valid Username.";

    }

  }
 
  return{
      isValid,
      errors
  } 
}