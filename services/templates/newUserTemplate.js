export default (CLIENT, firstName, lastName) => `<h2 style="margin-bottom: 30px; color: #025f6d;text-align: center;">
    Welcome to the Ice Team, ${firstName} ${lastName}!
  </h2>
  <p style="font-size: 16px; margin-bottom: 30px; color: #000000;">
    Your account is active and ready to go! If you haven't already signed in to your account, click the button below.
  </p>
  <p style="font-size: 16px; margin-bottom: 30px; color: #000000;">
    Thank you,
    <br />
    <span style="font-style: italic;">The San Jose Sharks Ice Team</span>
  </p>
  <div style="margin-bottom: 20px; text-align: center;">
    <a style="font-size: 18px; text-decoration: none; line-height: 40px; width: 200px; color: #FFFFFF; background-color: #025f6d; display: inline-block;" href="${CLIENT}/employee/login" target="_blank" rel="noopener noreferrer">Employee Login</a>
  </div>
  <div style="color:#999999;font-size:11px;text-align:center;margin-top: 10px;">
    Or click on this link:
    <a style="color: #999999; text-decoration: underline; margin-left: 2px;" href="${CLIENT}/employee/login" target="_blank" rel="noopener noreferrer">${CLIENT}/employee/login</a>
  </div>`;
