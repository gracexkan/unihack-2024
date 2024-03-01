from struct import unpack
import time
import logging
from flask_cors import CORS
from flask import Flask, jsonify, request
from ocr import process_document_sample
from src.config import PORT
from werkzeug.utils import secure_filename
import os

APP = Flask(__name__)
start_time = time.time()

@APP.route('/upload-image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join('uploaded_images', filename)
        file.save(file_path)
        result = process_document_sample(file_path, 'image/png')
        return jsonify({"message": "Image uploaded successfully", "result": result}), 200

@APP.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "success"}), 200

CORS(APP)

logging.basicConfig(format="%(asctime)s - %(message)s", level=logging.INFO)


if __name__ == "__main__":
    start_time = time.time()
    APP.run(port=PORT, debug=True)  # Do not edit this port
