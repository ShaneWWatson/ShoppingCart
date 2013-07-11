function setVisible(idLoc) {
    "use strict";
    var menuItem = document.getElementById(idLoc);
    menuItem.style.visibility = 'visible';
}
function setHidden(idLoc) {
    "use strict";
    var menuItem = document.getElementById(idLoc);
    menuItem.style.visibility = 'hidden';
}
function cookieCheck() { // verify that cookie exists on page load
    "use strict";
    if (navigator.cookieEnabled === false) { // If cookies are turned off,
        // tell the user to
        // turn them on.
        frames.main.location.href = 'NoCookies.html'; // Redirect the
        // customer to the
        // "No Cookies" page
        // if cookies aren't
        // enabled.
    } else {
        var cookieTemp = decodeURI(document.cookie), // decode cookie and
        // place data in
        // cookieTemp
        cookieData = cookieTemp.split("; "); // Separate the data by
        // using a semicolon
        if (cookieData[0] === "") {
            document.cookie = encodeURI("CustItemCount=" + parseInt("0", 10));
            /**
             * Enter the customer's number of carted items into the cookie.
             */
        }
    }
}
function addToCart(item) { // function to add an item to the cart
    "use strict";
    // initialize itemCount variables
    var custItemCount = 0, // custItemCount is the total items in the cart
    itemCount = 0, cookieTemp = decodeURI(document.cookie), // decode cookie and
    // place data in
    // cookieTemp
    cookieData = cookieTemp.split("; "), // Separate out the data by using
    // semicolons and put it into the cookieData array
    arrayLength = 0, // initialize array counter
    arrayPointer = 0, // initialize arrayPointer
    countFlag = false; // initialize flags

    while (cookieData[arrayLength] !== undefined) {
        /**
         * Keep incrementing the arrayLength counter until the pointer lands on
         * an empty part of the array
         */
        if (cookieData[arrayLength] === undefined) {
            break;
            /**
             * If the cookie is empty, break out of this loop.
             */
        }
        arrayLength += 1; // increase counter for every filled element of the
        // array
    }
    arrayLength -= 1;
    /**
     * Decrement by one for last element (which was undefined). This makes sure
     * we don't leave empty elements in the array. If arrayLength becomes -1,
     * this tells the next loop that the cookie is empty and the loop should be
     * skipped.
     */
    // Begin search for custItemCount (Total items in cart)
    while ((countFlag !== true) && (arrayLength !== -1)) {
        /**
         * If the cookie isn't empty (arrayLength isn't -1), search for the
         * total items the customer has in their cart (custItemCount).
         */
        if (cookieData[arrayPointer].match("stItemCount") !== null) {
            /**
             * If the cookie is empty or if we've reached the end of the cookie,
             * skip this code block.
             */
            countFlag = true;
            custItemCount = Number(cookieData[arrayPointer].substring(
                    ((cookieData[arrayPointer].indexOf("=")) + 1),
                    (cookieData[arrayPointer].length)));
            custItemCount += 1;
        }
        if (arrayPointer === 0) { // If the cookie is empty, flip the flag.
            countFlag = true;
        }
        arrayPointer -= 1; // decrement loop counter
    }
    arrayPointer = 0;
    countFlag = false; // initialize flags
    while (countFlag !== true) { // search for Customer Item Count in cookie
        // array
        /**
         * If the cookie is not empty, find the item count in the cookie and
         * increment it by 1. Otherwise, skip this code block.
         */
        if (cookieData[arrayPointer].match(item) !== null) {

            /**
             * If the cookie item matches "CustItemCount", increase the
             * ItemCount.
             */
            countFlag = true;
            itemCount = Number(cookieData[arrayPointer].substring(
                    ((cookieData[arrayPointer].indexOf("=")) + 1),
                    (cookieData[arrayPointer].length)));
            itemCount += 1;
        }
        if ((arrayPointer === 0) && (arrayLength === 0)) {
            /**
             * If the cookie is empty, add one to the total items in the cart
             * (CustItemCount) and the number of this item listed in the cookie
             * (itemCount). Then, break from the loop. Otherwise, skip this code
             * block.
             */
            itemCount = 1;
            custItemCount = 1;
            break;
        }
        if (arrayPointer === arrayLength) {
            break;
        }
        arrayPointer += 1; // increment array pointer
    }

    if (arrayPointer !== 0) {
        arrayPointer -= 1;
    }
    /**
     * Decrement array pointer to point to the end of the array.
     */
    parent.document.getElementById("ItemNum").innerHTML = "You have "
            + custItemCount + " items in your cart.";
    document.cookie = encodeURI("CustItemCount=" + custItemCount);
    if ((countFlag === true) && (arrayPointer >= 0)) {
        /**
         * If the cookie isn't empty and the customer already has one of these
         * items in the cart, encode the cookie with the value of itemCount for
         * that item. Otherwise, encode the cookie with one for the value of
         * that item.
         */
        document.cookie = encodeURI(item + "=" + itemCount);
    } else {
        /**
         * If the item to be added is already in the cookie array, increment
         * that item count by 1. Otherwise, increment the arrayPointer to look
         * at the next item in the cookie array.
         */
        while (cookieData[arrayPointer].match(item) !== item) {
            arrayPointer += 1;
            if ((arrayLength === 0) || (arrayPointer === arrayLength)) {
                break;
                /**
                 * Break if the array has no items in it yet or if we reach the
                 * end of the array.
                 */
            }
        }
        document.cookie = encodeURI(item + "=" + 1);
    }
}
function dynamicTable() {
    "use strict";
    /**
     * On frame load, create dynamic table that loads the customer's cart
     * contents into the table.
     */
    var cookieTemp = decodeURI(document.cookie),

    // decode cookie and place
    // data
    // in cookieTemp
    cookieData = cookieTemp.split("; "), // Separate out the data
    arrayLength = 0, // initialize array counter
    arrayPointer = 0, // initialize the array pointer
    cellPointer = 0, // Initialize newCell counter
    newRow = null, // initialize new row and cell variables to make a dynamic
    // table
    newCell = [ null, null, null, null, null, null, null, null, null, null,
            null ], // initialze the newCell array
    equalLocation = 0, // Initialize the variable holding the location of the
    // "=" in the cookie
    itemName = null, // Initialize the variable holding the first part of
    // each cookie (item name)
    itemQuantity = 0, // Initialize the count of the individual item
    itemTotal = 0, // Initialize the item total price
    grandTotal = 0; // Initialze the total purchase cost

    while (cookieData[arrayLength] !== undefined) {
        /**
         * Keep incrementing the arrayLength counter until the pointer lands on
         * an empty part of the array
         */
        if (cookieData[arrayLength] === undefined) {
            break;
            /**
             * If the cookie is empty, break out of this loop.
             */
        }
        arrayLength += 1; // increase counter for every filled element of the
        // array
    }
    // arrayLength -= 1;
    arrayPointer = 1; // Item counts can be found after total item count

    while (arrayPointer < (arrayLength + 1)) { // Create a dynamic table based
        // on the data in the cookieData
        // array

        newRow = document.getElementById('totals').insertRow(arrayPointer);
        /**
         * Insert a new row for every array element past the end so we don't
         * leave empty elements in the array.
         */

        cellPointer = 0; // Make sure cellPointer is zeroed out
        itemTotal = 0; // Zero out the item total for every new row
        while (cellPointer < 4) { // Create 3 new cells and fill them with
            // data
            newCell[cellPointer] = newRow.insertCell(cellPointer); // Create
            // the new
            // cell
            equalLocation = cookieData[arrayPointer].indexOf("="); // Find the
            // equal
            // sign in
            // the
            // string
            itemName = cookieData[arrayPointer].substring(0, equalLocation);
            /**
             * The item name is everything before the equal sign.
             */
            itemQuantity = Number(cookieData[arrayPointer].substring(
                    (equalLocation + 1), cookieData[arrayPointer].length));
            /**
             * The item quantity is everything after the equal sign.
             */

            switch (cellPointer) // Fill each new cell based on its position
            {
                case 0: // pull item names based on cookie data and put in new
                    // cell 1
                    switch (itemName) // For each unique item name, place item
                    // description in second cell of new row
                    {
                        case "KingstonMem1":
                            newCell[cellPointer].innerHTML = "<p>Kingston HyperX 4GB (2 x 2GB)</p><p>240-Pin DDR2 SDRAM DDR2 800</p><p>(PC2 6400)</p>";
                            break;

                        case "KingstonMem2":
                            newCell[cellPointer].innerHTML = "<p>Kingston HyperX 4GB (2 x 2GB)</p><p><200-Pin DDR2 SO-DIMM DDR2 667 (PC2 5300)</p>";
                            break;

                        case "CorsairMem1":
                            newCell[cellPointer].innerHTML = "<p>CORSAIR DOMINATOR 4GB (2 x 2GB)</p><p>240-Pin DDR2 SDRAM DDR2 1066 (PC2 8500)</p><p>Dual Channel Kit Desktop Memory</p>";
                            break;

                        case "CorsairMem2":
                            newCell[cellPointer].innerHTML = "<p>CORSAIR ValueSelect 512MB</p><p>200-Pin DDR SO-DIMM DDR 266 (PC 2100)</p><p>Laptop Memory</p>";
                            break;

                        case "COD4":
                            newCell[cellPointer].innerHTML = "<p>Call of Duty 4</p><p>Game of the Year Edition (PC) *OVERSTOCK*</p>";
                            break;

                        case "ES3":
                            newCell[cellPointer].innerHTML = "<p>Elder Scrolls 3: Morrowind</p><p>Game of the Year Edition (PC) *OVERSTOCK*</p>";
                            break;

                        case "Doom3":
                            newCell[cellPointer].innerHTML = "<p>Doom 3 (PC) *OVERSTOCK*</p>";
                            break;

                        case "Sims2DD":
                            newCell[cellPointer].innerHTML = "<p>The Sims 2 Double Deluxe (PC) *OVERSTOCK*</p>";
                            break;

                        case "SawMovie":
                            newCell[cellPointer].innerHTML = "<p>Saw</p><p>DVD *USED*</p>";
                            break;

                        case "Orphanage":
                            newCell[cellPointer].innerHTML = "<p>The Orphanage (2008)</p><p>DVD *USED*</p>";
                            break;

                        default:
                            window.alert("Error: Undefined Item Name ("
                                    + itemName + ")");
                            /**
                             * If the item isn't defined in the function, throw
                             * an error showing the undefined item so that the
                             * webmaster can FIX IT!
                             */

                            break;
                    }

                    break;

                case 1: // place quantity in new cell 3
                    newCell[cellPointer].innerHTML = itemQuantity;
                    break;

                case 2:
                    switch (itemName) // For each unique item name, place an
                    // item price in fourth cell of new row
                    {
                        case "KingstonMem1":
                            newCell[cellPointer].innerHTML = "$59.95";
                            break;

                        case "KingstonMem2":
                            newCell[cellPointer].innerHTML = "$65.15";
                            break;

                        case "CorsairMem1":
                            newCell[cellPointer].innerHTML = "$99.98";
                            break;

                        case "CorsairMem2":
                            newCell[cellPointer].innerHTML = "$14.99";
                            break;

                        case "COD4":
                            newCell[cellPointer].innerHTML = "$36.89";
                            break;

                        case "ES3":
                            newCell[cellPointer].innerHTML = "$14.99";
                            break;

                        case "Doom3":
                            newCell[cellPointer].innerHTML = "$12.98";
                            break;

                        case "Sims2DD":
                            newCell[cellPointer].innerHTML = "$22.15";
                            break;

                        case "SawMovie":
                            newCell[cellPointer].innerHTML = "$7.99";
                            break;

                        case "Orphanage":
                            newCell[cellPointer].innerHTML = "$11.99";
                            break;

                        default:
                            window.alert("Error: Undefined Item Name ("
                                    + itemName + ")");
                            /**
                             * If the item isn't defined in the function, throw
                             * an error showing the undefined item so that the
                             * webmaster can FIX IT!
                             */
                            break;
                    }
                    break;

                case 3:
                    switch (itemName) // For each unique item name, place a
                    // total item price in last cell of new
                    // row
                    {
                        case "KingstonMem1":
                            itemTotal = itemQuantity * 59.95; // Get the total
                            // item price
                            newCell[cellPointer].innerHTML = "$"
                                    + itemTotal.toFixed(2); // display
                            // total
                            // item price as a
                            // two decimal real
                            // number
                            break;

                        case "KingstonMem2":
                            itemTotal = itemQuantity * 65.15;
                            newCell[cellPointer].innerHTML = "$"
                                    + itemTotal.toFixed(2);
                            break;

                        case "CorsairMem1":
                            itemTotal = itemQuantity * 99.98;
                            newCell[cellPointer].innerHTML = "$"
                                    + itemTotal.toFixed(2);
                            break;

                        case "CorsairMem2":
                            itemTotal = itemQuantity * 14.99;
                            newCell[cellPointer].innerHTML = "$"
                                    + itemTotal.toFixed(2);
                            break;

                        case "COD4":
                            itemTotal = itemQuantity * 36.89;
                            newCell[cellPointer].innerHTML = "$"
                                    + itemTotal.toFixed(2);
                            break;

                        case "ES3":
                            itemTotal = itemQuantity * 14.99;
                            newCell[cellPointer].innerHTML = "$"
                                    + itemTotal.toFixed(2);
                            break;

                        case "Doom3":
                            itemTotal = itemQuantity * 12.98;
                            newCell[cellPointer].innerHTML = "$"
                                    + itemTotal.toFixed(2);
                            break;

                        case "Sims2DD":
                            itemTotal = itemQuantity * 22.15;
                            newCell[cellPointer].innerHTML = "$"
                                    + itemTotal.toFixed(2);
                            break;

                        case "SawMovie":
                            itemTotal = itemQuantity * 7.99;
                            newCell[cellPointer].innerHTML = "$"
                                    + itemTotal.toFixed(2);
                            break;

                        case "Orphanage":
                            itemTotal = itemQuantity * 11.99;
                            newCell[cellPointer].innerHTML = "$"
                                    + itemTotal.toFixed(2);
                            break;

                        default:
                            window.alert("Error: Undefined Item Name ("
                                    + itemName + ")");
                            /**
                             * If the item isn't defined in the function, throw
                             * an error showing the undefined item so that the
                             * webmaster can FIX IT!
                             */
                            break;
                    }
                    break;

                default:
                    window.alert("Logic Error: cellPointer = " + cellPointer);
                    /**
                     * If you see this, a major logic bomb has exploded. Welcome
                     * to the afterlife. (Cell pointer is out of bounds)
                     */
                    break;
            }
            grandTotal = grandTotal + itemTotal; // Add to the grand total
            cellPointer += 1;
        }
        arrayPointer += 1;
    }
    newRow = document.getElementById('totals').insertRow(arrayPointer);
    /**
     * Create the new row to show the grand total.
     */

    cellPointer = 0;
    /**
     * Since we don't need the original count variable for anything, we'll reuse
     * it to create the next four new cells in the bottom row of the table.
     * Saves from making a new variable declaration.
     */

    while (cellPointer < 4) { // Create five new cells
        newCell[cellPointer] = newRow.insertCell(cellPointer); // Create the
        // new cell
        cellPointer += 1; // increment count
    }
    newCell[3].innerHTML = "Grand Total: $" + grandTotal.toFixed(2); // show
    // grand
    // total
    // in
    // the
    // last
    // cell
    // (farthest
    // right)
    newCell[3].id = "granTot"; // mark the cell with an ID so we can format the
    // text
    document.getElementById('granTot').style.color = "red"; // Change the grand
    // total text color
    // to red
    newRow = document.getElementById('totals').insertRow(arrayPointer); // Create
    // the
    // new
    // row
    // for
    // the
    // action
    // buttons
    newCell[0] = newRow.insertCell(0); // Create the first new cell
    newCell[0].innerHTML = "<button type=\"button\" onclick=\"window.history.back()\"> <<< Return to Shopping </button>"; // Create
    // the
    // first
    // button
    newCell[1] = newRow.insertCell(1); // Create the second new cell
    newCell[1].innerHTML = "<button type=\"button\" onclick=\"confirmation()\">CheckOut</button>"; // Create
    // the
    // second
    // button
    // Note to self: a backslash (\) is needed before every literal quotation
    // mark that is needed in a string of text. See above for examples.
}
function confirmation() {
    "use strict";
    location.assign("ConfirmOrder.html"); // Once the checkout button is
    // clicked, got to the next page
}
function isNumber(inputValue) {
    "use strict";
    var checkNumber = isNaN(inputValue);
    if (checkNumber === true) {
        window.alert("Please enter a number in the field!");
        return false;
    }
}
function checkSubmission() {
    "use strict";
    if ((document.forms[0].CName.value !== "")
            && (document.forms[0].Address.value !== "")
            && (document.forms[0].City.value !== "")
            && (document.forms[0].ZIP.value !== "")) {
        var cookieTemp = decodeURI(document.cookie);
        document.getElementById("RawPurchaseData").value = cookieTemp;
        location.assign("OrderComplete.html");
        return true;
    }
    if ((document.forms[0].CName.value === "")
            || (document.forms[0].Address.value === "")
            || (document.forms[0].City.value === "")
            || (document.forms[0].ZIP.value === "")) {
        window.alert("You must enter your name and your full mailing address!");
        return false;
    }
}
function goback() {
    "use strict";
    window.history.back();
}
function resetCustomer() {
    "use strict";
    var cookieTemp = decodeURI(document.cookie), // decode cookie and place
    // data in cookieTemp
    cookieData = cookieTemp.split("; "), // Separate out the data
    arrayLength = 0, // initialize array counter
    expireDate = new Date(), // Create a date object
    equalLocation = 0, // Initialize the variable holding the location of the
    // "=" in the cookie
    itemName = null, // Initialize the variable holding the first part of
    // each cookie (item name)
    itemQuantity = 0, // Initialize the count of the individual item
    arrayPointer = 0; // Initialize the list pointer past to the beginning of
    // the array

    expireDate.setDate(expireDate.getDay() - 20); // Set the date to yesterday
    // so that the cookie
    // expires today
    while (cookieData[arrayLength] !== undefined) {
        arrayLength += 1; // increase counter for every filled element
    }
    arrayLength -= 1; // decrement by one for last element (which was
    // undefined)

    // Begin search for items that need to be deleted

    while (arrayPointer < arrayLength + 1) { // Cycle through the list of
        // items in the cookie, looking
        // for what needs to be deleted
        equalLocation = cookieData[arrayPointer].indexOf("="); // Find the
        // equal
        // sign in
        // the
        // string
        itemName = cookieData[arrayPointer].substring(0, equalLocation); // The
        // item
        // name
        // is
        // everything
        // before
        // the
        // equal
        // sign
        document.cookie = encodeURI(itemName + "=" + itemQuantity + ";")
                + "expires=" + expireDate.toUTCString(); // Expire
        // the
        // cookie
        arrayPointer += 1; // increment list pointer
    }
    parent.document.getElementById("ItemNum").innerHTML = "You have 0 items in your cart.";
    document.cookie = encodeURI("CustItemCount=" + parseInt("0", 10));
    location.assign("start.html");
}
