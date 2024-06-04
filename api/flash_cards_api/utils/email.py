import os.path
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
# from jinja2 import Template
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
	try:
		with open(os.path.join(TEMPLATES_DIR, f"{template_name}.jinja2"), "r") as file:
			template_str = file.read()

		template = Template(template_str)
		render_html = template.render(context)

		msg = MIMEMultipart('alternative')
		msg['Subject'] = subject
		msg['From'] = SMTP_LOGIN
		msg['To'] = to_email

		msg.attach(MIMEText(render_html, 'html'))
		print("SMTP_PASSWORD", SMTP_PASSWORD)

		with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
			server.starttls()
			server.login(SMTP_LOGIN, SMTP_PASSWORD)
			server.sendmail(SMTP_LOGIN, to_email, msg.as_string())
	except Exception as e:
		logger.error(e)


def send_active_account_email(user_email: str, token: str, db: Session):
	try:
		user: User = db.query(User).filter(User.email == user_email).first()
		token_url = f"{WEBHOST}/account_activation/{token}"
		logger.info(f"Sending active account email to {user_email}")
		context = {
			'username': user.username,
			'token_url': token_url
		}

		send_email(
			user_email,
			"Account activation",
			'account_activation',
			context
		)
	except Exception as e:
		logger.error(e)


def send_password_reset_email(user_email: str, token: str, db: Session):
	try:
		user: User = db.query(User).filter(User.email == user_email).first()
		token_url = f"{WEBHOST}/reset_password/{token}"
		logger.info(f"Sending active account email to {user_email}")

		context = {
			'username': user.username,
			'token_url': token_url
		}

		send_email(
			user_email,
			"Password reset",
			'reset_password',
			context
		)
	except Exception as e:
		logger.error(e)
