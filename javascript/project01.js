/*
    Name: Mike Villeneuve
    Date: 06/28/2022
*/ 


// Initialization function that plays the role of the controller and add an 
// event listener to the submit button.
const init = () => {
    "use strict";

    // Add event listener to Submit button
    let submitButton = document.querySelector("#submitButton");
    submitButton.addEventListener("click", calculateTaxes);

}

/*
    This application accepts a user entered value for gross salary and displays 
    it.  From this value it then calculates and displays federal tax, wisconsin 
    state tax, social security tax, and medicare tax.  It then finds the sum of 
    all taxes to determine the total tax liability and displays it.  Finally it 
    calculates net income and displays it.
*/
const calculateTaxes = () => {
    "use strict";
    
    let grossIncome = captureGrossIncome();  // replace with hardcoded value for testing
    console.log(`Gross Income: $${grossIncome}`);

    federalTaxes(grossIncome);
    console.log(`Federal Tax: $${federalTaxes(grossIncome).toFixed(2)}`);

    wisconsinTaxes(grossIncome);
    console.log(`Wisconsin Tax: $${wisconsinTaxes(grossIncome).toFixed(2)}`);

    ficaTaxes(grossIncome);
    console.log(`Social Security Tax: $${ficaTaxes(grossIncome).toFixed(2)}`);

    medicareTaxes(grossIncome);
    console.log(`Medicare Tax: $${medicareTaxes(grossIncome).toFixed(2)}`);

    totalTaxes(grossIncome);
    console.log(`Total Tax Liablility: $${totalTaxes(grossIncome).toFixed(2)}`);

    netIncome(grossIncome);
    console.log(`Net Income: $${netIncome(grossIncome).toFixed(2)}`);

    // Formats the display output as a table with the results of the precedding 
    // calculations
    document.getElementById("output").innerHTML = (
        `<br />
        <table id="outputTable">
            <tr>
                <td>Gross Income: </td>
                <td>$${grossIncome}</td>
            </tr>
            <tr>
                <td>Federal Tax: </td>
                <td>$${federalTaxes(grossIncome).toFixed(2)}</td>
            </tr>
            <tr>
                <td>Wisconsin Tax</td>
                <td>$${wisconsinTaxes(grossIncome).toFixed(2)}</td>
            </tr>
            <tr>
                <td>Social Securityu Tax</td>
                <td>$${ficaTaxes(grossIncome).toFixed(2)}</td>
            </tr>
            <tr>
                <td>Medicare Tax</td>
                <td>$${medicareTaxes(grossIncome).toFixed(2)}</td>
            </tr>
            <tr>
                <td>Total Tax Liability</td>
                <td>$${totalTaxes(grossIncome).toFixed(2)}</td>
            </tr>
            <tr>
                <td>Net Income</td>
                <td>$${netIncome(grossIncome).toFixed(2)}</td>
            </tr>
        </table>`
    );

    /* Test cases

    Federal test cases:
    Bracket 1 test case: 100 -> 0 + 10 = 10.0
    Bracket 2 test case: 9975 -> 987.5 + 12 = 999.5
    Bracket 3 test case: 40225 -> 4617.5 + 22 = 4639.5
    Bracket 4 test case: 85625 -> 14605.5 + 24 = 14629.5
    Bracket 5 test case: 163400 -> 33271.5 + 32 = 33303.5
    Bracket 6 test case: 207450 -> 47367.5 + 35 = 47402.5
    Bracket 7 test case: 518400 -> 518500 + 37 = 156272.0

    Wisconsin test cases:
    Bracket 1 test case: 100 -> 0 + 3.54 = 3.54
    Bracket 2 test case: 12070 -> 423.74 + 4.65 = 428.39
    Bracket 3 test case: 24030 -> 979.88 + 6.27 = 986.15
    Bracket 4 test case: 263580 -> 15999.67 + 7.65 = 16007.32

    FICA test cases: 
    Bracket 1 test case: 100 -> 0 + 6.2 = 6.2
    Bracket 2 test case: 137100 -> 8494.0 + 0 = 8494.0
    Bracket 2 test case: 250000 -> 8494.0 + 0 = 8494.0    

    Medicare Test cases: 
    Bracket 1 test case: 100 -> 0 + 1.45 = 1.45
    Bracket 2 test case: 200100 -> 2900 + 2.35 = 2902.35

    */
};


// Captures the user entered salary in the textbox
const captureGrossIncome = () => {
    "use strict";

    let grossIncomeInput = document.querySelector("#salaryField").value;

    return grossIncomeInput;
}


// Calculate the appropriate federal tax
const federalTaxes = grossIncome => {
    "use strict";
   
    // Tax thresholds
    const taxThreshold01 = 9875; 
    const taxThreshold02 = 40125; 
    const taxThreshold03 = 85525; 
    const taxThreshold04 = 163300;
    const taxThreshold05 = 207350; 
    const taxThreshold06 = 518400; 

    // Cumulative tax on brackets 1 through 6 at 100%
    const taxOnBracket01 = 987.5;
    const taxOnBrackets01And02 = 4617.5;
    const taxOnBrackets01Through03 = 14605.5;
    const taxOnBrackets01Through04 = 33271.5;
    const taxOnBrackets01Through05 = 47367.5;
    const taxOnBrackets01Through06 = 156235;

    let federalTaxes = 0;

    // Check gross income against thresholds and pass to appropriate tax 
    // bracket function    
    if (grossIncome <= taxThreshold01) {
        federalTaxes = calculate10PercentBracket(grossIncome);
    }
    else if (grossIncome <= taxThreshold02) {
        federalTaxes = calculate12PercentBracket(grossIncome, taxThreshold01, taxOnBracket01);
    }
    else if (grossIncome <= taxThreshold03) {
        federalTaxes = calculate22PercentBracket(grossIncome, taxThreshold02, taxOnBrackets01And02);        
    }
    else if (grossIncome <= taxThreshold04) {
        federalTaxes = calculate24PercentBracket(grossIncome, taxThreshold03, taxOnBrackets01Through03);
    }
    else if (grossIncome <= taxThreshold05) {
        federalTaxes = calculate32PercentBracket(grossIncome, taxThreshold04, taxOnBrackets01Through04);
    }
    else if (grossIncome <= taxThreshold06) {
        federalTaxes = calculate35PercentBracket(grossIncome, taxThreshold05, taxOnBrackets01Through05);
    }
    else if (grossIncome > taxThreshold06) {
        federalTaxes = calculate37PercentBracket(grossIncome, taxThreshold06, taxOnBrackets01Through06);
    }

    return federalTaxes;
};


//Begin federal tax bracket calculations
const calculate10PercentBracket = grossIncome => {
    "use strict";

    const taxPercentage = 0.10;
    let tax = 0;
    
    tax = grossIncome * taxPercentage;

    return tax;
};

const calculate12PercentBracket = (grossIncome, taxThreshold01, taxOnBracket01) => {
    "use strict";
    
    const taxPercentage = 0.12;
    let tax = taxOnBracket01
    let bracketTaxableIncome = grossIncome - taxThreshold01;

    tax += bracketTaxableIncome * taxPercentage;
    
    return tax;
};

const calculate22PercentBracket = (grossIncome, taxThreshold02, taxOnBrackets01And02) => {
    "use strict";
    
    const taxPercentage = 0.22;
    let tax = taxOnBrackets01And02
    let bracketTaxableIncome = grossIncome - taxThreshold02;

    tax += bracketTaxableIncome * taxPercentage;
    
    return tax;
};

const calculate24PercentBracket = (grossIncome, taxThreshold03, taxOnBrackets01Through03) => {
    "use strict";
    
    const taxPercentage = 0.24;
    let tax = taxOnBrackets01Through03
    let bracketTaxableIncome = grossIncome - taxThreshold03;

    tax += bracketTaxableIncome * taxPercentage;
    
    return tax;
};

const calculate32PercentBracket = (grossIncome, taxThreshold04, taxOnBrackets01Through04) => {
    "use strict";
    
    const taxPercentage = 0.32;
    let tax = taxOnBrackets01Through04
    let bracketTaxableIncome = grossIncome - taxThreshold04;

    tax += bracketTaxableIncome * taxPercentage;
    
    return tax;
};

const calculate35PercentBracket = (grossIncome, taxThreshold05, taxOnBrackets01Through05) => {
    "use strict";
    
    const taxPercentage = 0.35;
    let tax = taxOnBrackets01Through05
    let bracketTaxableIncome = grossIncome - taxThreshold05;

    tax += bracketTaxableIncome * taxPercentage;
    
    return tax;
};

const calculate37PercentBracket = (grossIncome, taxThreshold06, taxOnBrackets01Through06) => {
    "use strict";
    
    const taxPercentage = 0.37;
    let tax = taxOnBrackets01Through06
    let bracketTaxableIncome = grossIncome - taxThreshold06;

    tax += bracketTaxableIncome * taxPercentage;
    
    return tax;
};
// End federal tax bracket calculations


// Calculate the appropriate Wisconsin tax
const wisconsinTaxes = grossIncome => {
    "use strict";
   
    // Tax thresholds
    const taxThreshold01 = 11970;
    const taxThreshold02 = 23930;
    const taxThreshold03 = 263480; 

    // Cumulative tax on brackets 1 through 6 at 100%
    const taxOnBracket01 = 423.74;
    const taxOnBrackets01And02 = 979.88;
    const taxOnBrackets01Through03 = 15999.67;

    let wisconsinTaxes = 0;

    // Check gross income against thresholds and pass to appropriate tax 
    // bracket function    
    if (grossIncome <= taxThreshold01) {
        wisconsinTaxes = calculateBracket01(grossIncome);
    }
    else if (grossIncome <= taxThreshold02) {
        wisconsinTaxes = calculateBracket02(grossIncome, taxThreshold01, taxOnBracket01);
    }
    else if (grossIncome <= taxThreshold03) {
        wisconsinTaxes = calculateBracket03(grossIncome, taxThreshold02, taxOnBrackets01And02);        
    }
    else if (grossIncome > taxThreshold03) {
        wisconsinTaxes = calculateBracket04(grossIncome, taxThreshold03, taxOnBrackets01Through03);
    }

    return wisconsinTaxes;
}


// Begin Wisconsin tax bracket calculations
const calculateBracket01 = grossIncome => {
    "use strict";
    
    const taxPercentage = 0.0354;
    let tax = 0;
    
    tax = grossIncome * taxPercentage;

    return tax;
};

const calculateBracket02 = (grossIncome, taxThreshold01, taxOnBracket01) => {
    "use strict";
    
    const taxPercentage = 0.0465;
    let tax = taxOnBracket01
    let bracketTaxableIncome = grossIncome - taxThreshold01;

    tax += bracketTaxableIncome * taxPercentage;
    
    return tax;
};

const calculateBracket03 = (grossIncome, taxThreshold02, taxOnBrackets01And02) => {
    "use strict";
    
    const taxPercentage = 0.0627;
    let tax = taxOnBrackets01And02
    let bracketTaxableIncome = grossIncome - taxThreshold02;

    tax += bracketTaxableIncome * taxPercentage;
    
    return tax;
};

const calculateBracket04 = (grossIncome, taxThreshold03, taxOnBrackets01Through03) => {
    "use strict";
    
    const taxPercentage = 0.0765;
    let tax = taxOnBrackets01Through03
    let bracketTaxableIncome = grossIncome - taxThreshold03;

    tax += bracketTaxableIncome * taxPercentage;
    
    return tax;
};
// End Wisconsin tax bracket calculations


// Calculate the appropriate social security (FICA) tax
const ficaTaxes = grossIncome => {
    "use strict";

    const taxPercentage = 0.062;
    const taxThreshold = 137000;
    const firstBracketTax = 8494;
    let tax = 0;

    if (grossIncome <= taxThreshold) {
        tax = grossIncome * taxPercentage;
    }
    else {
        tax = firstBracketTax;
    }

    return tax;
}


// Calculate the appropriate medicare tax
const medicareTaxes = grossIncome => {
    "use strict";

    const taxPercentage = 0.0145;
    const taxPercentage02 = 0.0235;
    const taxThreshold = 200000;
    const firstBracketTax = 2900;
    let secondBracketTax = 0;
    let tax = 0;

    if (grossIncome <= taxThreshold) {
        tax = grossIncome * taxPercentage;
    }
    else {
        secondBracketTax = (grossIncome - taxThreshold) * taxPercentage02;
        tax = firstBracketTax + secondBracketTax;
    }

    return tax;
}


// Calculate the sum of all taxes
const totalTaxes = grossIncome => {
    "use strict";

    let totalTax = 0;
    let federalTax = federalTaxes(grossIncome);
    let wisconsinTax = wisconsinTaxes(grossIncome);
    let ficaTax = ficaTaxes(grossIncome);
    let medicareTax = medicareTaxes(grossIncome);

    totalTax = federalTax + wisconsinTax + ficaTax + medicareTax;

    return federalTax + wisconsinTax + ficaTax + medicareTax;
}


// Calculate the net income
const netIncome = grossIncome => {
    "use strict";

    let netPay = 0;

    netPay = grossIncome - totalTaxes(grossIncome);

    return netPay;
}


// Calls the init function on page load.
window.onload = init;