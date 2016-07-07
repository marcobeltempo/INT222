//********************************************************************************//
//* Name :  Marco Beltempo                                                       *//
//* zenit login : int222_161d05                                                  *//
//********************************************************************************//
//********************************************************************************//
//*   Do not modify any statements in detailPaymentCalculation function          *//
//********************************************************************************//
function detailPaymentCalculation(mortAmount, mortDownPayment, mortRate, mortAmortization) {

      //********************************************************************************//
      //*   This function calculates the monthly payment based on the following:       *//
      //*                                                                              *//
      //*               M = P [ i(1 + i)n ] / [ (1 +  i)n - 1]                         *//
      //*                                                                              *//
      //*   Note: This function also updates the payment amount on the form            *//
      //********************************************************************************//
      var paymentError = "";
      var v = mortAmount * 1;
      var d = mortDownPayment * 1;
      var i = mortRate * 1;
      var y = mortAmortization * 1;
      var a = v - d;
      i = i / 100 / 12;
      n = y * 12;
      var f = Math.pow((1 + i), n);

      var p = (a * ((i * f) / (f - 1))).toFixed(2);

      if (p == "NaN" || p == "Infinity") {
         document.forms[0].payment.value = "";
      } else {
         document.forms[0].payment.value = p;
      }

   } // End of detailPaymentCalculation function

function calculatePayment() {

      //********************************************************************************//
      //*   You will need to call the functions that validate the following:           *//
      //********************************************************************************//
      //*        (1)              (2)              (3)             (4)                 *//
      //********************************************************************************//
      //*   Property value  -  Down payment  -  Interest rate -  Amortization          *//
      //********************************************************************************//
      //*   If there are no errors, then call                                          *//
      //*                                                                              *//
      //*      detailPaymentCalculation(...., ......, ......, ......);                 *//
      //*                                                                              *//
      //*   and make sure to pass the four values in the order shown above.            *//
      //*                                                                              *//
      //********************************************************************************//
      //*   If there are errors, present the client the following message in the       *//
      //*   reserved area on the form:                                                 *//
      //*                                                                              *//
      //*   Please complete the form first and then click on Calculate Monthly Payment *//
      //*                                                                              *//
      //********************************************************************************//

      // validate form
      formValidation();

   } // End of calculatePayment function

function formValidation() {

   //***************************************************************************************//
   //*                                                                                     *//
   //* This function calls the different functions to validate all required fields         *//
   //*                                                                                     *//
   //* Once you have called and validated all field, determine if any error(s)             *//
   //*  have been encountered                                                              *//
   //*                                                                                     *//
   //* If any of the required fields are in error:                                         *//
   //*                                                                                     *//
   //*    present the client with a list of all the errors in reserved area                *//
   //*         on the form and                                                             *//
   //*          don't submit the form to the CGI program in order to allow the             *//
   //*          client to correct the fields in error                                      *//
   //*                                                                                     *//
   //*    Error messages should be meaningful and reflect the exact error condition.       *//
   //*                                                                                     *//
   //*    Make sure to return false                                                        *//
   //*                                                                                     *//
   //* Otherwise (if there are no errors)                                                  *//
   //*                                                                                     *//
   //*    Recalculate the monthly payment by calling                                       *//
   //*      detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) *//
   //*                                                                                     *//
   //*    Change the 1st. character in the field called client to upper case               *//
   //*                                                                                     *//
   //*    Change the initial value in the field called jsActive from N to Y                *//
   //*                                                                                     *//
   //*    Make sure to return true in order for the form to be submitted to the CGI        *//
   //*                                                                                     *//
   //***************************************************************************************//

   var errorBox = "";
   document.getElementById('errorBox').innerHTML = ""; // clear errors

   // validate all fields and set error message
   errorBox += checkUserId(errorBox) + validateClient(errorBox) + validateAmort(errorBox) + validateIntRate(errorBox) + validateYear(errorBox) + validateMonth(errorBox) + validatePropValue(errorBox) + validateIncome(errorBox) + validateLocation(errorBox) + validateDetails(errorBox);

   if (errorBox != "") {
      document.getElementById('errorBox').innerHTML = errorBox; // show errors

      // cancel submission
      //errorBox +="TESTETSTEST"
      return false;
   } else {

      var amortization = document.mortgage.amortization.value;
      var intRate = document.mortgage.intRate.value;
      var propValue = document.mortgage.propValue.value;
      var downPay = document.mortgage.downPay.value;

      /*if (propValue== null || downPay == null || intRate== null || amortization == null){

    //document.mortgage.errorBox.value = "TESTESTEST";
    document.getElementById('errorBox').value = "PLEASE WORK IM TIRED";
  }

//NOT WORKING
*/

      detailPaymentCalculation(propValue, downPay, intRate, amortization);

      // on submission change first charecter of name to uppercase
      var client = document.mortgage.client.value;
      client = client.charAt(0).toUpperCase() + client.slice(1);
      document.mortgage.client.value = client;
      document.mortgage.jsActive.value = 'Y';

      //form validated
      return true;
   }
}

/*  Rule #1	All 10 positions must be present
Rule #2	Position 5 must be a hyphen (-)
Rule #3	Position 1 to 4 must be numeric digits
Rule #4	Position 6 to 10 must be numeric digits
Rule #5	The sum of the numbers to the left of the hyphen (-)
 must be greater than zero and the sum of the numbers to the right of the
  hyphen (-) must be greater than zero
Rule #6	The sum of the numbers to the right of the hyphen (-) must be
(double plus 2) the sum of the numbers to the left of the hyphen (-)
You must provide a different message for the different error conditions*/

function checkUserId(errorBox) {
      var userId = document.mortgage.userId.value;

      // check that a value is present
      if (userId.length == "") {
         errorBox += "Please enter a User Id. <br>";
      }
      if (userId.length != "") {
         if (userId.length != 10) {
            errorBox += "The user ID must be 10 characters long. <br>";
         }
         if (userId[4] != "-") {
            errorBox += "Position 5 must be a hyphen (-) <br>";
         }
         var i;
         for (i = 0; i < 4; i++) {
            if (isNaN(userId[i])) {
               errorBox += "UserId position " + (i + 1) + " must be a numeric digit <br>";
               break;
            }
         }
         for (i = 5; i < 10; i++) {
            if (isNaN(userId[i])) {
               errorBox += "UserId position " + (i + 1) + " must be a numeric digit <br>";
               break;
            }
         }
      }
      /* If rules 1-4 have passed
         The sum of the numbers to the left of the hypen must be
         greater than zero
         and the sum of the bumbers to the right of the hypen must
          be greater than zero*/

      if (errorBox == "") {
         var lowsum = 0;
         for (i = 0; i < 4; i++) {
            lowsum += parseInt(userId[i]);
         }
         if (lowsum <= 0) {
            errorBox += "The sum of the first 4 numbers of UserId must be greater than 0 <br>";
         }
         var highsum = 0;
         for (i = 5; i < 10; i++) {
            highsum += parseInt(userId[i]);
         }
         if (highsum <= 0) {
            errorBox += "The sum of the flast 5 numbers of UserId must be greater than 0 <br>";
         }
         if (highsum != (lowsum * 2) + 2) {
            errorBox += "The sum of the last 5 numbers must be the double + 2 of the first 4 numbers <br>";
         }

      }
      return errorBox;
   }
   /* NOT ALLOWED TO USE REGEX -_-
           function validateClient(errorBox) {
             var client = document.mortgage.client.value;
             var client1 = isLetter(client);

             if (client1 || client1 != "") {

               var firstThree = client.substring(0, 3);
               var firstThreeValid = isLetter(firstThree);

               if (firstThreeValid && client1 != "")
             } else
               errorBox += "TEST1";
             } else
             errorBox += "First 3 charecetrs must be from A-1Z <br>";
             return errorBox;
           }
           // This function validates the client name. The regEx allows for upper/ lower A-Z
           // also allows for an ' to be entered
           function isLetter(str) {
             return str.match("^[a-zA-Z\'\]+$");
           }
           */

/* Must be present
Can contain a combination of:
alphabetic characters (a to z) (A to Z)
one (1) apostrophe (') - optional
Must have at least 3 alphabetic characters (a-z) (A-Z) at the
beginning of the field an apostrophe (') at the beginning or
at the end of the name is not valid
*/
function validateClient(errorBox) {

      var clientName = document.mortgage.client.value;
      clientName = clientName.trim();
      var clientLength = clientName.length;

      if (clientLength === 0) {
         errorBox += "Please enter a Client Name. <br>";
      } else if (clientName.charAt(0) == "\'" || clientName.charAt(clientName.length - 1) == "\'") {
         errorBox += "Client name cannot start or end with an apostrphe.<br>";

      } else {
         if (clientLength < 3) {
            errorBox += "Please enter a minimum of 3 alphanumeric characters <br>";
         } else {
            clientName = clientName.toUpperCase(); //converts to Upper case so its easier to check

            var countNonAlpha = 0;

            for (var i = 0; i < clientLength; i++) {

               if (!(((clientName.charCodeAt(i) > 64) && (clientName.charCodeAt(i) < 91) || (clientName.charCodeAt(i) === 39 )))) { // A=65  .....  Z=90 - upper case range. 39 = apostrophe

                  countNonAlpha++;

                  break;

               }

            } // End of the for loop


            var apostrophe = -1;
            //checking for more than 1 apostrophe
            for (var i = 0; i < clientName.length; i++) {
               if (clientName.charCodeAt(i) === 39) {
                  if (apostrophe !== -1) {
                     errorBox += "Client name cannot containe more than one aprostrophe (') <br>"
                  } else {
                     apostrophe = i;
                  }

            }
          } // End of the for loop

            if (countNonAlpha) {

               errorBox += "Please enter valid charecters from [A-Z]-[a-z] <br>";

            }
         }

      }
      return errorBox;
   }
   /*Must be present
   Must be numeric. Allowable values: 05 thru 20 inclusive
   Note: 5 thru 20 are also allowed
   */
function validateAmort(errorBox) {

   var amortization = document.mortgage.amortization.value;

   if (amortization.length !== 0) {
      if (isNaN(amortization)) {
         errorBox += "Amortization must be a numeric value. <br>";
      }
      if (amortization < 5 || amortization > 20) {
         errorBox += "Amortization must be values between [5-20]. <br>";

      }

   } else {
      errorBox += "Please enter an amortization. <br>";
   }
   return errorBox;
}

/*Must be present
Must be numeric. Allowable values: 3.000 thru 16.000 inclusive

Note: 3 thru 16 are also allowed*/
function validateIntRate(errorBox) {

      var intRate = document.mortgage.intRate.value;

      if (intRate.length !== 0) {
         if (isNaN(intRate)) {
            errorBox += "Interest Rate must be a numeric value. <br>";
         }
         if (intRate < 3.000 || intRate > 16.000) {
            errorBox += "Interest Rate must be values between [3.00-16.00]. <br>";
         }
      } else {
         errorBox += "Please enter an Interest Rate. <br>";
      }
      return errorBox;

   }
   /*Must be present
   Must be numeric
   Must be equal to the current year or 1 year greater than current year.*/

function validateYear(errorBox) {
   var year = document.mortgage.mortYear.value;
   var date = new Date();
   var currentYear = date.getFullYear();

   if (year.length !== 0) {
      if (isNaN(year)) {
         errorBox += "Year must be a numeric value. <br>";
      }
      if (year < currentYear || year > currentYear + 1) {
         //output was showing a year behind so currentYear + 1
         errorBox += "Must enter current year or one year greater. <br>";

      }
   } else {
      errorBox += "Please enter a Year. <br>";
   }
   return errorBox;
}

/*Must be present
Must be numeric.
Must be equal to the current month or 1 month greater than current month.
Allowable values: 01 thru 12 inclusive
Note: 1 thru 12 are also allowed
*/

function validateMonth(errorBox) {
   var date = new Date();
   var month = document.mortgage.mortMonth.value;
   var currentMonth = date.getMonth() + 1;

   if (month.length !== 0) {
      if (isNaN(month)) {
         errorBox += "Month must be a numeric value between [1-12]. <br>";
      }

      if (month < currentMonth || month > currentMonth + 1) {
         errorBox += "Must enter current month or one month greater . <br>";

      }

   } else {
      errorBox += "Please enter a Month. <br>";
   }

   return errorBox;
}

/*PropValue Must be present
Must be numeric - positive - whole number
Must be at least 65,000 dollars more that the down payment.

DownPay Must be present
Must be numeric - positive - whole number
Must be at least 20% of the value of the property (propValue)

*/

function validatePropValue(errorBox) {
      var propValue = document.mortgage.propValue.value;

      if (propValue.length !== 0) {
         if (isNaN(propValue)) {
            errorBox += "Property Value must be a numeric value. <br>";
         }
         if (propValue % 1 != 0 || propValue < 0) {
            errorBox += "Property Value must be a whole positive number. <br>";
         }
      } else {
         errorBox += "Please enter a Property Value. <br>";
      }

      var downPay = document.mortgage.downPay.value;

      if (downPay.length !== 0) {
         if (isNaN(downPay)) {
            errorBox += "Down Payment must be a numeric value. <br>";
         }
         if (propValue % 1 != 0 || propValue < 0) {
            errorBox += "Down Payment must be a whole positive number. <br>";
         }
         if (propValue <= downPay + 65000) {
            errorBox += "Property Value must be at least $65,000 greater than the down payment  <br>";
         }

         if (downPay < propValue * 0.2) {
            errorBox += "Down Payment must be at least 20% of the value of the property  <br>";
         }
      } else {
         errorBox += "Please enter a Down Payment. <br>";
      }

      return errorBox;
   }
   /* The client/user must select one of the menu options */
function validateIncome(errorBox) {
   var incomeRange = document.mortgage.income.selectedIndex;
   if (incomeRange === -1) {
      errorBox += "Please make an Income Range selection <br>";

   }
   return errorBox;
}

function validateLocation(errorBox) {
      var location = document.mortgage.propLocation.selectedIndex;
      if (location === -1) {
         errorBox += "Please select a Location <br>";

      }
      return errorBox;
   }
   /*The client/user must click on one of the radio buttons */
function validateDetails(errorBox) {
   var propDetails = document.mortgage.propDetails;
   var selection = null;

   for (var i = 0; i < propDetails.length; i++) {

      if (propDetails[i].checked)

      {
         selection = propDetails[i].value;
      }

   }
   if (selection == null) {
      errorBox += "Please select a Property Type <br>";
   }

   return errorBox;
}
