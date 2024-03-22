Feature: Pegar registros de ponto por dia
  Todos registros de ponto para uma data selecionada.

  Scenario: Existem registros de ponto
    Given O funcionário realizou checkin e checkout
    When Data selecionada é hoje
    Then Exibir todos registros de ponto para a data selecionada

  Scenario: Não existem registros de ponto
    Given O funcionário não realizou checkin e checkout
    When Data selecionada for amanhã
    Then Exibir uma lista vazia
