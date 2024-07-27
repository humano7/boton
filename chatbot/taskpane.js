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
      console.log(Office.context.mailbox.item.body.getAsync(
        "text",
        { asyncContext: "This is passed to the callback" },
        function callback(result) {
            // Do something with the result.
        }));
      const subject = item.subject;
      const from = item.from.emailAddress;
      const to = item.to.map(recipient => recipient.emailAddress).join(", ");
      const cc = item.cc.map(recipient => recipient.emailAddress).join(", ");
      
      const bodyText = await getBody(item, Office.CoercionType.Text);
      const bodyHtml = await getBody(item, Office.CoercionType.Html);
      let body = bodyText || bodyHtml || "No se pudo obtener el cuerpo del correo";

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

function getBody(item, coercionType) {
  return new Promise((resolve, reject) => {
      item.body.getAsync(coercionType, (result) => {
          if (result.status === Office.AsyncResultStatus.Succeeded) {
              resolve(result.value);
          } else {
              console.error(`Error obteniendo el cuerpo del correo (${coercionType}):`, result.error.message);
              resolve(null); // Resolver con null para intentar el siguiente formato
          }
      });
  });
}