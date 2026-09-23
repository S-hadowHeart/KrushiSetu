const nodemailer = require('nodemailer');

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    throw new Error('SMTP_HOST, SMTP_USER, and SMTP_PASS (or SMTP_PASSWORD) are required');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

function getSenderAddress() {
  return process.env.SMTP_FROM || process.env.SMTP_USER;
}

function getFrontendUrl(path) {
  const frontendUrl = process.env.FRONTEND_URL || process.env.APP_URL;
  return `${frontendUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

async function sendVerificationEmail(to, token) {
  const transport = createTransport();
  const url = `${getFrontendUrl('auth/verify')}?token=${encodeURIComponent(token)}`;
  const info = await transport.sendMail({
    from: getSenderAddress(),
    to,
    subject: 'KrushiSetu — Verify your email',
    text: `Please verify your account by visiting: ${url}`,
    html: `<p>Please verify your account by clicking <a href="${url}">here</a></p>`,
  });
  return info;
}

async function sendResetEmail(to, token) {
  const transport = createTransport();
  const url = `${getFrontendUrl('auth/reset-password')}#token=${encodeURIComponent(token)}`;
  const info = await transport.sendMail({
    from: getSenderAddress(),
    to,
    subject: 'KrushiSetu — Reset your password',
    text: `Reset your password: ${url}`,
    html: `<p>Reset your password by clicking <a href="${url}">here</a></p>`,
  });
  return info;
}

module.exports = {
  sendVerificationEmail,
  sendResetEmail,
};
