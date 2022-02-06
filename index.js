'use strict';

const setDone = require("./intents/SetDone.js");
const setInProgress = require("./intents/SetInProgress.js");
const assignToMe = require("./intents/AssignToMe.js");

exports.handler = async (event, context, callback) => {

    console.log(`request received for userId=${event.userId}, intentName=${event.currentIntent.name}`);

    const intentName = event.currentIntent.name;
    const sessionAttributes = event.sessionAttributes;
    const slots = event.currentIntent.slots;
    
    console.log(slots);

    let message = "";

    switch(intentName) {
        case 'SetDone':
            message = await setDone(slots.user_story);
            break;
        case 'SetInProgress':
            message = await setInProgress(slots.user_story);
            break;
        case 'AssignToMe':
            message = await assignToMe(slots.user_story);
            break;
        default:
            console.log(`Intent name ${intentName} not registered!`);
    }
    
    callback(
        null,
        close(
            sessionAttributes, 
            'Fulfilled',
            {
                'contentType': 'PlainText', 
                'content': message
            }
        )
    );
    
};

// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled
const close = (sessionAttributes, fulfillmentState, message) => {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        }
    };
};