import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailsService {
  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {}

  async getAuthHeaders() {
    const user: User = (await this.afAuth.user
      .pipe(first())
      .toPromise()) as User;
    const token: string = await user.getIdToken();

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  async newAgentEmail() {
    const url = 'https://us-central1-assembl-ez.cloudfunctions.net/email';
    const body = {
      from: 'Assemble-EZ Notifications <e-questrianonline@outlook.com>',
      to: 'rubenf85@gmail.com',
      subject: 'You have been added to Assemble-EZ',
      html:
        `
          <!DOCTYPE html>
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
                                          <td style="width: 66.785%; text-align: center;">R` +
        'payment.amount' +
        `.00</td>
                                      </tr>
                                      <tr>
                                          <td style="width: 32.938%; text-align: center;">Date</td>
                                          <td style="width: 66.785%; text-align: center;">` +
        'payment.date' +
        `</td>
                                      </tr>
                                      <tr>
                                          <td style="width: 32.938%; text-align: center;">Time</td>
                                          <td style="width: 66.785%; text-align: center;">` +
        ' Date.now()' +
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
    };
    const options = { headers: await this.getAuthHeaders() };
    this.http.post(url, body, options).subscribe((res) => {
      console.log(res);
    });
  }
}
