There are two node.js servers - Auth Server & Backend Server and a react frontend.
We first need to run the Auth Server and then the Backend Server in that order.

To run the Auth Server:
1. Open terminal in the project root folder and run the following commands:
  1.1 `cd "Auth Server"` to navigate to the Auth Server files.
  1.2 `npm install` to install the required dependencies.
2. Before we run this server, we first need to setup the config file.
3. Create a file `config.env` and add the following properties:
  `PORT=<YOUR_PORT_NUMBER>
  NODE_ENV=development
  URI_MONGODB_KEY=<MONGO_URI_SECURE_DATABASE>
  URI_MONGODB_DB=<MONGO_URI_GENERIC_DATABASE>
  JWT_SECRET=<KEY_FOR_JWT_SIGNATURE>
  JWT_EXPIRY=<EXPIRY_TIME_IN_MS>
  SERVER_SECRET_KEY=<SECRET_KEY>
  SERVER_SECRET_IV=<SECRET_IV>`
4. We can run this server using the commmand `npm run start`.
5. To monitor any modifications made to the audit table in the database, use `watchChanges.mjs` file.
6. To run this file, add mongo URI belonging to the generic database and execute the command `node --experimental-modules watchChanges.mjs`.

To run the Backend Server,
1. Open a separate terminal in the project root folder and run the following commands:
  1.1 `cd Backend` to navigate to the Backend Server files.
  1.2 `npm install` to install the required dependencies.
2. We can run this server using the commmand `npm run start`.

To run the frontend:
1. Open a separate terminal in the project root folder and run the following commands:
  1.1 `cd Frontend` to navigate to the Frontend files
  1.2 `npm install` to install the required dependencies.
2. After installing all the dependencies navigate to the 'src' (On terminal using `cd src`) and start the frontend using the commmand `npm run dev`.

Secure-EHR Audit System Report: https://docs.google.com/document/d/1T86IoT1zqSqvxpRMhWCVCRti7jhk34_j5gFZKmW4oOI/edit?usp=sharing



