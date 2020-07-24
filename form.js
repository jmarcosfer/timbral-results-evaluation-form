////////////////////////////
// Drag & Drop functionality
////////////////////////////

// Utilities:

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// Drag Functions

function dragStart(e) {
	e.dataTransfer.setData("text/plain", e.target.id);
	e.dataTransfer.dropEffect = "move";
	this.className += " hold";
	requestAnimationFrame(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
	this.className = "fill";
}

function dragOverEmpty(e) {
	e.preventDefault();
}

function dragEnter(e) {
	e.preventDefault();
	this.className += ' hovered';
}

function dragLeave() {
	this.className = 'empty';
}

function dragDrop(e) {
	if (this.childNodes.length >= 1) {
		e.preventDefault();
		this.className = 'empty';
	} else {
		this.className = 'empty';
		const elementBeingMoved = document.getElementById(e.dataTransfer.getData("text/plain"));
		this.appendChild(elementBeingMoved);	
	}
}



// MAIN:
(function(){
	
	const descriptorNames = ["depth", "hardness", "roughness", "warmth", "brightness", "sharpness", "boominess"];
	const availableEmpties = document.querySelectorAll("#available > .empty");

	for (let empty of availableEmpties) {
		const optionDescriptor = document.createElement('div');
		let chosenIndex = getRandomInt(0,descriptorNames.length-1);
		optionDescriptor.id = "descriptor-" + descriptorNames[chosenIndex];
		optionDescriptor.textContent = descriptorNames[chosenIndex];
		descriptorNames.splice(chosenIndex, 1); // avoid randomly choosing the same name twice

		// set class and draggable
		optionDescriptor.setAttribute("class", "fill");
		optionDescriptor.setAttribute("draggable", "true");

		// append to parent <li>
		empty.appendChild(optionDescriptor);
	}


	const allEmpties = document.querySelectorAll(".empty");
	const allFills = document.querySelectorAll(".fill");
	
	// .empty drag listeners
	for (const empty of allEmpties) {
		empty.addEventListener('dragover', dragOverEmpty);
		empty.addEventListener('dragenter', dragEnter);
		empty.addEventListener('dragleave', dragLeave);
		empty.addEventListener('drop', dragDrop);
	}
	// .fill drag listeners
	for (const fill of allFills) {
		fill.addEventListener('dragstart', dragStart);
		fill.addEventListener('dragend', dragEnd);
	}

	const collapseButton = document.querySelector(".collapsible");
	// Collapsing logic:
	collapseButton.addEventListener("click", function() {
		this.classList.toggle("active-collapsible");
		const formWrap = document.querySelector(".form-wrap");
		if (formWrap.style.maxHeight) {
			formWrap.style.maxHeight = null;
		} else {
			formWrap.style.maxHeight = formWrap.scrollHeight + "px";
		}
	});

})();