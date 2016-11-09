/**
 * @file Provides functions for analyzing email adresses.
 * @author Daniel Scheffknecht
 */

const regexEmail = /^[a-z]{2,}\.([a-z]{3})-([b|m])(\d{4})@fh-salzburg\.ac\.at$/i;
const regexEmailGroups = {
  DegreeProgram: 1,
  Level: 2,
  StartingYear: 3
};
const DURATION_BACHELOR_DEGREE = 3; // [Years]
const DURATION_MASTER_DEGREE = 2 // [Years]

/**
 * Determines if the given email adress is a valid FHS email adress.
 * Note that email adresses of all degree courses (mmt, mma, ..) are
 * seen as valid.
 * 
 * @param {string} email
 * @returns {Boolean}
 */
export function valid(email) {
  var isValid = regexEmail.test(email);
  return isValid;
}

/**
 * Extracts the degree program (MMT, MMA, ..) from the email adress.
 * 
 * @param {string} email
 * @returns {string|Boolean} The degree program as string, or false if it could not be extracted.
 */
export function degreeProgram(email) {
  var groups = regexEmail.exec(email);
  if (groups) {
    return groups[regexEmailGroups.DegreeProgram].toUpperCase();
  } else {
    return false;
  }
}

/**
 * Extracts the level (BA or MA) from the email adress.
 * 
 * @param {string} email
 * @returns {string|Boolean} The level as string, or false if it could not be extracted.
 */
export function level(email) {
  var groups = regexEmail.exec(email);
  if (groups) {
    var level = groups[regexEmailGroups.Level].toUpperCase() + 'A';
    return level;
  } else {
    return false;
  }
}

/**
 * Returns the graduation year based on the given email adress.
 * 
 * @param {string} email
 * @returns {Number|Boolean} The graduation year as number, or false if it could not be extracted.
 */
export function graduationYear(email) {
  var groups = regexEmail.exec(email);
  if (!groups)
    return false;

  var startingYear = groups[regexEmailGroups.StartingYear];
  var level = groups[regexEmailGroups.Level];
  var graduationYear = parseInt(startingYear, 10) + ( level === 'b' ? DURATION_BACHELOR_DEGREE : DURATION_MASTER_DEGREE );
  return graduationYear;
}
