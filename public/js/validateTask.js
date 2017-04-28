const form = document.querySelector('form');
const re = /^[\w ]+$/;


form.addEventListener("submit", function(evt){

  checkForm();
  return true;

  function checkForm(){
    if(taskE() || taskS()){
      evt.preventDefault();
    }
  };

  function taskE(){
    if(form.info.value === ""){
      alert("Error: Info is empty!");
      form.info.focus();
      return true;
    }
  };

  function taskS(){
    if(!re.test(form.info.value)) {
      alert("Error: Info contains invalid characters!");
      form.info.focus();
      return true;
    }
  };
});