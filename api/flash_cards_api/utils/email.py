import smtplib
from email.mime.multipart import MIMEMultipart

from flash_cards_api.config import (
	SMTP_SERVER,
	SMTP_PORT,
	SMTP_LOGIN,
	SMTP_PASSWORD
)


def send_email(to_email: str, subject: str, template_name: str, context: dict):

	msg = MIMEMultipart('alternative')
	msg['Subject'] = subject
	msg['From'] = SMTP_LOGIN
	msg['To'] = to_email

	with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
		server.starttls()
		server.login(SMTP_LOGIN, SMTP_PASSWORD)
		server.sendmail(SMTP_LOGIN, to_email, msg.as_string())
