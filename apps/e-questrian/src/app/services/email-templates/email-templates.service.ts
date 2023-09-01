import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailTemplatesService {
  get paymentReceiptTemplate(): string[] {
    return [
      `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
    </head>
    
    <body style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">
        <table style="width: 100%; background-color: rgb(100, 235, 245); border-collapse: collapse; border: solid rgb(100, 235, 245);">
            <tbody>
                <tr>
                    <td style="width: 100%; border: solid rgb(100, 235, 245);">
                        <div style="text-align: center;"><span style="font-size: 36px; font-family: Tahoma, Geneva, sans-serif;">Thank you for your payment</span></div>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100%; border: solid rgb(100, 235, 245); background-color: rgb(255, 255, 255);"><br><br>
                        <table style="width: 63%; margin-right: calc(17%); margin-left: calc(20%);">
                            <tbody>
                                <tr>
                                    <td colspan="2" style="width: 100%; text-align: center;"><br><span style="font-size: 20px; font-family: Tahoma, Geneva, sans-serif;"><strong>Payment details</strong></span><br><br></td>
                                </tr>
                                <tr>
                                    <td style="width: 32.938%; text-align: center;">Received by</td>
                                    <td style="width: 66.785%; text-align: center;">Ruben Ferreira</td>
                                </tr>
                                <tr>
                                    <td style="width: 32.938%; text-align: center;">Amount</td>
                                    <td style="width: 66.785%; text-align: center;">R`,
      `.00</td>
                                </tr>
                                <tr>
                                    <td style="width: 32.938%; text-align: center;">Date</td>
                                    <td style="width: 66.785%; text-align: center;">`,
      `</td>
                                </tr>
                                <tr>
                                    <td style="width: 32.938%; text-align: center;">Time</td>
                                    <td style="width: 66.785%; text-align: center;">`,
      `</td>
                                </tr>
                                <tr>
                                    <td style="width: 32.938%; text-align: center;">Payment method</td>
                                    <td style="width: 66.785%; text-align: center;">Cash</td>
                                </tr>
                            </tbody>
                        </table><br>
                    </td>
                </tr>
            </tbody>
        </table>
        <p><br></p>
    </body>
    
    </html>
`,
    ];
  }
  constructor() {}
}
