from setuptools import setup, find_packages

requirements = [
    "annotated-types==0.6.0",
    "anyio==4.2.0",
    "bcrypt==4.0.1",
    "certifi==2024.2.2",
    "cffi==1.16.0",
    "charset-normalizer==3.3.2",
    "click==8.1.7",
    "cryptography==41.0.7",
    "ecdsa==0.18.0",
    "exceptiongroup==1.2.0",
    "fastapi==0.109.0",
    "flake8==7.0.0",
    "flair==0.13.1",
    "greenlet==3.0.3",
    "h11==0.14.0",
    "httptools==0.6.1",
    "idna==3.6",
    "Jinja2==3.1.4",
    "MarkupSafe==2.1.5",
    "mccabe==0.7.0",
    "numpy==1.26.4",
    "packaging==23.2",
    "passlib==1.7.4",
    "pyasn1==0.5.1",
    "pycodestyle==2.11.1",
    "pycparser==2.21",
    "pydantic==2.5.3",
    "pydantic-core==2.14.6",
    "pyflakes==3.2.0",
    "PyMySQL==1.1.0",
    "python-dotenv==1.0.0",
    "python-jose==3.3.0",
    "PyYAML==6.0.1",
    "requests==2.31.0",
    "rsa==4.9",
    "scipy==1.10.1",
    "six==1.16.0",
    "sniffio==1.3.0",
    "SQLAlchemy==2.0.25",
    "starlette==0.35.1",
    "tomli==2.0.1",
    "torch==2.3.0",
    "typing-extensions==4.9.0",
    "urllib3==1.26.18",
    "uvicorn==0.25.0",
    "uvloop==0.19.0",
    "watchfiles==0.21.0",
    "websockets==12.0",
]

setup(
    name="flash_cards_api",
    requires=[
        "setuptools",
        "setuptools_scm"
    ],
    use_scm_version={
        "write_to": "./_version.txt",
        "root": "..",
        "relative_to": __file__,
    },
    author="Jakub",
    install_requires=requirements,
    packages=find_packages(),
    zip_safe=False,
    # decorator for all cli commands in flash_cards_api/cli.py
    entry_points={
        "console_scripts": [
            "flash_cards_api_cli = flash_cards_api.cli:cli"
        ]
    }
)
