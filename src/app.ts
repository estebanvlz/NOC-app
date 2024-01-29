// Import the Server class from the "./presentation/server" module
import { LogModel, MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugins";
import { PrismaClient } from "@prisma/client";

// Asynchronous IIFE (Immediately Invoked Function Expression)
// This IIFE is used to invoke the 'main' function asynchronously
(async () => {
    // Call the 'main' function
    main();

})();

// Function 'main' is defined to start the server
async function main() {

    // await MongoDataBase.connect({

    //     mongoUrl: envs.MONGO_URL,
        
    //     dbName: envs.MONGO_DB_NAME,

    // });

    // const prisma = new PrismaClient();

    // const newLog = await prisma.logModel.create({  
    //     data: {
    //         level: 'LOW',
    //         message: 'Test message',
    //         origin: 'app.ts'
    //     }
    // });
    
    // const log = prisma.logModel.findMany();

    // Call the 'start' method on the Server class to initiate the server
    Server.start();
}
