// Import the CheckService class from the specified file
import { LogRepositoryImplementation } from "../infrastructure/repositories/log-impl.repository";
// Import the CronService class from the specified file
import FileSystemDatasource from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from './email/email.service';
import { SendEmailLogs } from "../domain/use-cases/emails/send-email-logs";


const fileSystemLogRepository = new LogRepositoryImplementation( new FileSystemDatasource() );
const emailService = new EmailService();
// Define a class Server
export class Server {

    // Define a static method start for starting the server
    public static start() {

        // Log a message indicating that the 9server has started
        console.log('Server started...');
    }

}
