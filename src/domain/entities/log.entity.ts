// Define an enumeration (enum) LogSeverityLevel to represent different levels of log severity
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

// Define an interface LogEntityOptions to represent the options for creating a LogEntity instance
export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

// Define a class 'LogEntity' to represent a log entry
export class LogEntity {

    // Public properties to store log information
    public level: string;
    public message: string;
    public createdAt?: Date;
    public origin: string;

    // Constructor for creating a new LogEntity instance
    constructor(options: LogEntityOptions) {

        // Destructure the options object to extract message, level, origin, and createdAt (defaulted to current date)
        const { message, level, origin, createdAt = new Date() } = options;

        // Set the message property with the provided message
        this.message = message;
        // Set the log severity level with the provided level (enum value)
        this.level = level;
        // Set the createdAt property with the provided date or the current date and time
        this.createdAt = createdAt;
        // Set the origin property with the provided origin
        this.origin = origin;
    }

    // Static method to create a LogEntity instance from a JSON string
    static fromJson = (json: string): LogEntity => {

        // Parse the JSON string to extract message, level, and createdAt properties
        const { message, level, createdAt, origin } = JSON.parse(json);

        // Check if the required properties are present, otherwise throw an error
        if (!message) throw new Error('Error: Missing message property');
        if (!level) throw new Error('Error: Missing level property');
        if (!createdAt) throw new Error('Error: Missing createdAt property');

        // Create a new LogEntity instance with the extracted properties
        const log = new LogEntity({
            message: message,
            level: level,
            createdAt: createdAt,
            origin: origin,
        });

        // Set the createdAt property with the parsed Date object
        log.createdAt = new Date(createdAt);

        // Return the created LogEntity instance
        return log;
    }

    // Static method to create a LogEntity instance from a plain JavaScript object
    static fromObject = (object: { [key: string]: any }): LogEntity => {

        // Destructure the object to extract message, level, createdAt, and origin properties
        const { message, level, createdAt, origin } = object;

        // Create a new LogEntity instance with the extracted properties
        const log = new LogEntity({
            message, level, createdAt, origin
        });

        // Return the created LogEntity instance
        return log;
    }
}
