// Import the 'EmailService' class from the specified file
import { EmailService } from '../../../presentation/email/email.service';
// Import the 'LogEntity' and 'LogSeverityLevel' from the entities module
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
// Import the 'LogRepository' from the repository module
import { LogRepository } from '../../repository/log.repository';

// Define an interface 'SendLogEmailUseCase' with a single method 'execute'
interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}

// Define a class 'SendEmailLogs' that implements the 'SendLogEmailUseCase' interface
export class SendEmailLogs implements SendLogEmailUseCase {

    // Constructor that takes instances of 'EmailService' and 'LogRepository' as dependencies
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ) {}

    // Implement the 'execute' method from the interface
    async execute(to: string | string[]) {

        try {
            // Attempt to send an email with system logs using the 'sendEmailWithFileSystemLogs' method
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            // If the email was not sent successfully, throw an error
            if (!sent) throw new Error('Email was not sent');

            // Create a log entity for a successful log email sending operation
            const log = new LogEntity({
                message: `Log email sent`,
                level: LogSeverityLevel.low,
                origin: 'send-email-logs.ts',
            });
            // Save the log entity using the 'saveLog' method of the 'LogRepository'
            this.logRepository.saveLog(log);

            // Return true to indicate success
            return true;
        } 
        
        // Catch any errors that occur during the try block
        catch (error) {
            // Create a log entity for a failed log email sending operation
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-email-logs.ts',
            });
            // Save the log entity using the 'saveLog' method of the 'LogRepository'
            this.logRepository.saveLog(log);

            // Return false to indicate failure
            return false;
        }
    }
}
