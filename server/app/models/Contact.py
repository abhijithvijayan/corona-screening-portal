from sqlalchemy import text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID, JSON

from app import db

# Association Table
visits = db.Table(
    'visits',
    # Relationships
    db.Column('patient_id',
              db.Integer, db.ForeignKey('corona__patient.id')),
    db.Column('contact_id', db.Integer, db.ForeignKey(
        'corona__patient__contact.id')),
)


class Contact(db.Model):
    __tablename__ = 'corona__patient__contact'

    uuid = db.Column(UUID(as_uuid=True),
                     unique=True,
                     server_default=text("uuid_generate_v4()"))
    # First integer PK column with autoincrement
    id = db.Column(db.Integer, index=True, primary_key=True)
    name = db.Column(db.String(64), index=True, nullable=False)
    gender = db.Column(db.String(10), index=True, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(128), nullable=False)
    town = db.Column(db.String(40), nullable=False)
    phone = db.Column(db.Unicode(20), nullable=False)
    location = db.Column(db.String(64), nullable=False)
    coordinates = db.Column(JSON, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    # 1-> primary, 2-> secondary
    category_of_contact = db.Column(db.Integer, nullable=False)
    # low -> 0, high -> 1
    severity = db.Column(db.Integer, nullable=False)
    # Meta data
    created_at = db.Column(db.DateTime, index=True,
                           server_default=func.now())
    updated_at = db.Column(db.DateTime, index=True,
                           server_default=func.now())  # ToDo: fix auto updation
    # Relationship -> Patient (https://flask-sqlalchemy.palletsprojects.com/en/2.x/models/#many-to-many-relationships)
    interactions = relationship(
        'Patient',
        secondary=visits,
        lazy='subquery',
        backref=db.backref('contacts', lazy=True))  # `contacts` -> new field in Patient table

    def to_json(self):
        json_contact = {
            'id': 'Pta / cov / c{}'.format(self.id),
            'name': self.name,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

        return json_contact

    def complete_json(self):
        json_contact = {
            'id': 'Pta / cov / c{}'.format(self.id),
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

        return json_contact

    def __repr__(self):
        return '<Contact {}>'.format(self.id)
