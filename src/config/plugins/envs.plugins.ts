// Import the 'dotenv/config' module to load environment variables from a '.env' file
import 'dotenv/config';

// Import the 'env-var' module to manage environment variables easily
import * as env from 'env-var';

// Define an object 'envs' to store and manage environment variables
export const envs = {
  // Retrieve the 'PORT' environment variable, ensure it's present and a valid port number
  PORT: env.get('PORT').required().asPortNumber(),

  // Retrieve the 'MAILER_EMAIL' environment variable, ensure it's present and a valid email string
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),

  // Retrieve the 'MAILER_SECRET_KEY' environment variable, ensure it's present and a string
  MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),

  // Retrieve the 'PROD' environment variable, ensure it's present and a boolean
  PROD: env.get('PROD').required().asBool(),
};
