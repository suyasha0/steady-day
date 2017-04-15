document.addEventListener('DOMContentLoaded', main);

function main(){

	const toAdd = [];

	const button = document.querySelector('button');
	button.addEventListener('click', function(evt){
		this.style.visibility = 'hidden';
		const input = elt("p", elt("input"));
		input.setAttribute("type", "text");
		input.className = "input";
		document.body.appendChild(input);
		const add = elt("button", elt("value", "Set reward"));
		add.className = "addButton";
		const p = document.querySelector('p');
		p.appendChild(add);

		add.addEventListener('click', function(evt){
			this.style.visibility = 'hidden';
			const msg = elt("br", "Set!");
			const p = document.querySelector('p');
			p.appendChild(msg);
			toAdd.push(p.children[0].value);
		});
	});
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
