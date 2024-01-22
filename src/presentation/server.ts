// Import the CheckService class from the specified file
import { CheckService } from "../domain/use-cases/checks/check-service";
// Import the CronService class from the specified file
import { CronService } from "./cron/cron-service";

// Define a class Server
export class Server {

    // Define a static method start for starting the server
    public static start() {

        // Log a message indicating that the server has started
        console.log('Server started...');

        // Create a cron job that runs every 5 seconds
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                // Inside the cron job, create a new instance of CheckService
                new CheckService(
                    // Log a success message if the check is successful
                    () => console.log('Success'),
                    // Log any errors that occur during the check
                    (error) => console.log(error),
                // Execute the check on the specified URL (in this case, 'https://google.com')
                ).execute('https://google.com');
                // Uncomment the line below to check a local URL (http://localhost:3000)
                // new CheckService().execute('http://localhost:3000');
            }
        );

    }

}
