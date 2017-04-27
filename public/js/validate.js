
const form = document.querySelector('form');
const re = /^[\w ]+$/;


form.addEventListener("submit", function(evt){
  checkForm();
  return true;

  function checkForm(){
  // validation fails if the input is blank
    if(userE() || passE() || userS() || passS()){
      evt.preventDefault();
    }
  };

  function userE(){
    if(form.username.value === ""){
      alert("Error: Username is empty!");
      form.username.focus();
      return true;
    }
  };

  function passE(){
    if(form.password.value === "") {
      alert("Error: Password is empty!");
      form.password.focus();
      return true;
    } 
  };

  function userS(){
    if(!re.test(form.username.value)) {
      alert("Error: Username contains invalid characters!");
      form.username.focus();
      return true;
    }
  };

  function passS(){
    if(!re.test(form.password.value)) {
      alert("Error: Password contains invalid characters!");
      form.password.focus();
      return true;
    }
  };
})



