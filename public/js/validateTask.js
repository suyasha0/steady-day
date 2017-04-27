
const form = document.querySelector('form');
const re = /^[\w ]+$/;


form.addEventListener("submit", function(evt){

  if(taskE() || taskS()){
      evt.preventDefault();
  }
  else{
    return true;
  }

  function taskE(){
    if(form.info.value === ""){
      alert("Error: Info is empty!");
      form.username.focus();
      return true;
    }
  };

  function taskS(){
    if(!re.test(form.info.value)) {
      alert("Error: Info contains invalid characters!");
      form.username.focus();
      return true;
    }
  };
});
