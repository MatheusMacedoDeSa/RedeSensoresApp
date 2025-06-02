```markdown
# -- ENZO RODRIGUES ACCIARI / RM550262
# -- Joao Felipe Francischini Tebaldi / RM99333
# -- Matheus Macedo De Sá / RM552133

# Rede de Sensores Inteligentes - App de Alerta de Deslizamentos

## 📝 Descrição do Projeto

Este é um aplicativo móvel desenvolvido com React Native (Expo) que simula uma rede de sensores inteligentes para monitoramento ambiental e previsão de riscos de deslizamentos de terra. Inspirado em iniciativas como o Alerta Rio e sistemas de alerta precoce (Early Warning Systems), o objetivo é fornecer uma ferramenta simples e prática com potencial impacto social.

O aplicativo monitora indicadores como umidade do solo e inclinação do terreno, calcula um nível de risco simplificado e visa alertar sobre áreas potencialmente vulneráveis.

## ✨ Funcionalidades Principais

O aplicativo é composto por 5 telas principais:

1.  **Tela de Boas-vindas:** Apresentação inicial e navegação principal.
2.  **Tela de Inserção de Dados Ambientais:** Permite ao usuário inserir manualmente dados simulados de sensores (umidade do solo e inclinação).
3.  **Tela de Visualização de Riscos:** Exibe o nível de risco calculado com base nos últimos dados inseridos.
4.  **Tela de Histórico de Monitoramento:** Lista todos os registros de dados ambientais salvos.
5.  **Tela de Ações de Mitigação:** Fornece informações e dicas sobre como prevenir e agir em situações de risco de deslizamento.

### Outras Características:
* **Armazenamento Local:** Utiliza `AsyncStorage` para registrar e consultar os dados de monitoramento diretamente no dispositivo.
* **Cálculo de Risco Simplificado:** Implementa uma lógica básica para determinar o nível de risco (Baixo, Médio, Alto) com base nos inputs de umidade e inclinação.
* **Interface Amigável:** Foco em uma navegação intuitiva e apresentação clara das informações.

## 🛠️ Tecnologias Utilizadas

* **React Native:** Framework para desenvolvimento de aplicativos móveis multiplataforma.
* **Expo:** Plataforma e conjunto de ferramentas para facilitar o desenvolvimento e build com React Native.
* **React Navigation:** Para gerenciamento da navegação entre as telas.
* **AsyncStorage:** Para persistência de dados localmente no dispositivo.
* JavaScript (ES6+)
* Expo Router (para estrutura de arquivos baseada em rotas na pasta `app/`)

## 🚀 Como Executar o Projeto Localmente

1.  **Clone o Repositório (se estiver baixando de outro lugar):**
    ```bash
    git clone [https://github.com/SEU_USUARIO_GITHUB/NOME_DO_SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO_GITHUB/NOME_DO_SEU_REPOSITORIO.git)
    cd NOME_DO_SEU_REPOSITORIO
    ```

2.  **Instale as Dependências:**
    Certifique-se de ter Node.js e npm/yarn instalados.
    ```bash
    npm install
    # ou
    yarn install
    ```
    Para garantir compatibilidade com Expo, você pode também usar:
    ```bash
    npx expo install
    ```
    E as dependências específicas que usamos:
    ```bash
    npx expo install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage @expo/vector-icons
    ```

3.  **Execute o Aplicativo com Expo:**
    ```bash
    npx expo start
    ```
    Siga as instruções no terminal para abrir o aplicativo no Expo Go (iOS/Android) ou em um emulador/simulador.

## 📁 Estrutura de Pastas (Simplificada)

```
RedeSensoresApp/
├── app/                  # Arquivos de rota e layout principal (Expo Router)
│   └── _layout.tsx       # Configuração da navegação principal
├── assets/               # Imagens, fontes e outros assets estáticos
├── src/
│   └── screens/          # Componentes de cada tela do aplicativo
│       ├── WelcomeScreen.js
│       ├── DataInputScreen.js
│       ├── RiskViewScreen.js
│       ├── HistoryScreen.js
│       └── MitigationScreen.js
├── app.json              # Configurações do projeto Expo
├── package.json          # Metadados do projeto e dependências
└── README.md             # Este arquivo
```