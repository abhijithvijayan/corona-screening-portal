from sqlalchemy import text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.ext.associationproxy import association_proxy

from .Association import Association
from app import db


class Person(db.Model):
    """Main Table"""
    __tablename__ = 'corona__person'

    uuid = db.Column(UUID(as_uuid=True),
                     unique=True,
                     server_default=text("uuid_generate_v4()"))
    id = db.Column(db.Integer, index=True, primary_key=True)
    # ---- Basic Person details ---- #
    name = db.Column(db.String(64), index=True, nullable=False)
    gender = db.Column(db.String(10), index=True, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(128), nullable=False)
    town = db.Column(db.String(40), nullable=False)
    phone = db.Column(db.Unicode(20), nullable=False)
    location = db.Column(db.String(64), nullable=False)
    coordinates = db.Column(JSON, nullable=False)
    type_of_person = db.Column(db.String(15), index=True, nullable=False)
    # ---- Meta data ---- #
    created_at = db.Column(db.DateTime, index=True, server_default=func.now())
    updated_at = db.Column(db.DateTime, index=True,
                           server_default=func.now())  # ToDo: fix auto updation
    # ---- Relationships ---- #
    interaction_from = relationship(
        'Association',
        backref='suspect__interaction',
        primaryjoin=(id == Association.suspect_id)
    )
    interaction_to = relationship(
        'Association',
        backref='patient__interaction',
        primaryjoin=(id == Association.patient_id)
    )

    def to_json(self):
        json_person = {
            'id': 'Pta / cov / {}'.format(self.id),
            'name': self.name,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

        return json_person

    def complete_json(self):
        json_person = {
            'id': 'Pta / cov / {}'.format(self.id),
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
            'type_of_person': self.type_of_person,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
        if self.type_of_person == 'suspect' and len(self.interaction_from) != 0:
            """self.interaction_from is an array"""
            json_person['category_of_suspect'] = self.interaction_from[0].category_of_suspect
            json_person['severity'] = self.interaction_from[0].severity

        return json_person

    # method tells Python how to print objects of this class
    def __repr__(self):
        return '<Person {}>'.format(self.id)
