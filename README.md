# 🎮 Jogo da Forca - Versão Melhorada

Um jogo da forca moderno e responsivo construído com Next.js, TypeScript e Tailwind CSS.

## ✨ Melhorias Implementadas

### 📱 Responsividade e Mobile
- **Tela Full Screen**: A aplicação agora ocupa toda a tela disponível
- **Suporte Mobile Otimizado**: Interface adaptada para dispositivos móveis
- **Teclado Virtual Inteligente**: Detecção automática quando o teclado é ativado no celular
- **Layout Adaptativo**: Elementos se reorganizam automaticamente quando o teclado aparece
- **Viewport Dinâmico**: Uso de `100dvh` (Dynamic Viewport Height) para suporte moderno
- **Viewport Otimizado**: Meta tags configuradas para melhor experiência mobile
- **Prevenção de Zoom**: Evita zoom indesejado ao focar em inputs no iOS
- **Safe Area**: Suporte a entalhes (notch) e áreas seguras do dispositivo
- **Scroll Inteligente**: Prevenção de bounce scroll e scroll suave no iOS

### 🎨 Design Moderno
- **Background Gradiente**: Fundos degradê dinâmicos que mudam com o tema
- **Modo Escuro Aprimorado**: Transições suaves entre temas claro e escuro
- **Componentes Modernos**: Cards com bordas arredondadas, sombras e efeitos blur
- **Animações**: Efeitos de entrada (fade-in, bounce-in) para melhor UX
- **Tipografia Melhorada**: Uso de gradientes em textos e emojis para visual mais atrativo

### 🔧 Interface de Usuário
- **Input Melhorado**: Campo de entrada maior e mais visível com feedback visual
- **Botões Interativos**: Efeitos hover, scale e gradientes nos botões
- **Toggle Moderno**: Switch para modo escuro com animações suaves
- **Letras da Palavra**: Display melhorado com bordas inferiores e efeitos visuais
- **Toasts Temáticos**: Notificações que se adaptam ao tema atual

### 📊 Painel de Estatísticas
- **Dashboard Informativo**: Seção organizada com estatísticas do jogo
- **Barra de Progresso**: Indicador visual do progresso da palavra
- **Cards de Informação**: Letras erradas, tentativas e progresso em cards separados
- **Cores Dinâmicas**: Indicadores coloridos baseados no desempenho

### 🚀 Performance e Acessibilidade
- **Otimizações CSS**: Transições e animações performáticas
- **Acessibilidade**: Melhor contraste e navegação por teclado
- **Responsividade Avançada**: Layout que funciona em qualquer tamanho de tela
- **PWA Ready**: Meta tags configuradas para Progressive Web App
- **Detecção de Teclado**: Sistema inteligente que detecta quando o teclado virtual está ativo
- **Layout Flexível**: Container flexível que se adapta ao espaço disponível
- **Espaçamentos Dinâmicos**: Margens e paddings que se ajustam ao contexto mobile

## 🛠️ Tecnologias Utilizadas

- **Next.js 12** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS 3** - Framework CSS utilitário
- **React Toastify** - Notificações elegantes
- **ClassNames** - Gerenciamento de classes CSS

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Executar em produção
npm run build
npm start
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ButtonAction/     # Botão principal do jogo
│   ├── HideLetter/       # Display das letras da palavra
│   └── Toggle/           # Switch do modo escuro
├── pages/
│   ├── _app.tsx         # Configuração global do app
│   └── index.tsx        # Página principal do jogo
├── server/
│   └── functions.ts     # Lógica do jogo
└── styles/
    └── globals.css      # Estilos globais e animações
```

## 🎮 Como Jogar

1. Uma palavra aleatória é escolhida
2. Digite uma letra no campo de entrada
3. Pressione "Chutar" ou Enter para tentar
4. Você tem 5 tentativas antes de perder
5. Descubra todas as letras para vencer!

## 🔄 Funcionalidades

- ✅ Palavras aleatórias
- ✅ Validação de letras
- ✅ Contador de erros
- ✅ Feedback visual e sonoro
- ✅ Modo escuro/claro
- ✅ Interface responsiva
- ✅ Animações suaves
- ✅ Reinício do jogo

## 📱 Suporte a Dispositivos

- 📱 **Mobile**: iPhone, Android (portrait/landscape)
- 💻 **Desktop**: Todas as resoluções
- 📟 **Tablet**: iPad e similares
- 🖥️ **TV/Monitor**: Telas grandes

## 🎨 Temas

- 🌞 **Modo Claro**: Design clean com tons azuis e roxos
- 🌙 **Modo Escuro**: Interface dark com acentos coloridos

---

Desenvolvido com ❤️ usando tecnologias modernas para uma experiência de jogo incrível!
