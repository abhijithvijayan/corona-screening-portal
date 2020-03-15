
from sqlalchemy import text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID, JSON


from app import db


class Association(db.Model):
    '''Association Table'''
    __tablename__ = 'corona__association'

    uuid = db.Column(UUID(as_uuid=True),
                     unique=True,
                     server_default=text("uuid_generate_v4()"))
    id = db.Column(db.Integer, index=True,
                   autoincrement=True, primary_key=True)
    # ---- Relationships ---- #
    patient_id = db.Column(db.Integer, db.ForeignKey(
        'corona__person.id'), primary_key=True)
    suspect_id = db.Column(db.Integer, db.ForeignKey(
        'corona__person.id'), primary_key=True)
    # ---- Other fields ---- #
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    # 1-> primary, 2-> secondary
    category_of_suspect = db.Column(db.Integer, nullable=False)
    # low -> 0, high -> 1
    severity = db.Column(db.Integer, nullable=False)
    # ---- Meta data ---- #
    created_at = db.Column(db.DateTime, index=True, server_default=func.now())
    updated_at = db.Column(db.DateTime, index=True,
                           server_default=func.now())  # ToDo: fix auto updation

    def __repr__(self):
        return '<Association {}>'.format(self.id)
