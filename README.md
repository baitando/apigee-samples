# Apigee Error Handling

This repository contains a sample API proxy and a shared flow, which demonstrate how proper and consistent error responses can be achieved when Apigee is used as API gateway.

## Prerequisites

To try it out, the following requirements need to be fulfilled.

* The sample can be deployed even on an Apigee trial account. There is a [sign up form][apigee-signup] available to get such a trial account within minutes.
* Node.js and npm need to be present on the machine used to deploy the sample to Apigee.
If this is not already available, it can be installed e.g. following [this installation guide][npm-node-installation].

## Preparation

To deploy the sample it needs to be cloned to modify some settings related to the Apigee environment to use.

* Copy the `.env.example` file to `.env`.
The copied file must not be committed since it will contain credentials.
* Set proper values for the keys specified there.

To install the necessary dependencies for the deployment, the command below needs to be executed.

```bash
npm install
```

## Deployment

Once these preparation steps are finished, the deployment can be triggered with the command below.

```bash
npm run deploy
```

The deployment process is based on the [apigeetool npm package][apigee-apigeetool-npm].
Necessary deployment steps are implemented in the file `scripts/deploy.ts`.

## Sample Client Scripts

Besides the API proxy code, the repository contains files which can be used to call the provided API using the [built-in HTTP client of Intellij Idea][intellij-restclient].

* The `calls/rest-client.rest` file defines the calls.
* The calls use some variables which are specific for the Apigee environment.
To specify proper values, the file `calls/rest-client.env.json.example` needs to be copied to `calls/rest-client.env.json`.
In the copied file it is necessary to fill in the desired values.

[intellij-restclient]: https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html
[apigee-apigeetool-npm]: https://www.npmjs.com/package/apigeetool

