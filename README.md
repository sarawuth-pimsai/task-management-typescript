# task-management

### Config .env

```
ENV='dev' #env : 'dev' | 'qa' | 'uat' | 'prod'
APPLICATION_REST_PORT= #Application port ext: 3000
APPLICATION_REST_BASE_URL= #Application base endpoint ext: '/api/v1'
APPLICATION_REST_ORIGIN= #Application config origin ext: 'http://example.com,http://example2.com'
APPLICATION_SECRET_KEY= #Application access token secret key for encrypt
APPLICATION_REFRESH_KEY= #Application refresh token key for encrypt

MYSQL_HOST=db #MySQL config host(docker compose service name)
MYSQL_ROOT_PASSWORD= #MySQL root password
MYSQL_USER= #MySQL username
MYSQL_PASSWORD= #MySQL password
MYSQL_DATABASE= #MySQL database
MYSQL_PORT= #MySQL port
MYSQL_CA= #MySQL path to ssl ca exp: ./prod_cert.pem
```

### Endpoint List Tasks

`GET`

```
/tasks
```

### Endpoint Task Detail

`GET`

```
/tasks/:taskId
```

### Endpoint List Comments of Task

`GET`

```
/tasks/:taskId/comments
```

### Endpoint Update Task Status

`PUT`

```
Header Authorization: Bearer {token}
/tasks/:taskId
```

### Endpoint Delete Task

`DELETE`

```
Header Authorization: Bearer {token}
/tasks/:taskId
```

### Endpoint Generate Token

```
/auth/signin/:userId
```

### Setup and Install Dependencies

```
yarn
```

### Development

```
yarn dev
```

### Test

```
yarn test
```

### Test Coverage

```
yarn test:coverage
```

### API Application Build and Run

```
docker build -f ./docker/Dockerfile.Api --target deploy -t task-api .
```

### MySQL Database setup table and running

```
docker build -f ./docker/Dockerfile.MySQL --target deploy -t task-db .
```

### Run Task Management by Docker Compose

```
docker compose -f docker-compose.yml up
```
