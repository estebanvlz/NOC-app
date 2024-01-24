// Define an interface CheckServiceUseCase with a single method execute

import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

// The method takes a URL as a string parameter and returns a Promise<boolean>
interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

// Define types for success and error callbacks
type SuccesCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

// Export a class CheckService that implements the CheckServiceUseCase interface
export class CheckService implements CheckServiceUseCase {

    // Constructor takes success and error callback functions as parameters
    constructor(
        private readonly logRepository: LogRepository,
        private readonly succesCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback,
    ) {}


    // Implement the execute method from the interface
    public async execute(url: string): Promise<boolean> {

        try {
            // Attempt to fetch the provided URL
            const req = await fetch(url);

            // If the response is not OK (status code other than 200-299), throw an error
            if (!req.ok) throw new Error(`Error on check service ${url}`);

            const log = new LogEntity( `Service ${ url } is working`, LogSeverityLevel.low);
            
            this.logRepository.saveLog( log );

            // Call the success callback
            this.succesCallback && this.succesCallback();


            // Log a message indicating that the service at the provided URL is up
            // console.log(`${url} service is up`);

            // Return true, indicating that the service is up
            return true;
        }

        // Catch any errors that occur during the try block
        catch (error) {
            const errorMessage = `${url} is not ok ${ error }`;
            // Log the error message
            const log = new LogEntity( errorMessage , LogSeverityLevel.high);
            
            // Call the error callback with the error message
            this.logRepository.saveLog( log )
            this.errorCallback && this.errorCallback(`${errorMessage}`);

            // Return false, indicating that the service is not up due to the error
            return false;
        }
    }
}

