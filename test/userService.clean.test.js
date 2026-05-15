const { UserService } = require("../src/userService");

describe("UserService - Suíte de Testes Limpa", () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    userService._clearDB();
  });

  test("cria um usuario valido com status ativo", () => {
    // Arrange
    const nome = "Fulano de Tal";
    const email = "fulano@teste.com";
    const idade = 25;

    // Act
    const usuarioCriado = userService.createUser(nome, email, idade);

    // Assert
    expect(usuarioCriado.id).toBeDefined();
    expect(usuarioCriado.nome).toBe(nome);
    expect(usuarioCriado.status).toBe("ativo");
  });

  test("retorna usuario pelo id", () => {
    // Arrange
    const usuarioCriado = userService.createUser(
      "Maria",
      "maria@teste.com",
      29
    );

    // Act
    const usuarioBuscado = userService.getUserById(usuarioCriado.id);

    // Assert
    expect(usuarioBuscado).not.toBeNull();
    expect(usuarioBuscado.id).toBe(usuarioCriado.id);
    expect(usuarioBuscado.nome).toBe("Maria");
  });

  test("desativa usuario comum", () => {
    // Arrange
    const usuarioComum = userService.createUser(
      "Comum",
      "comum@teste.com",
      30
    );

    // Act
    const resultado = userService.deactivateUser(usuarioComum.id);

    // Assert
    expect(resultado).toBe(true);
    const usuarioAtualizado = userService.getUserById(usuarioComum.id);
    expect(usuarioAtualizado.status).toBe("inativo");
  });

  test("nao desativa usuario admin", () => {
    // Arrange
    const usuarioAdmin = userService.createUser(
      "Admin",
      "admin@teste.com",
      40,
      true
    );

    // Act
    const resultado = userService.deactivateUser(usuarioAdmin.id);

    // Assert
    expect(resultado).toBe(false);
    const usuarioAtualizado = userService.getUserById(usuarioAdmin.id);
    expect(usuarioAtualizado.status).toBe("ativo");
  });

  test("gera relatorio com cabecalho e usuarios", () => {
    // Arrange
    userService.createUser("Alice", "alice@email.com", 28);
    userService.createUser("Bob", "bob@email.com", 32);

    // Act
    const relatorio = userService.generateUserReport();

    // Assert
    expect(relatorio).toContain("Relatório de Usuários");
    expect(relatorio).toContain("Alice");
    expect(relatorio).toContain("Bob");
    expect(relatorio).toContain("ativo");
  });

  test("gera relatorio vazio quando nao ha usuarios", () => {
    // Arrange

    // Act
    const relatorio = userService.generateUserReport();

    // Assert
    expect(relatorio).toContain("Relatório de Usuários");
    expect(relatorio).toContain("Nenhum usuário cadastrado.");
  });

  test("rejeita usuario menor de idade", () => {
    // Arrange
    const acao = () => {
      userService.createUser("Menor", "menor@email.com", 17);
    };

    // Act & Assert
    expect(acao).toThrow("O usuário deve ser maior de idade.");
  });
});
