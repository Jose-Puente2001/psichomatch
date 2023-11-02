const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "ccrewdb@gmail.com",
    pass: "cxhjzthsferhkgtx"
  }
})

// async..await is not allowed in global scope, must use a wrapper
const main = async (
  patientEmail,password
) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"The PsichoMATCH 👨 " <ccrewdb@gmail.com>',
      to: `${patientEmail}`,
      subject: `Encuentra apoyo`,
      text: `Saludos usuario`,
      html: `
    <html>
      <body>
        <p>Hola,</p>
        <p>Porfavor guarda tu Info de logeo</p>
        <p>PASSWORD:${password}</p>
      </body>
    </html>
    `
    })
  } catch (error) {
    console.log(error)
  }
}

const mainRecovery = async (
  patientEmail,link,id
) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"The PsichoMATCH 👨 " <ccrewdb@gmail.com>',
      to: `${patientEmail}`,
      subject: `The Biggest center Of Therapys`,
      text: `Hi User`,
      html: `
    <html>
      <body>
        <p>Hi,</p>
        <p>Please save you Password</p>
        <p>Clic in the link to change the password:${link}/${id}</p>
      </body>
    </html>
    `
    })
  } catch (error) {
    console.log(error)
  }
}

const mainRecovery2 = async (
  patientEmail,password
) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"The PsichoMATCH 👨 " <ccrewdb@gmail.com>',
      to: `${patientEmail}`,
      subject: `The Biggest center Of Therapys`,
      text: `Hi User`,
      html: `
    <html>
      <body>
        <p>Hi,</p>
        <p>Please save you Password</p>
        <p>Clic in the link to change the password:${password}</p>
      </body>
    </html>
    `
    })
  } catch (error) {
    console.log(error)
  }
}

const addReservationPatient = async (
  SelectedHour,availability,patientEmail,patientName,therapistEmail,therapistName
) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"The PsichoMATCH 👨 " <ccrewdb@gmail.com>',
      to: `${patientEmail}`,
      subject: `Payment Advise`,
      text: `Hi Dear ${patientName}`,
      html: `
      <html>
      <body>
        <p>Hi,</p>
        <p>Please send your bill to your therapist, ${therapistName}, at their email, ${therapistEmail}.</p>
        <p>They will be in touch as soon as possible.</p>
        
        <p>Date:${availability.date}</p>
        <p>Hour:${SelectedHour.hour}</p>
        <p>Therapyst:${therapistName}</p>
        
      </body>
    </html>
    `
    })
  } catch (error) {
    console.log(error)
  }
}

const addReservationTerapist = async (
  SelectedHour,availability,patientEmail,patientName,therapistEmail,therapistName
) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"The PsichoMATCH 👨 " <ccrewdb@gmail.com>',
      to: `${therapistEmail}`,
      subject: `The Biggest center Of Therapys`,
      text: `Hi ${therapistName}`,
      html: `
      <html>
      <body>
        <p>Hi,</p>
        <p>We are pleased to confirm that your patient, ${patientName},</p>
        <p>has reserved a slot. They will send their payment invoice from their email, ${patientEmail}.</p>
        <p>Date:${availability.date}</p>
        <p>Hour:${SelectedHour.hour}</p>
        <p>Patient:${patientName}</p>
      </body>
    </html>
    `
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  main,
  mainRecovery,
  mainRecovery2,
  addReservationTerapist,
  addReservationPatient
};