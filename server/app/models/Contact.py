from sqlalchemy import text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID

from app import db

"""This class is a Child Class"""


class Contact(db.Model):
    __tablename__ = 'corona__patient__contact'

    uuid = db.Column(UUID(as_uuid=True),
                     unique=True,
                     server_default=text("uuid_generate_v4()"))
    # First integer PK column with autoincrement
    id = db.Column(db.Integer, index=True, primary_key=True)
    name = db.Column(db.String(80), index=True, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    district = db.Column(db.String(25), index=True, nullable=False)
    town = db.Column(db.String(40), nullable=False)
    # Relationship -> Interaction
    interactions = relationship('Interaction', backref='corona__patient')
    # Meta data
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now())

    def __repr__(self):
        return '<Contact {}>'.format(self.name)
