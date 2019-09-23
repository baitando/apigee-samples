#!/usr/bin/env node
import {config} from "dotenv";

config();

const apigeetool = require('apigeetool');
const sdk = apigeetool.getPromiseSDK();

const commonOpts = {
    organization: process.env.ORGANIZATION as string,
    username: process.env.USERNAME as string,
    password: process.env.PASSWORD as string,
    environments: process.env.ENVIRONMENT as string
};

const productOpts = {
    ...commonOpts,
    productName: 'apigee-errorhandling',
    productDesc: '',
    proxies: 'apigee-errorhandling'
};

const developerOpts = {
    ...commonOpts,
    email: process.env.DEVELOPER_EMAIL as string,
    firstName: process.env.DEVELOPER_FIRST_NAME as string,
    lastName: process.env.DEVELOPER_LAST_NAME as string,
    userName: this.email
};


const appOpts = {
    ...commonOpts,
    name: 'apigee-errorhandling',
    apiproducts: productOpts.productName,
    email: developerOpts.email
};

init().then((success) => console.log("Deployment was successful: " + success));

async function init(): Promise<boolean> {
    let success: boolean = await deleteProduct();
    console.log("**********")
    if (success) {
        success = await createProduct();
    }
    console.log("**********")
    if (success) {
        success = await deleteDeveloper();
    }
    console.log("**********")
    if (success) {
        success = await createDeveloper();
    }
    console.log("**********")
    // App seems to be automatically deleted when the developer is deleted. So no explicit app deletion necessary.
    if(success) {
        success = await createApp();
    }
    return success;
}

async function deleteProduct(): Promise<boolean> {
    try {
        console.log("Starting deletion of product");
        await sdk.deleteProduct(productOpts);
        console.log("Deletion of product suceeded");
        return true;
    } catch (err) {
        console.log("Deletion of product failed: " + err);
        return false;
    }
}

async function createProduct(): Promise<boolean> {
    try {
        console.log("Starting creation of product");
        await sdk.createProduct(productOpts);
        console.log("Creation of product suceeded");
        return true;
    } catch (err) {
        console.log("Creation of product failed: " + err);
        return false;
    }
}

async function createDeveloper(): Promise<boolean> {
    try {
        // Seems to be a bug. If we don't do that, we get the following error:
        // "Following elements are required: Email, User Name, First Name, Last Name"
        // I assume that this is related to the two properties which are case-sensitive (userName and username).
        // The username is in general necessary to use the apigeetool.
        // The userName is necessary for the developer.
        developerOpts.userName = developerOpts.email;
        console.log("Starting creation of developer");
        await sdk.createDeveloper(developerOpts);
        console.log("Creation of developer suceeded");
        return true;
    } catch (err) {
        console.log("Creation of developer failed: " + err);
        return false;
    }
}

async function deleteDeveloper(): Promise<boolean> {
    try {
        // Seems to be a bug. If we don't do that, we get the following error:
        // "Following elements are required: Email, User Name, First Name, Last Name"
        // I assume that this is related to the two properties which are case-sensitive (userName and username).
        // The username is in general necessary to use the apigeetool.
        // The userName is necessary for the developer.
        developerOpts.userName = developerOpts.email;
        console.log("Starting deletion of developer");
        await sdk.deleteDeveloper(developerOpts);
        console.log("Deletion of developer suceeded");
        return true;
    } catch (err) {
        console.log("Deletion of developer failed: " + err);
        return false;
    }
}


async function createApp(): Promise<boolean> {
    try {
        console.log("Starting creation of app");
        await sdk.createApp(appOpts);
        console.log("Creation of app suceeded");
        return true;
    } catch (err) {
        console.log("Creation of app failed: " + err);
        return false;
    }
}