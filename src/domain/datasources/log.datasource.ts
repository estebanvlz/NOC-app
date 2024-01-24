// Import the LogEntity class and LogSeverityLevel enum from the specified file
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

// Define an abstract class LogDataSource
export abstract class LogDataSource {

    // Abstract method for saving a log entry
    abstract saveLog(log: LogEntity): Promise<void>;

    // Abstract method for retrieving log entries based on severity level
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;

}
