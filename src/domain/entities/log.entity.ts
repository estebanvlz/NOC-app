// Define an enumeration (enum) LogSeverityLevel to represent different levels of log severity
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

// Define a class LogEntity to represent a log entry
export class LogEntity {

    // Public properties to store log information
    public level: string;
    public message: string;
    public createdAt: Date;

    // Constructor for creating a new LogEntity instance
    constructor(message: string, level: LogSeverityLevel) {
        // Set the message property with the provided message
        this.message = message;
        // Set the log severity level with the provided level (enum value)
        this.level = level;
        // Set the createdAt property with the current date and time
        this.createdAt = new Date();
    }

    // Static method to create a LogEntity instance from a JSON string
    static fromJson = (json: string): LogEntity => {

        // Parse the JSON string to extract message, level, and createdAt properties
        const { message, level, createdAt } = JSON.parse(json);

        // Check if the required properties are present, otherwise throw an error
        if (!message) throw new Error('Error: Missing message property');
        if (!level) throw new Error('Error: Missing level property');
        if (!createdAt) throw new Error('Error: Missing createdAt property');

        // Create a new LogEntity instance with the extracted properties
        const log = new LogEntity(message, level);

        // Set the createdAt property with the parsed Date object
        log.createdAt = new Date(createdAt);

        // Return the created LogEntity instance
        return log;
    }
}
