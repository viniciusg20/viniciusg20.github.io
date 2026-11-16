# Portfólio · Vinicius Gonzales

Site pessoal de portfólio em Ciência de Dados, feito com HTML, CSS e JavaScript puros
(sem framework e sem build) e publicado no GitHub Pages.

🔗 **https://viniciusg20.github.io**

## Estrutura

```
index.html      → todo o conteúdo (textos, experiências, projetos)
style.css       → visual (cores no topo do arquivo, em :root)
script.js       → tema claro/escuro, menu mobile, animações, filtro de projetos
assets/
  favicon.svg
  curriculo-vinicius-gonzales.pdf   → coloque aqui o seu currículo em PDF
```

## Como editar

- **Textos:** abra `index.html`; cada seção está marcada com um comentário `<!-- ===== NOME ===== -->`.
- **Novo projeto:** copie um bloco `<article class="project">`, troque título, descrição e tags,
  e coloque o link do repositório no `href` de "Código".
  O atributo `data-tags` (python, bi, governanca) define em qual filtro o projeto aparece.
- **Cores:** mude as variáveis em `:root` no topo do `style.css`.

## Rodar localmente

Basta abrir o `index.html` no navegador. Se preferir um servidor local:

```bash
python -m http.server 8000
```
