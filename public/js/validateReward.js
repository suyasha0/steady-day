
const form = document.getElementById('create-form');
const addBtn = document.getElementById('addBtn')

addBtn.addEventListener('click', function(evt){
  console.log("HELOO?")
  checkForm();
  return true;

  function checkForm(evt){
    if(rewE() /*|| rewS()*/){
      evt.preventDefault();
    }
  };

  function rewE(){
    if(form.rewardTitle.value === ""){
      alert("Error: Info is empty!");
      form.rewardTitle.focus();
      return true;
    }
  };


  function rewS(){
    if(!re.test(form.rewardTitle.value)) {
      alert("Error: Info contains invalid characters!");
      form.rewardTitle.focus();
      return true;
    }
  }; 

});