// Import the 'LogModel' from the MongoDB data layer
import { LogModel } from "../../data/mongo";

// Import necessary classes and types for the DataSource
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

// Define a class 'MongoDataSoure' implementing the 'LogDataSource' interface
export class MongoLogDataSoure implements LogDataSource {

    // Asynchronously save a log entry to the MongoDB using LogModel.create
    async saveLog(log: LogEntity): Promise<void> {
        
        // Create a new log document in MongoDB using the 'LogModel.create' method
        const newLog = await LogModel.create(log);

        // Log the ID of the newly created log document
        console.log('Mongo Log created: ', newLog.id);
    }

    // Asynchronously retrieve log entries from MongoDB based on severity level
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        // Use 'LogModel.find' to find all log documents with the specified severity level
        const logs = await LogModel.find({
            level: severityLevel,
        });

        // Map the MongoDB log documents to domain LogEntity objects using 'LogEntity.fromObject'
        return logs.map(mongoLog => LogEntity.fromObject(mongoLog));
    }
}
