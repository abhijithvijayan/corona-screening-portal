from flask import jsonify


def badrequest(message):
    response = jsonify({'status': 'BAD_REQUEST', 'error_message': message})
    response.status_code = 400
    return response
