 document.addEventListener('DOMContentLoaded', main);

 function main(){
	const btn = document.getElementById('filterBtn');
	btn.addEventListener('click', handleClick);
	const addBtn = document.getElementById('addBtn');
	addBtn.addEventListener('click', handleAdd);
};

function handleAdd(evt){
	evt.preventDefault();
	const info = document.getElementById('rewardTitle').value;

	const req = new XMLHttpRequest();
	req.open('POST', '/api/rewards/create', true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	req.addEventListener('load', handleAddLoad);

	req.send('info='+info);
	
	function handleAddLoad(){
		if(req.status>=200 && req.status<400){
			const msgs = JSON.parse(req.responseText);
			const rewards = document.getElementById('reward-list');

			while (rewards.hasChildNodes()) {
				rewards.removeChild(rewards.lastChild);
			}

			msgs.forEach(function(obj){
				rewards.appendChild(elt("tr", elt("td", obj.info + "")));			
			});
		}
	}; 
};

function handleClick(evt){
	evt.preventDefault();
	const url = 'http://localhost:3000/api/rewards/'; 
	const params = "info="+ document.getElementById('reward').value;
	
	const req = new XMLHttpRequest();
	req.open('GET', url+"?"+params, true);
	req.addEventListener('load', handleLoad);

	req.addEventListener('error', function(){
		document.body.appendChild(document.createTextNode('uh-oh'));
	});
	req.send();

	function handleLoad(){
		if(req.status>=200 && req.status<400){
			const msgs = JSON.parse(req.responseText);
			const rewards = document.getElementById('reward-list');
			const tr = document.getElementsByTagName('tr');

			while (rewards.hasChildNodes()) {
				rewards.removeChild(rewards.lastChild);
			}
			msgs.forEach(function(obj){
				rewards.appendChild(elt("tr", elt("td", obj.info + "")));	
					
			});
				
		}
	};

};

function elt(type){
	const ele = document.createElement(type);
	for(let i=1; i<arguments.length; i++){
		let child = arguments[i];
		if(typeof child === "string"){
			child = document.createTextNode(child);
		}
		ele.appendChild(child);
	}
	return ele;
};