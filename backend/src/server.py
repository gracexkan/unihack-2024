import signal
import sys
import hashlib
import time
import logging
import psutil
from json import dumps
from flask_cors import CORS
from flask import Flask, request
from src.config import PORT


def quit_gracefully():
    """For coverage"""
    sys.exit(0)


def default_handler(err):
    """Default handler"""
    response = err.get_response()
    print("response", err, err.get_response())
    response.data = dumps(
        {
            "code": err.code,
            "name": "System Error",
            "message": err.get_description(),
        }
    )
    response.content_type = "application/json"
    return response


APP = Flask(__name__)
start_time = time.time()

@APP.route("/", methods=["GET"])
def home():
    """Logging route"""
    logging.info({"ip": request.remote_addr, "route": "/"})
    with open("src/root.html") as root:
        return root.read()

@APP.route("/healthcheck", methods=["GET"])
def validate_healthcheck():
    """Healthcheck route"""
    logging.info({"ip": request.remote_addr, "route": "/healthcheck"})
    return {
        "uptime": int(time.time() - start_time),
        "memoryUsage": int(psutil.virtual_memory().percent),
        "cpuUsage": int(psutil.cpu_percent()),
        "activeConnections": 0,
    }


CORS(APP, supports_credentials=True, resources={r"/*": {"origins": "*"}})

APP.config["TRAP_HTTP_EXCEPTIONS"] = True
APP.register_error_handler(Exception, default_handler)

logging.basicConfig(format="%(asctime)s - %(message)s", level=logging.INFO)


if __name__ == "__main__":
    signal.signal(signal.SIGINT, quit_gracefully)  # For coverage
    start_time = time.time()
    APP.run(port=PORT, debug=False)  # Do not edit this port
