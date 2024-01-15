import datetime
import pickle

class Paciente:
    def __init__(self, nome, telefone):
        self.nome = nome
        self.telefone = telefone

class Consulta:
    def __init__(self, paciente, dia, hora, especialidade):
        self.paciente = paciente
        self.dia = dia
        self.hora = hora
        self.especialidade = especialidade

def carregar_dados():
    try:
        with open('dados_pacientes.pkl', 'rb') as file:
            pacientes = pickle.load(file)
    except FileNotFoundError:
        pacientes = []
    try:
        with open('dados_agendamentos.pkl', 'rb') as file:
            agendamentos = pickle.load(file)
    except FileNotFoundError:
        agendamentos = []
    return pacientes, agendamentos

def salvar_dados(pacientes, agendamentos):
    with open('dados_pacientes.pkl', 'wb') as file:
        pickle.dump(pacientes, file)
    with open('dados_agendamentos.pkl', 'wb') as file:
        pickle.dump(agendamentos, file)

def cadastrar_paciente():
    nome = input("Digite o nome do paciente: ")
    telefone = input("Digite o telefone do paciente: ")

    for paciente in pacientes:
        if paciente.telefone == telefone:
            print("Paciente já cadastrado!")
            return

    novo_paciente = Paciente(nome, telefone)
    pacientes.append(novo_paciente)
    salvar_dados(pacientes, agendamentos)
    print("Paciente cadastrado com sucesso!")

def listar_pacientes():
    for idx, paciente in enumerate(pacientes, start=1):
        print(f"{idx}. {paciente.nome} - Telefone: {paciente.telefone}")

def agendar_consulta():
    listar_pacientes()
    escolha = int(input("Escolha o número do paciente para agendar a consulta: ")) - 1

    paciente_escolhido = pacientes[escolha]

    dia = input("Digite o dia da consulta (DD/MM/AAAA): ")
    hora = input("Digite a hora da consulta (HH:MM): ")
    especialidade = input("Digite a especialidade desejada: ")

    nova_consulta = Consulta(paciente_escolhido, dia, hora, especialidade)

    
    for consulta in agendamentos:
        if consulta.dia == dia and consulta.hora == hora:
            print("Essa data e hora já estão ocupadas.")
            return

    
    data_atual = datetime.datetime.now()
    data_consulta = datetime.datetime.strptime(dia, '%d/%m/%Y')
    if data_consulta < data_atual:
        print("Não é possível agendar consultas retroativas.")
        return

    agendamentos.append(nova_consulta)
    salvar_dados(pacientes, agendamentos)
    print("Consulta agendada com sucesso!")


def cancelar_consulta():
    for idx, consulta in enumerate(agendamentos, start=1):
        print(f"{idx}. {consulta.paciente.nome} - Data: {consulta.dia}, Hora: {consulta.hora}, Especialidade: {consulta.especialidade}")

    escolha = int(input("Escolha o número da consulta para cancelar: ")) - 1

    consulta_cancelar = agendamentos[escolha]

    print(f"Consulta marcada para {consulta_cancelar.dia} às {consulta_cancelar.hora} com {consulta_cancelar.paciente.nome} na especialidade {consulta_cancelar.especialidade}")
    confirmacao = input("Deseja cancelar esta consulta? (S/N): ")

    if confirmacao.upper() == 'S':
        agendamentos.pop(escolha)
        salvar_dados(pacientes, agendamentos)
        print("Consulta cancelada com sucesso!")

pacientes, agendamentos = carregar_dados()

while True:
    print("\nMENU:")
    print("1. Cadastrar paciente")
    print("2. Marcar consulta")
    print("3. Cancelar consulta")
    print("4. Sair")

    escolha_menu = input("Escolha uma opção: ")

    if escolha_menu == '1':
        cadastrar_paciente()
    elif escolha_menu == '2':
        agendar_consulta()
    elif escolha_menu == '3':
        cancelar_consulta()
    elif escolha_menu == '4':
        break
    else:
        print("Opção inválida. Escolha novamente.")
