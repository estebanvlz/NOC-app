// Define an interface CheckServiceUseCase with a single method execute
// The method takes a URL as a string parameter and returns a Promise<boolean>
interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}


type SuccesCallback = () => void;
type ErrorCallback = ( error: string ) => void;



// Export a class CheckService that implements the CheckServiceUseCase interface
export class CheckService implements CheckServiceUseCase {

    constructor (

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

            this.succesCallback();

            // Log a message indicating that the service at the provided URL is up
            //console.log(`${url} service is up`);

            // Return true, indicating that the service is up
            return true;
        }

        // Catch any errors that occur during the try block
        catch (error) {

            // Log the error message
            console.log(`${error}`);

            this.errorCallback( `${ error }`);

            // Return false, indicating that the service is not up due to the error
            return false;
        }
    }
}
