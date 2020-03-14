from sqlalchemy import text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID, JSON

from app import db

"""This class is a Child Class"""


class Patient(db.Model):
    __tablename__ = 'corona__patient'

    uuid = db.Column(UUID(as_uuid=True),
                     unique=True,
                     server_default=text("uuid_generate_v4()"))
    # First integer PK column with autoincrement
    id = db.Column(db.Integer, index=True, primary_key=True)
    # Basic Patient details
    name = db.Column(db.String(64), index=True, nullable=False)
    gender = db.Column(db.String(10), index=True, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(128), nullable=False)
    town = db.Column(db.String(40), nullable=False)
    phone = db.Column(db.Unicode(20), nullable=False)
    location = db.Column(db.String(64), nullable=False)
    coordinates = db.Column(JSON, nullable=False)
    # Relationship -> Interaction
    interactions = relationship('Interaction', backref='patient__interaction')
    # Meta data
    created_at = db.Column(db.DateTime, index=True, server_default=func.now())
    updated_at = db.Column(db.DateTime, index=True,
                           server_default=func.now())  # ToDo: fix auto updation

    def to_json(self):
        json_patient = {
            'id': 'Pta / cov / p{}'.format(self.id),
            'name': self.name,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

        return json_patient

    def complete_json(self):
        json_patient = {
            'id': 'Pta / cov / p{}'.format(self.id),
            'name': self.name,
            'gender': self.gender,
            'age': self.age,
            'address': self.address,
            'town': self.town,
            'phone': self.phone,
            'location': {
                'value': self.location,
                'coordinates': self.coordinates
            },
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

        return json_patient

    # method tells Python how to print objects of this class
    def __repr__(self):
        return '<Patient {}>'.format(self.id)
