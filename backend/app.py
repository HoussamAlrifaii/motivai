from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

@app.route('/')
def home():
    return jsonify({"message": "Welcome to Motivai!"})

@app.route('/generate-message', methods=['POST'])
def generate_message():
    data = request.json
    theme = data.get('theme')
    celebrity = data.get('celebrity')

    # For now, return a static message based on the theme and celebrity
    message = f"This is a {theme} message from {celebrity}."

    return jsonify({
        "text": message,
    })

if __name__ == '__main__':
    app.run(debug=True)