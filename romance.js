//let text = "Ever since city I left the city, you, you, you You and me we just don't get along";
//let text = "Listen to the silence, let it ring on Eyes, dark grey lenses frightened of the sun We would have a fine time living in the night Left to blind destruction Waiting for our sight And we would go on as though nothing was wrong And hide from these days we remained all alone Staying in the same place, just staying out the time Touching from a distance Further all the time Dance, dance, dance, dance, dance, to the radio Dance, dance, dance, dance, dance, to the radio Dance, dance, dance, dance, dance, to the radio Dance, dance, dance, dance, dance, to the radio Well I could call out when the going gets tough The things that we've learnt are no longer enough No language, just sound, that's all we need know, to synchronise Love to the beat of the show And we could dance";
//War and Peace, Leo Tolstoy:
let text = 'The little princess entered the room. The passage broke off in the middle, a cry was heard, then Princess Mary’s heavy tread and the sound of kissing. When Prince Andrew went in the two princesses, who had only met once before for a short time at his wedding, were in each other’s arms warmly pressing their lips to whatever place they happened to touch. Mademoiselle Bourienne stood near them pressing her hand to her heart, with a beatific smile and obviously equally ready to cry or to laugh. Prince Andrew shrugged his shoulders and frowned, as lovers of music do when they hear a false note. The two women let go of one another, and then, as if afraid of being too late, seized each other’s hands, kissing them and pulling them away, and again began kissing each other on the face, and then to Prince Andrew’s surprise both began to cry and kissed again. Mademoiselle Bourienne also began to cry. Prince Andrew evidently felt ill at ease, but to the two women it seemed quite natural that they should cry, and apparently it never entered their heads that it could have been otherwise at this meeting.';
//let text = "You used to call me on my You used to, you used to Yeah You used to call me on my cell phone Late night when you need my love Call me on my cell phone Late night when you need my love And I know when that hotline bling That can only mean one thing I know when that hotline bling That can only mean one thing Ever since I left the city, you Got a reputation for yourself now Everybody knows and I feel left out Girl, you got me down, you got me stressed out Cause ever since I left the city, you Started wearing less and goin out more Glasses of champagne out on the dance floor Hangin with some girls I've never seen before You used to call me on my cell phone Late night when you need my love Call me on my cell phone Late night when you need my love I know when that hotline bling That can only mean one thing I know when that hotline bling That can only mean one thing Ever since I left the city, you, you, you You and me, we just don't get along You make me feel like I did you wrong Going places where you don't belong Ever since I left the city, you You got exactly what you asked for Running out of pages in your passport Hanging with some girls I've never seen before You used to call me on my cell phone Late night when you need my love Call me on my cell phone Late night when you need my love And I know when that hotline bling That can only mean one thing I know when that hotline bling That can only mean one thing These days, all I do is Wonder if you're bendin' over backwards for someone else Wonder if you're rollin' up a Backwoods for someone else Doing things I taught you, gettin' nasty for someone else You don't need no one else You don't need nobody else, no Why you never alone? Why you always touchin' road? Used to always stay at home, be a good girl You was in the zone Yeah, you should just be yourself Right now, you're someone else You used to call me on my cell phone Late night when you need my love Call me on my cell phone Late night when you need my love And I know when that hotline bling That can only mean one thing I know when that hotline bling That can only mean one thing Ever since I left the city";

let numberOfLines = 16;
let lengthOfWords = 6;//how to read user input

generatePoem(text, numberOfLines);

function parseText(text){
	let textCopy = text.slice();
	return textCopy.toLowerCase().replace(/[^a-z-'\s]/ig, "").split(' ');
}

//creating a Markov chain object
function generateDictionary(parsedText){
	let dictionary = {};
	for (let i = 0; i < parsedText.length - 1; i++){
		let key = parsedText[i];
		let value = parsedText[i + 1];
		if (dictionary[key]) //if the key was already added
			dictionary[key].push(value);
		else
			dictionary[key] = [value];
	}
	return dictionary;
};

function chooseFirstWord(dictionary){
	let maxRand = dictionary.length;
	let index = Math.floor(Math.random() * Math.floor(maxRand));
	return dictionary[index];
}

function chooseRandomWord(array){
	let maxRand = array.length;
	let index = Math.floor(Math.random() * Math.floor(maxRand));
	return array[index];
}

function writeLine(dictionary, lengthOfWords){
	let line = '';
	let word = chooseFirstWord(Object.keys(dictionary));
	for (let i = 0; i < lengthOfWords; i++){
		line += word + ' ';
		word = chooseRandomWord(dictionary[word]);
		if (!dictionary[word]) //when a word has no entries in it's Markov Chain, the program should choose a new word and continue the line until it meets the word count
			word = chooseFirstWord(Object.keys(dictionary));
	}
	return line;
};

function generatePoem(text, numberOfLines){
	let parsedText = parseText(text); //generating the array of words, lowercase
	let dictionary = generateDictionary(parsedText); //creating Markov Chain object
	//let poem = []; //if we need an output as an array
	let poemStr = '';
	for (let i = 0; i < numberOfLines; i++){
		poemStr += capLine(writeLine(dictionary, lengthOfWords)) + '\n';
		if (i % 4 === 3)
			poemStr += '\n';
		//poem.push(writeLine(dictionary, lengthOfWords));
	};
	console.log(poemStr);
}

function capLine(line){
	return line[0].toUpperCase() + line.slice(1);
}

