const supertest = require("supertest")

describe('Cadast ServeRest - API POST', () => {
    const request = supertest('https://serverest.dev/')
    let token  // armazenar o token de autenticação
    let produtoId  // armazenar o ID do produto cadastrado

    it('Post Cadastro Usuário', async () => {
        const cadastro = require('../../vendors/json/cadast.json')

        const res = await request
            .post('/usuarios')
            .send(cadastro)

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Cadastro realizado com sucesso")
        expect(res.body._id).toBeTruthy()
        
          token = res.body.authorization // Atribui o token de autenticação
       
    })

    it('Post Login', async () => {
        const login = require('../../vendors/json/login.json')

        const res = await request
            .post('/login')
            .send(login)

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Login realizado com sucesso")
        expect(res.body.authorization).toBeTruthy()

        token = res.body.authorization 
    })

    it('Post Cadastrar Produtos', async () => {
        
        const produto = require('../../vendors/json/produto.json')

        const res = await request
            .post('/produtos')
            .set("Authorization", token)  // Usa o token de login para autenticação
            .send(produto)

        expect(res.statusCode).toBe(201)
        expect(res.body.message).toBe("Cadastro realizado com sucesso")
        expect(res.body._id).toBeTruthy()

        produtoId = res.body._id // Atribui o ID do produto 
    })

    it('DELETE Produtos', async () => {
       
        const res = await request
            .delete(`/produtos/${produtoId}`)  //  variável produtoId para excluir o produto
            .set("Authorization", token)  // Passa o token
            .send()

        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("Registro excluído com sucesso")
    })
})