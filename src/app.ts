// Import the Server class from the "./presentation/server" module
import { Server } from "./presentation/server";

// Asynchronous IIFE (Immediately Invoked Function Expression)
// This IIFE is used to invoke the 'main' function asynchronously
(async () => {
    // Call the 'main' function
    main();
})();

// Function 'main' is defined to start the server
function main() {
    // Call the 'start' method on the Server class to initiate the server
    Server.start();
}
