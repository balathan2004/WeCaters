const nodemailer = require("nodemailer");


interface userReport {
    report: string
}

type mailTypes=userReport

export default async function sendMailToAdmin({report}:mailTypes) {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "imnoa007offical@gmail.com",
      pass: "eozxugqggchxvgqf ",
    },
  });

  const mailOptions = {
    from: "imnoa007offical@gmail.com",
    to: "balathan2vijay004@gmail.com",
    subject: "User Problem Report",
    text: `${report}`,
  };

  transport.sendMail(mailOptions, (err:any) => {
    console.log(err);
  });
}
