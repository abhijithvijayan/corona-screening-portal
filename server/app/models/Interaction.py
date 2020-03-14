from sqlalchemy import text
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID

from app import db

"""This class is a Parent Class"""


class Interaction(db.Model):
    __tablename__ = 'corona__interaction'

    uuid = db.Column(UUID(as_uuid=True),
                     unique=True,
                     server_default=text("uuid_generate_v4()"))
    # First integer PK column with autoincrement
    id = db.Column(db.Integer, primary_key=True)
    # Relationships
    patient_id = db.Column(db.Integer, db.ForeignKey('corona__patient.id'))
    contact_id = db.Column(db.Integer, db.ForeignKey(
        'corona__patient__contact.id'))
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    # 1-> primary, 2-> secondary
    category_of_contact = db.Column(db.Integer, nullable=False)
    # low -> 0, high -> 1
    severity = db.Column(db.Integer, nullable=False)
    # Meta data
    created_at = db.Column(db.DateTime, index=True, server_default=func.now())
    updated_at = db.Column(db.DateTime, index=True,
                           server_default=func.now())  # ToDo: fix auto updation

    def to_dict(self):
        json_interaction = {
            'id': self.id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

        return json_interaction

    def __repr__(self):
        return '<Interaction {}>'.format(self.id)
