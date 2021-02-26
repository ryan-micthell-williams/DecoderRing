// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6


const caesarModule = (function () {

  //_________________________HELPER FUNCTIONS____________________________________

  /*
  params: character - a character to shift to
          shift-how many letters to shift in the alphabet
          foward- a boolean to represent whether we are shifting forward or not
  returns: a new character
   */

  const caesarShift = (character, shift, forward = true) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let index = character.charCodeAt() - 97;
    let newChar = alphabet[index];
    for (let i = shift; i > 0; i--) {
      if (index === 25 && forward) { // Wrap around and continue shifting if we hit a wall
        index = 0;
        newChar = alphabet[index];
      } else if (index === 0 && !forward) { // Wrap around and continue shifting if we hit a wall
        index = 25;
        newChar = alphabet[index];
      } else if (index != 0 && !forward) { // just keep shifting
        index -= 1;
        newChar = alphabet[index];
      } else { // just keep shifting
        index += 1;
        newChar = alphabet[index];
      }
    }
    return newChar;
  }
  /*
 params: message - a string to be encoded or decoded
         shift- how many letters to shift in the alphabet
         foward- a boolean to represent whether we are shifting forward or not
 returns: an encoded or decorded string
  */
  const messageCoding = (message, shift, forward = true) => {
    shift = Math.abs(shift);
    let output = "";
    for (let i = 0; i < message.length; i++) { //iterate through each character is out message
      let charCode = message.charCodeAt(i); // get char code of current character
      if (charCode <= 122 && charCode >= 97) { //If the character is in the alphabet, shift the character
        //What character we want to add depends on the direction we are shifting
        (forward) ? output += caesarShift(message[i], shift, true) : output += caesarShift(message[i], shift, false);
      }
      else { //If a special charcter or space is in our input message, just add it
        output += message[i];
      }
    }
    return output; //return the new message
  }



  //________________________caesar encoding/decoding______________________________
  function caesar(input, shift = null, encode = true) {
    // your solution code here
    //Input Validaiton
    if (typeof (input) != 'string') return false;
    if (typeof (shift) != 'number') return false;
    if (!shift || shift < -25 || shift > 25) return false;

    //Ignore caps
    input = input.toLowerCase();

    //Encode/Decode
    switch (true) {
      case (shift > 0 && encode === true) || (shift < 0 && encode === false):
        //we shift forwards
        return messageCoding(input, shift, true);
      case (shift < 0 && encode === true) || (shift > 0 && encode === false):
        //we shift backwards
        return messageCoding(input, shift, false);
    }
  }

  return {
    caesar,
  };
})();

module.exports = caesarModule.caesar;



