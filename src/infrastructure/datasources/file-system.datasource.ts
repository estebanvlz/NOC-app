// Import necessary modules and classes
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs';

// Define a class FileSystemDatasource that implements the LogDataSource interface
export default class FileSystemDatasource implements LogDataSource {

    // Define paths for log files
    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    // Constructor that initializes log files when an instance is created
    constructor() {
        // Call the method to create log files and directories
        this.createLogFiles();
    }

    // Private method to create log files and directories if they don't exist
    private createLogFiles = () => {
        // Check if the main log directory exists, if not, create it
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        // Iterate through log paths and create files if they don't exist
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach(path => {
            // Check if the file already exists, if not, create it with an empty content
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, '');
            }
        });
    }

    // Method to save a log entry
    async saveLog(newLog: LogEntity): Promise<void> {

        // Convert the LogEntity to JSON format with a newline character
        const logAsJson = `${JSON.stringify(newLog)}\n`;

        // Append the log to the 'logs-all.log' file
        fs.appendFileSync(this.allLogsPath, logAsJson);

        // Check the severity level of the log entry
        // If the severity level is 'low', return early as 'high' logs don't need to be written
        if (newLog.level === LogSeverityLevel.low) return;

        // If the severity level is 'medium', append the log to the 'logs-medium.log' file
        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        } else {
            // If the severity level is 'high', append the log to the 'logs-high.log' file
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }
    }

    // Private method to read log entries from a file
    private getLogsFromFile = (path: string): LogEntity[] => {
        // Read the content of the file
        const content = fs.readFileSync(path, 'utf-8');
        
        // Split the content into an array of strings (each string represents a log entry)
        const stringLogs = content.split('\n').map(log => LogEntity.fromJson(log));

        // Return the array of LogEntity instances
        return stringLogs;
    }

    // Method to retrieve log entries based on severity level (implementation not provided)
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        // Throw an error since this method is not implemented in this class
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);

            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }
}
