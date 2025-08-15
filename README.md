# Agrega Commerce AI Editor

Desenvolva soluções de e-commerce e logística com IA em segundos. Uma plataforma completa de desenvolvimento full commerce criada pela [Agrega](https://agrega.com.br).

## Sobre a Agrega

A Agrega é uma empresa especializada em full commerce, oferecendo soluções integradas de e-commerce e logística para empresas de todos os tamanhos. Nossa plataforma combina tecnologia de ponta com experiência de mercado para criar soluções que impulsionam o crescimento dos negócios.

<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZtaHFleGRsMTNlaWNydGdianI4NGQ4dHhyZjB0d2VkcjRyeXBucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZFVLWMa6dVskQX0qu1/giphy.gif" alt="Open Lovable Demo" width="100%"/>



## Funcionalidades

- **Desenvolvimento com IA**: Crie aplicações React completas conversando com IA
- **Gerenciamento de Projetos**: Salve e retome seus projetos de onde parou
- **Categorias Especializadas**: Templates otimizados para e-commerce, logística e full commerce
- **Web Scraping Inteligente**: Analise sites existentes para criar clones ou inspirações
- **Preview em Tempo Real**: Veja suas mudanças instantaneamente
- **Exportação de Código**: Baixe seu projeto como ZIP

## Setup

1. **Clone & Install**
```bash
git clone https://github.com/agrega/agrega-commerce-ai-editor.git
cd agrega-commerce-ai-editor
npm install
```

2. **Add `.env.local`**
```env
# Required
E2B_API_KEY=your_e2b_api_key  # Get from https://e2b.dev (Sandboxes)
FIRECRAWL_API_KEY=your_firecrawl_api_key  # Get from https://firecrawl.dev (Web scraping)

# Optional (need at least one AI provider)
ANTHROPIC_API_KEY=your_anthropic_api_key  # Get from https://console.anthropic.com
OPENAI_API_KEY=your_openai_api_key  # Get from https://platform.openai.com (GPT-5)
GEMINI_API_KEY=your_gemini_api_key  # Get from https://aistudio.google.com/app/apikey
GROQ_API_KEY=your_groq_api_key  # Get from https://console.groq.com (Fast inference - Kimi K2 recommended)
```

3. **Run**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)  

## License

MIT
