from flask import request, jsonify

from .. import db
from app.api import bp
from ..models import Patient, Contact


@bp.route('/api/v1/savePatient', methods=['POST'])
def savePatient():
    data = request.get_json()
    """ToDo: add validators"""
    patient = Patient()
    patient.name = data["name"]
    patient.age = data["age"]
    patient.district = data["district"]
    patient.town = data["town"]
    db.session.add(patient)
    db.session.commit()

    return jsonify(patient.to_json()), 201


@bp.route('/api/v1/getPersons', methods=["POST"])
def getPerson():
    data = request.get_json()
    tableModel = {"patient": Patient, "contact": Contact}
    key = data["category"]
    model = tableModel[key]
    datalist = model.query.all()
    dataList = [data.to_json() for data in datalist]

    return jsonify({"data": dataList}), 200
