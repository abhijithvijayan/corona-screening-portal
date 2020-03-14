from flask import request, jsonify

from .. import db
from app.api import bp
from .errors import badrequest
from ..models import Patient, Contact, Interaction


@bp.route('/api/v1/savePatient', methods=['POST'])
def savePatient():
    data = request.get_json()
    """ToDo: add validators"""
    patient = Patient()
    patient.name = data["name"]
    patient.gender = data["gender"]
    patient.age = data["age"]
    patient.address = data["address"]
    patient.town = data["town"]
    patient.phone = data["phone"]
    patient.location = data["location"]["value"]
    patient.coordinates = data["location"]["coordinates"]
    db.session.add(patient)
    db.session.commit()

    return jsonify(patient.to_json()), 201


@bp.route('/api/v1/saveContact', methods=['POST'])
def saveContact():
    data = request.get_json()
    """ToDo: add validators"""
    contact = Contact()
    contact.name = data["name"]
    contact.gender = data["gender"]
    contact.age = data["age"]
    contact.address = data["address"]
    contact.town = data["town"]
    contact.phone = data["phone"]
    contact.location = data["location"]["value"]
    contact.coordinates = data["location"]["coordinates"]
    patient_id = data["patientId"]
    patient = Patient.query.filter_by(id=patient_id).first()
    if not patient:
        return badrequest('Patient not found')
    interaction = Interaction()
    """Create contact"""
    db.session.add(contact)
    db.session.commit()
    interaction.patient_id = patient.id
    interaction.contact_id = contact.id
    interaction.start_date = data["startDate"]
    interaction.end_date = data["endDate"]
    interaction.category_of_contact = data["categoryOfContact"]
    interaction.severity = data["severity"]
    """Create Interaction"""
    db.session.add(interaction)
    db.session.commit()

    return jsonify(contact.to_json()), 201


@bp.route('/api/v1/getPersons', methods=["POST"])
def getPerson():
    data = request.get_json()
    tableModel = {"patient": Patient, "contact": Contact}
    key = data["category"]
    if key == "all":
        dict_obj = {}
        for dictkey in tableModel:
            print(dictkey)
            model = tableModel[dictkey]
            datalist = model.query.all()
            dataList = [data.complete_json() for data in datalist]
            dict_obj[dictkey] = dataList

        return jsonify({"data": {
            'list': dict_obj
        }}), 200
    model = tableModel[key]
    datalist = model.query.all()
    dataList = [data.to_json() for data in datalist]

    return jsonify({"data": {
        'list': dataList
    }}), 200
