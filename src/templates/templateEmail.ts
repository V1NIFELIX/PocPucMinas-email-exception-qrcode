import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateEmail {
  generateTemplateError(message: string) {
    const template = `<!DOCTYPE html>
    <html>

<head>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <title></title>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <style type="text/css">
      body,
      table,
      td,
      a {
         -webkit-text-size-adjust: 100%;
         -ms-text-size-adjust: 100%;
      }

      table,
      td {
         mso-table-lspace: 0pt;
         mso-table-rspace: 0pt;
      }

      img {
         -ms-interpolation-mode: bicubic;
      }

      img {
         border: 0;
         height: auto;
         line-height: 100%;
         outline: none;
         text-decoration: none;
      }

      table {
         border-collapse: collapse !important;
      }

      body {
         height: 100% !important;
         margin: 0 !important;
         padding: 0 !important;
         width: 100% !important;
      }

      a[x-apple-data-detectors] {
         color: inherit !important;
         text-decoration: none !important;
         font-size: inherit !important;
         font-family: inherit !important;
         font-weight: inherit !important;
         line-height: inherit !important;
      }

      @media screen and (max-width: 480px) {
         .mobile-hide {
            display: none !important;
         }

         .mobile-center {
            text-align: center !important;
         }
      }

      div[style*="margin: 16px 0;"] {
         margin: 0 !important;
      }
   </style>
</head>

<body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
   <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tbody>
         <tr>
            <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
               <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                  <tbody>
                     <tr>
                        <td align="center" valign="top" style="font-size:0;>
                           <div style=" display:inline-block;="" min-width:100px;="" vertical-align:top;"="">
                           <table align="left" border="0" cellpadding="0" cellspacing="0">
                              <tbody>
                                 <tr>
                                    <td align="center"
                                       style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; ">
                                       <img src="https://i.imgur.com/Y14gQCM.png" style="height: px;width:300px;">
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <div
                              style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;"
                              class="mobile-hide"></div>
                        </td>
                     </tr>
                     <tr>
                        <td align="center" style="padding: 16px; background-color: #ffffff;" bgcolor="#ffffff">
                           <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                              style="max-width:600px;">
                              <tbody>
                                 <tr>
                                    <td align="center"
                                       style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; ">
                                    </td>
                                 </tr>
                                 <tr>
                                    <td align="left"
                                       style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                       <p
                                          style="color:#5462d5;font-size: 20px; font-weight: 700; line-height: 24px;text-align: center;">
                                          <b>Nota inelegível</b>
                                       </p>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td align="left" style="padding-top: 20px;">
                                       <p
                                          style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;text-align: center;">
                                       <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                          <tbody>
                                             <tr>
                                                <td width="75%" align="center"
                                                   style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                   ${message} </td>
                                             </tr>
                                          </tbody>
                                       </table>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                                  <tr>
                  <td align="center" style="background-color: #990000;font-family: Open Sans, Helvetica, Arial, sans-serif;">
                    <h2 style="font-size: 14px; font-weight: 800; line-height: 20px;padding: 15px 0; color: #ffffff; margin: 0;"> Siga nossas redes sociais<br>para mais novidades e ofertas!</h2>
                     <table cellpadding="0" cellspacing="0" width="100%">
                       <tbody><tr>
                      <td align="center">
                        <table cellpadding="0" cellspacing="0">
                          <tbody><tr>
                            <td>
                              <a href="https://www.facebook.com/RedeMultiMarket/" target="_blank">
                                <img src="https://i.imgur.com/A65xNUR.png" alt="Facebook" width="50" height="50" style="display: block;" border="1">
                              </a>
                            </td>
                            <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                            <td>
                              <a href="https://www.youtube.com/channel/UCkFXX2ukAMu44c2GyicUMXA" target="_blank">
                                <img src="https://i.imgur.com/tIhW1Ae.png" alt="Youtube" width="50" height="50" style="display: block;" border="1">
                              </a>
                            </td>
                            <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                            <td>
                              <a href="https://twitter.com/Multimarket_RJ" target="_blank">
                                <img src="https://i.imgur.com/3UtnZbJ.png" alt="Twitter" width="50" height="50" style="display: block;" border="1">
                              </a>
                            </td>
                            <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                            <td>
                              <a href="https://www.instagram.com/redemultimarket.oficial/?hl=pt-br" target="_blank">
                                <img src="https://i.imgur.com/hPK880Y.png" alt="Instagram" width="50" height="50" style="display: block;" border="1">
                              </a>
                            </td>
                          </tr>
                        </tbody></table>
                        <br>
                    <br>
                  </td>
                </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </td>
         </tr>
      </tbody>
   </table>
</body>

</html>`;
    return template;
  }
}
