from flask import request, jsonify

from .. import db
from app.api import bp
from .errors import badrequest
from sqlalchemy.exc import SQLAlchemyError
from ..models import Person, Association


@bp.route('/api/v1/savePatient', methods=['POST'])
def savePatient():
    data = request.get_json()
    """ToDo: add validators"""
    try:
        patient = Person()
        patient.type_of_person = 'patient'
        patient.name = data["name"]
        patient.gender = data["gender"]
        patient.age = data["age"]
        patient.address = data["address"]
        patient.town = data["town"]
        patient.phone = data["phone"]
        patient.location = data["location"]["value"]
        patient.coordinates = data["location"]["coordinates"],
        db.session.add(patient)
        db.session.commit()

        return jsonify({
            'data': patient.to_json(),
            'status': 'OK'
        }), 201
    except SQLAlchemyError as e:
        print(e)

    return jsonify({
        'error_message': 'Saving failed',
        'data': [],
        'status': 'REQUEST_FAILED'
    }), 500


@bp.route('/api/v1/saveSuspect', methods=['POST'])
def saveSuspect():
    data = request.get_json()
    """ToDo: add validators"""
    try:
        patient_id = data["patientId"]
        patient = Person.query.filter_by(id=patient_id).first()
        if not patient:
            return badrequest('Patient not found')
        suspect = Person()
        suspect.type_of_person = 'suspect'
        suspect.name = data["name"]
        suspect.gender = data["gender"]
        suspect.age = data["age"]
        suspect.address = data["address"]
        suspect.town = data["town"]
        suspect.phone = data["phone"]
        suspect.location = data["location"]["value"]
        suspect.coordinates = data["location"]["coordinates"]
        """Create suspect"""
        db.session.add(suspect)
        db.session.commit()
        """Create association"""
        interaction = Association()
        interaction.patient_id = patient.id
        interaction.suspect_id = suspect.id
        interaction.start_date = data["startDate"]
        interaction.end_date = data["endDate"]
        interaction.category_of_suspect = data["categoryOfSuspect"]
        interaction.severity = data["severity"]
        db.session.add(interaction)
        db.session.commit()

        return jsonify({
            'data': suspect.to_json(),
            'status': 'OK'
        }), 201
    except SQLAlchemyError as e:
        print(e)

    return jsonify({
        'error_message': 'Saving failed',
        'data': [],
        'status': 'REQUEST_FAILED'
    }), 500


@bp.route('/api/v1/getPersons', methods=["POST"])
def getPersons():
    data = request.get_json()
    try:
        key = data["category"]
        if key == 'all':
            datalist = Person.query.all()
            dataList = [data.complete_json() for data in datalist]

            return jsonify({
                'persons': dataList,
                'status': 'OK'
            }), 200

        datalist = Person.query.filter(Person.type_of_person == key)
        dataList = [data.to_json() for data in datalist]

        return jsonify({
            'persons': dataList,
            'status': 'OK'
        }), 200
    except SQLAlchemyError as e:
        print(e)

    return jsonify({
        'error_message': 'Fetch Failed',
        'data': [],
        'status': 'REQUEST_FAILED'
    }), 500
