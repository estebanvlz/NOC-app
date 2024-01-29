// Import the LogRepositoryImplementation class from the specified file
import { LogRepositoryImplementation } from "../infrastructure/repositories/log-impl.repository";
// Import the FileSystemDatasource class from the specified file
import FileSystemDatasource from '../infrastructure/datasources/file-system.datasource';
// Import the EmailService class from the specified file
import { EmailService } from './email/email.service';
// Import the SendEmailLogs class from the specified file
import { SendEmailLogs } from "../domain/use-cases/emails/send-email-logs";
// Import the CronService class from the specified file
import { CronService } from "./cron/cron-service";
// Import the CheckService class from the specified file
import { CheckService } from "../domain/use-cases/checks/check-service";
// Import the MongoLogDataSoure class from the specified file
import { MongoLogDataSoure } from "../infrastructure/datasources/mongo-log.datasource";
// Import the PostgresLogDatasource class from the specified file
import { PostgresLogDatasource } from "../infrastructure/datasources/postgre-log.datasource";

// Create a LogRepositoryImplementation instance with a chosen datasource (comment out the unused datasources)
const fileSystemLogRepository = new LogRepositoryImplementation(
    // new FileSystemDatasource()
    // new MongoLogDataSoure()
    new PostgresLogDatasource()
);

// Create an EmailService instance
const emailService = new EmailService();

// Define a class 'Server'
export class Server {

    // Define a static method 'start' for starting the server
    public static start() {

        // Create a scheduled job using CronService to run every 5 seconds
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';

                // Create a new CheckService instance with the specified log repository and callbacks
                new CheckService(
                    fileSystemLogRepository, // Log repository for storing check results
                    () => console.log(`${url} is ok`), // Success callback
                    (error) => console.log(error), // Error callback
                ).execute(url); // Execute the check for the provided URL
            });

        // Log a message indicating that the server has started
        console.log('Server started...');
    }
}
