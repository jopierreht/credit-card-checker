// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
const validateCred = creditCard => {
    const toSumUp = [];

    // Iterate from the second-to-last digit to the first
    for (let i = creditCard.length - 2; i >= 0; i -= 2 ) {
        let currentDigitOdd = creditCard[i] * 2;
        
        // Double every other digit start from the second-to-right while removing 9 to those > 9
        if (currentDigitOdd > 9) {
            toSumUp.unshift(currentDigitOdd - 9);
        } else {
            toSumUp.unshift(currentDigitOdd);
        }
    }

    // Push the last digit to the new Array
    toSumUp.unshift(creditCard[creditCard.length - 1]);

    for (let i = creditCard.length - 3; i >= 0; i -= 2 ) {
        let currentDigitEven = creditCard[i];
        toSumUp.unshift(currentDigitEven);
    }

    // Sum up the digits in the toSumUp variable
    const sum = toSumUp.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    // Conditions for the credit card to be valid
   return sum % 10 === 0

}

// Step 4

const findInvalidCards = creditCardList => {
    const invalidCards = [];
    creditCardList.forEach(creditCard => {
        if (validateCred(creditCard) === false) {
            invalidCards.push(creditCard);
        }
    })
    return invalidCards;
}


const idInvalidCardCompanies = invalidCards => {
    const invCardCompanies = new Set(); 

    invalidCards.forEach(cardNumber => {
        const firstDigit = cardNumber[0];
        switch (firstDigit) {
            case 3:
                invCardCompanies.add('Amex (American Express)');
                break;
            case 4:
                invCardCompanies.add('Visa');
                break;
            case 5:
                invCardCompanies.add('Mastercard');
                break;
            case 6:
                invCardCompanies.add('Discover');
                break;
            default:
                console.log(`Company not found for card starting with ${firstDigit}`);
        }
    });

    return Array.from(invCardCompanies); 
};

// Step 7 - Extra

const convertStringToArray = creditCardString => {
    return creditCardString.split("").map(char => Number(char));
};

const convertToValidNumber = creditCard => {
    // Make a copy of the credit card array to avoid modifying the original
    let cardCopy = [...creditCard];
    
    // Calculate the checksum digit and set the last digit to make it valid
    for (let i = 0; i <= 9; i++) {
        cardCopy[cardCopy.length - 1] = i;  // Try each digit for the last position
        if (validateCred(cardCopy)) {
            return cardCopy;  // Return the valid card once found
        }
    }

    return cardCopy;  // If no valid number is found (shouldn't happen)
}





