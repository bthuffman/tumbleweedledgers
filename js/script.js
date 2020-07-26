//TYPEWRITER EFFECT
/**
 * Constructor function that creates the class TypeWriter
 *
 * @param string $txtElement is the span element in the html (i.e. class txt-type)
 * @param string $words the data words attribute within the above mentioned span element (i.e. Develop, Deploy, Repeat)
 * @param integer $wait, the wait time before the text starts to be deleted
 * */
const TypeWriter = function(txtElement, words, wait = 3000) {
	//assigns the txtElement property to the text element that is passed in
	this.txtElement = txtElement;
	//sets words to the word element that is passed in
	this.words = words;
	//Includes whatever is currently in the target area (where words are spelt). Set to nothing by default
	this.txt = '';
	//Index of the word currently on (from the array of 3 words). Set to zero because array's start at Zero
	this.wordIndex = 0;
	//equal to an integer
	this.wait = parseInt(wait, 10);
	//main method that this typewritter is using
	this.type();
	//represents the state, as to whether it is deleting or not
	this.isDeleting = false;
}

/**
* Type Method
*
 * @param integer $current, the current index of the word
 * @param string $fullTxt the full text of the current word
* */
TypeWriter.prototype.type = function() {
	//get current index of word
	const current = this.wordIndex % this.words.length;
	//get full text of the current word
	const fullTxt = this.words[current];
	//check if deleting
	if(this.isDeleting) {
		//Remove character if deleting
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		//Add character if not deleting
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	// Insert txt into the txtElement
	this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

	// Initial type speed
	let typeSpeed = 300;
	//slows the deleting speed, to half of the typeSpeed
	if(this.isDeleting) {
		typeSpeed = typeSpeed / 2;
	}

	//Check to see if the word is complete
	if(!this.isDeleting && this.txt === fullTxt) {
		// Make a pause at the end of typing
		typeSpeed = this.wait;
		// Set delete to true
		this.isDeleting = true;
		//once it completely deletes this word (this text = nothing) then...
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		//Move to the next word
		this.wordIndex++;
		//Pause before typing new word
		typeSpeed = 500;
	}
	//Determines that types every half a second after (the type speed of 500)
	setTimeout(() => this.type(), typeSpeed)
}

// Adds an event listener that activates the function init on the DOM Load
document.addEventListener('DOMContentLoaded', init);
/**
 * This function targets the relevant html elements to create a new TypeWriter class
 *
 * @param string $txtElement is the span element in the html (i.e. class txt-type)
 * @param string $words the data words attribute within the above mentioned span element (i.e. Develop, Deploy, Repeat)
 * @param integer $wait, the wait time before the text starts to be deleted
 * @returns a TypeWriter class
* */
function init() {
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');
	// Init TypeWriter
	new TypeWriter(txtElement, words, wait);
}

