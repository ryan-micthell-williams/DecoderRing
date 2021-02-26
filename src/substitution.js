// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {

  // global reference alphabet
  const alpha = "abcdefghijklmnopqrstuvwxyz".split('');
  
  // test if string contains any duplicate chars
  function isUnique(str) {
    let letters = {};
    str.split('').forEach(char => {
      if (letters[char]) {
        letters[char] = false;
      } else {
        letters[char] = true;
      }
    });

    // If the letters object has any false values, there's one or more duplicates
    return !Object.values(letters).includes(false);
  }

  function substitution(input, alphabet, encode = true) {
    // short circuit 
    if (!alphabet || !isUnique(alphabet) || alphabet.length != 26) return false;

    // create cypherKey codex
    const codex = alphabet.split('');

    // standardize the input and break it apart
    let inputSplit = input.toLowerCase().split('');

    let returnString = '';

    if (encode) {
      // hide the message

      inputSplit.forEach(element => {
        if (alpha.includes(element)) {
          // lookup the cypher char and add it
          returnString += codex[alpha.indexOf(element)];
        } else {
          // retain any non alphabet characters
          returnString += element;
        }
      });

    } else {
      // initiate decode
      
      inputSplit.forEach(element => {
        if (codex.includes(element)) {
          // search for the deciphered char and add it
          returnString += alpha[codex.indexOf(element)];
        } else {
          // retain any characters that aren't contained within the alphabet
          returnString += element;
        }
      });
    }

    return returnString;
  }

  return {
    substitution,
  };
})();

module.exports = substitutionModule.substitution;
