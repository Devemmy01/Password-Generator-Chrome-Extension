const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const strengthSelect = document.getElementById('strength-select');
const strengthOptions = document.getElementById('strength-options'); 
const dropdownItems = document.querySelectorAll('.dropdown-options-item'); 

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value || 15; // Use a default length if lengthEl is null
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    const strength = strengthSelect.innerText.toLowerCase(); // Get the selected strength

    resultEl.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length,
        strength
    );
});

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;
    
    if(!password){
        alert("Sorry, no password generated!")

        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});

// Dropdown functionality
strengthSelect.addEventListener('click', () => {
    strengthOptions.style.display = strengthOptions.style.display === 'block' ? 'none' : 'block';
});

dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        strengthSelect.innerText = item.innerText;
        strengthOptions.style.display = 'none';
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown')) {
        strengthOptions.style.display = 'none';
    }
});

// Generate password based on selected strength
function generatePassword(lower, upper, number, symbol, length, strength) {
    
    let chars = '';
    let password = '';

    if (strength === 'low') {
        chars = lower ? 'abcdefghijklmnopqrstuvwxyz' : '';
    } else if (strength === 'medium') {
        chars = (lower ? 'abcdefghijklmnopqrstuvwxyz' : '') +
                (upper ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '');
    } else if (strength === 'high') {
        chars = (lower ? 'abcdefghijklmnopqrstuvwxyz' : '') +
                (upper ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '') +
                (number ? '0123456789' : '') +
                (symbol ? '!@#$%^&*()' : '');
    }

    for (let i = 0; i < length; i++) {
        const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
        password += randomChar;
    }

    return password;
}

// Generator functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols.charAt(Math.floor(Math.random() * symbols.length));
}
