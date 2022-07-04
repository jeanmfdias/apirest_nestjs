# Projeto de API Rest em Nest.js

O Projeto está expondo:

GET /users

POST /users

GET /profiles

POST /profiles

POST /auth/login

Ao executar o projeto localmente alterar o parametro de conexão com o banco de dados Postgres para **localhost**. Quando utilizar com o Docker alterar para **pg**. No arquivo **src/app.module.ts**.

## Next steps

- [x] Adicionar .env
- [ ] Criptografar a senha
- [x] Ordenar o resultados das listagens
- [ ] Refatorar os testes unitários (UsersService, AppController)
- [ ] Finalizar os testes unitários (UsersController, ProfilesService, ProfilesController, AuthService)
- [ ] Adicionar Swagger API Doc 