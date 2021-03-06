# flask server

## Prerequisites

- Postgresql 12

    - ## Ubuntu
      ```
      sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

      sudo apt-get update
      sudo apt-get install postgresql-12 postgis pgadmin4 postgresql-client-12 postgresql-12-postgis-3-scripts postgresql-client-common  postgresql-common

      pg_ctlcluster 12 main start
      ```
      #### Configure remote Connection
      ```
      sudo nano /etc/postgresql/12/main/postgresql.conf 

      Uncomment line 59 and change the Listen address to accept connections within your networks.

      # Listen on all interfaces
      listen_addresses = '*'

      sudo systemctl restart postgresql
      netstat  -tunelp | grep 5432
      ```

    - ## Arch Linux
      ```
      $ yay -S postgresql
      $ yay -S postgis # extension

      $ sudo -iu postgres

      [postgres]$ initdb --locale=en_US.UTF-8 -E UTF8 -D /var/lib/postgres/data

      [postgres]$ exit

      $ sudo systemctl enable postgresql.service
      $ sudo systemctl start postgresql.service
      ```

    ### Create User
    ```
    sudo -u postgres createuser --interactive
    ```

    ### Create Database and Use Extensions

    ```
    createdb db_name

    psql -d db_name

    > CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    ```

<hr />

## Flask

### Install dependencies

```
pipenv install
```

### Generate environment on another machine

1. List all the dependencies to a file

```
pip freeze > requirements.txt
```

2. Install from `requirements.txt` file

```
pip install -r requirements.txt
```

### Update Env Credentials & Set up database

Apply the migration to the database:

```
flask db upgrade
```