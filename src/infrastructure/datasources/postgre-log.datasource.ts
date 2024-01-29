// Import the PrismaClient and SeverityLevel from the Prisma client library
import { PrismaClient, SeverityLevel } from '@prisma/client';
// Import the LogDataSource interface and LogEntity from the domain layer
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

// Create an instance of the PrismaClient for database interactions
const prismaClient = new PrismaClient();

// Define a mapping between application severity levels and Prisma SeverityLevels
const severityEnum: Record<string, SeverityLevel> = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
}

// Define a class 'PostgresLogDatasource' implementing the LogDataSource interface
export class PostgresLogDatasource implements LogDataSource {

  // Asynchronously save a log entry to the PostgreSQL database using PrismaClient
  async saveLog(log: LogEntity): Promise<void> {
    
    // Map the application severity level to Prisma SeverityLevel
    const level = severityEnum[log.level];

    // Create a new log record in the PostgreSQL database using PrismaClient
    const newLog = await prismaClient.logModel.create({
      data: {
        ...log,
        level: level,
      }
    });

    // Uncomment the following line if you want to log a message after saving
    // console.log('Postgres saved');
  }

  // Asynchronously retrieve log entries from the PostgreSQL database based on severity level
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    
    // Map the application severity level to Prisma SeverityLevel
    const level = severityEnum[severityLevel];

    // Retrieve log records from the PostgreSQL database using PrismaClient
    const dbLogs = await prismaClient.logModel.findMany({
      where: { level }
    });

    // Map the retrieved database logs to domain LogEntity objects using 'LogEntity.fromObject'
    return dbLogs.map(LogEntity.fromObject);
  }
}
