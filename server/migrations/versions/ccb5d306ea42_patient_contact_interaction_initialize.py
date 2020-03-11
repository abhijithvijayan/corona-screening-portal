"""patient/contact/interaction initialize

Revision ID: ccb5d306ea42
Revises: 
Create Date: 2020-03-11 16:45:43.252764

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'ccb5d306ea42'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('corona__patient',
                    sa.Column('uuid', postgresql.UUID(as_uuid=True), server_default=sa.text(
                        'uuid_generate_v4()'), nullable=True),
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=80), nullable=False),
                    sa.Column('age', sa.Integer(), nullable=False),
                    sa.Column('district', sa.String(
                        length=25), nullable=False),
                    sa.Column('town', sa.String(length=40), nullable=False),
                    sa.Column('created_at', sa.DateTime(),
                              server_default=sa.text('now()'), nullable=True),
                    sa.Column('updated_at', sa.DateTime(),
                              server_default=sa.text('now()'), nullable=True),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('uuid')
                    )
    op.create_index(op.f('ix_corona__patient_district'),
                    'corona__patient', ['district'], unique=False)
    op.create_index(op.f('ix_corona__patient_id'),
                    'corona__patient', ['id'], unique=False)
    op.create_index(op.f('ix_corona__patient_name'),
                    'corona__patient', ['name'], unique=False)
    op.create_table('corona__patient__contact',
                    sa.Column('uuid', postgresql.UUID(as_uuid=True), server_default=sa.text(
                        'uuid_generate_v4()'), nullable=True),
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=80), nullable=False),
                    sa.Column('age', sa.Integer(), nullable=False),
                    sa.Column('district', sa.String(
                        length=25), nullable=False),
                    sa.Column('town', sa.String(length=40), nullable=False),
                    sa.Column('created_at', sa.DateTime(),
                              server_default=sa.text('now()'), nullable=True),
                    sa.Column('updated_at', sa.DateTime(),
                              server_default=sa.text('now()'), nullable=True),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('uuid')
                    )
    op.create_index(op.f('ix_corona__patient__contact_district'),
                    'corona__patient__contact', ['district'], unique=False)
    op.create_index(op.f('ix_corona__patient__contact_id'),
                    'corona__patient__contact', ['id'], unique=False)
    op.create_index(op.f('ix_corona__patient__contact_name'),
                    'corona__patient__contact', ['name'], unique=False)
    op.create_table('corona__interaction',
                    sa.Column('uuid', postgresql.UUID(as_uuid=True), server_default=sa.text(
                        'uuid_generate_v4()'), nullable=True),
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('patient_id', sa.Integer(), nullable=True),
                    sa.Column('contact_id', sa.Integer(), nullable=True),
                    sa.Column('start_date', sa.DateTime(), nullable=False),
                    sa.Column('end_date', sa.DateTime(), nullable=False),
                    sa.Column('mode_of_contact', sa.Integer(), nullable=False),
                    sa.Column('type_of_contact', sa.String(
                        length=20), nullable=False),
                    sa.Column('severity', sa.Integer(), nullable=False),
                    sa.Column('created_at', sa.DateTime(),
                              server_default=sa.text('now()'), nullable=True),
                    sa.Column('updated_at', sa.DateTime(),
                              server_default=sa.text('now()'), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['contact_id'], ['corona__patient__contact.id'], ),
                    sa.ForeignKeyConstraint(
                        ['patient_id'], ['corona__patient.id'], ),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('uuid')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('corona__interaction')
    op.drop_index(op.f('ix_corona__patient__contact_name'),
                  table_name='corona__patient__contact')
    op.drop_index(op.f('ix_corona__patient__contact_id'),
                  table_name='corona__patient__contact')
    op.drop_index(op.f('ix_corona__patient__contact_district'),
                  table_name='corona__patient__contact')
    op.drop_table('corona__patient__contact')
    op.drop_index(op.f('ix_corona__patient_name'),
                  table_name='corona__patient')
    op.drop_index(op.f('ix_corona__patient_id'), table_name='corona__patient')
    op.drop_index(op.f('ix_corona__patient_district'),
                  table_name='corona__patient')
    op.drop_table('corona__patient')
    # ### end Alembic commands ###