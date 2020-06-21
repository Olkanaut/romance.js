# romance.js
poems generator using the concept of Markov chain

The poem generator does:
  • Train itself to write poetry using a Markov Chain
  • Generate complete poems based on a word corpus (no fill-in-the-blanks)

1. parseText(text) -> parsedText[]
2. generateDictionary(parsedText) -> dictionary{}
3. writeLine(dictionary, lengthOfWords) -> result: one string with newlines
4. generatePoem(text, numberOfLines) -> one string with newlines or array of strings




#######
Getting Started

To start with, let's introduce the concept of a Markov Chain:

    A Markov Chain is a stochastic process that satisfies the Markov property. -Wikipedia

Let's unpack that a little. Essentially, a process satisfies the Markov property if you can predict the future of the process solely on its present state (the full history is not necessary, the process is "memoryless").

A stochastic process is one that is unpredictable because of a random variable. Such a process can be analyzed statistically, but may not be predicted precisely.
Examining the Poetry Generator

First, a word corpus is analyzed to produce a Markov Chain. In this case, the lyrics for Hotline Bling are analyzed, and the Markov Chain takes the form of an object, with a property for each word in the song.

Each key is a word from the song, and the corresponding value is an array with all the words that ever follow that word in the corpus (song). So for example, the word 'hotline' is associated with an array of eight words (all 'bling'). The word 'feel' is associated with the array ["left", "like"].
Using our Markov Chain

Now this object can be used to generate a poem. We start with a single word and ask: "what word should come next?". The Markov Chain provides a list of every possible subsequent word. If our word was "hotline" the only possible word to follow would be "bling". If the word was "feel", there would be two possibilities, "left" and "like". We randomly choose one to be the subsequent word.

So our current word forms our process's "present state" and that state can be used to predict what the subsequent word is, not necessarily precisely, but certainly statistically.
Building our own Generator

Let's get down to work building our own poetry generator.

We know that the first step is building a Markov Chain out of a word corpus. So to start, write a function that accepts a string and returns an array of the words in the string, uniformly formatted with no numbers or punctuation.

Now we need to write a function that uses that array of words to generate a Markov Chain. Remember, for our project the Markov Chain will be a dictionary of all the unique words in our corpus, and an array of all the words that follow it.

Now when we access wordPairs['you'] we'll get all the words following 'you' in the corpus.

We now have two valuable pieces of data: the corpus text and a Markov Chain representation of it.

Create a function writeLine that takes a Markov Chain (object) and a length of words n and returns a line of poetry.

writeLine will need a helper function that takes a word and randomly chooses a word from its Markov Chain array. When a word has no entries in it's Markov Chain, the program should choose a new word and continue the line until it meets the word count.
Putting it all Together

With our writeLine function, we can now write our broader generatePoem function. Set up the function to accept two parameters: a word corpus and a number of lines. Inside the function, use the functions we've written to generate a poem with the number of lines specified.

###Further Improvements

As it is, you've probably "hardcoded" a number of words for each line. Refactor your code to be more dynamic. Two possible approaches:

    Set up generatePoem to accept a third parameter that specifies the number of words in each line.
    Set up generatePoem to pass a random number (within a reasonable range) into writeLine.

Other potential improvements:

    Implement a Markov Chain that goes 2+ words deep
    Implement a Markov Chain that includes punctuation. To do this, the Markov Chain could stores two versions of words: one in a normalized context and one that keeps the original formatting.
    Experiment with HTML and CSS to create a web app that lives outside of repl.it (SUPER BONUS FEATURE)
