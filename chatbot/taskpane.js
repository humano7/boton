/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */

document.addEventListener("DOMContentLoaded", function() {
  Office.onReady((info) => {
      if (info.host === Office.HostType.Outlook) {
          document.getElementById("get-email-info").onclick = getEmailInfo;
      }
  });
});

async function getEmailInfo() {
  try {
      const item = Office.context.mailbox.item;
      const subject = item.subject;
      const from = item.from.emailAddress;
      const to = item.to.map(recipient => recipient.emailAddress).join(", ");
      const cc = item.cc.map(recipient => recipient.emailAddress).join(", ");
      const body = await getBody(item);

      let attachments = "";
      if (item.attachments.length > 0) {
          attachments = item.attachments.map(att => att.name).join(", ");
      }

      document.getElementById("email-info").innerHTML = `
          <p><strong>De:</strong> ${from}</p>
          <p><strong>Para:</strong> ${to}</p>
          <p><strong>CC:</strong> ${cc}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <p><strong>Cuerpo:</strong> ${body.value}</p>
          <p><strong>Archivos adjuntos:</strong> ${attachments}</p>
      `;
  } catch (error) {
      console.error(error);
      document.getElementById("email-info").innerHTML = error;
  }
}

function getBody(item) {
  return new Promise((resolve, reject) => {
      item.body.getAsync(Office.CoercionType.Text, (result) => {
          if (result.status === Office.AsyncResultStatus.Succeeded) {
              resolve(result.value);
          } else {
              reject(result.error.message);
          }
      });
  });
}
//export async function run() {
  // Get a reference to the current message
//const item = Office.context.mailbox.item;

// Write message property value to the task pane
//document.getElementById("item-subject").innerHTML = "<b>Subject:</b> <br/>" + item.subject;
//}
