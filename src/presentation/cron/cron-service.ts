// Import the 'CronJob' class from the 'cron' module
import { CronJob } from "cron";

// Define custom types for cron time and onTick function
type CronTime = string | Date;
type OnTick = () => void;

// Define a class CronService to encapsulate functionality related to creating cron jobs
export class CronService {

    // Static method to create a new cron job
    static createJob(cronTime: CronTime, onTick: OnTick): CronJob {

        // Create a new CronJob instance with the provided cronTime and onTick function
        const job = new CronJob(cronTime, onTick);

        // Start the cron job immediately upon creation
        job.start();

        // Return the created cron job instance
        return job;
    }
}
