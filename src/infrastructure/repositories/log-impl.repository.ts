// Import necessary modules and classes
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogDataSource } from '../../domain/datasources/log.datasource';

// Define a class LogRepositoryImplementation that implements the LogRepository interface
export class LogRepositoryImplementation implements LogRepository {

    // Constructor takes a LogDataSource as a parameter
    constructor(
        private readonly logDataSource: LogDataSource,
    ) {};

    // Asynchronously save a log entry to the data source
    async saveLog(log: LogEntity): Promise<void> {
        // Call the saveLog method on the injected LogDataSource
        this.logDataSource.saveLog(log);
    }
    
    // Asynchronously retrieve log entries based on severity level from the data source
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        // Call the getLogs method on the injected LogDataSource
        return this.logDataSource.getLogs(severityLevel);
    }
}
