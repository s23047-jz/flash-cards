import os.path
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from jinja2 import Environment, FileSystemLoader
from sqlalchemy.orm import Session

from flash_cards_api.config import (
	TEMPLATES_DIR,
	SMTP_SERVER,
	SMTP_PORT,
	SMTP_LOGIN,
	SMTP_PASSWORD,
	WEBHOST
)
from flash_cards_api.models.users import User
from flash_cards_api.logger import logger


def send_email(to_email: str, subject: str, template_name: str, context: dict):

	env = Environment(loader=FileSystemLoader('templates'))
	template = env.get_template(os.path.join(TEMPLATES_DIR, template_name))
	render_html = template.render(context)

	msg = MIMEMultipart('alternative')
	msg['Subject'] = subject
	msg['From'] = SMTP_LOGIN
	msg['To'] = to_email

	msg.attach(MIMEText(render_html, 'html'))

	logger.info(f"Sends email to {to_email}")
	with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
		server.starttls()
		server.login(SMTP_LOGIN, SMTP_PASSWORD)
		server.sendmail(SMTP_LOGIN, to_email, msg.as_string())


def send_active_account_email(user_email: str, token: str, db: Session):
	user: User = db.query(User).where(User.email == user_email)
	token_url = f"{WEBHOST}/reset_password/{token}"

	context = {
		'username': user.username,
		'token_url': token_url
	}

	send_email(
		user.email,
		"Account activation",
		'account_activation.jinja2',
		context
	)
