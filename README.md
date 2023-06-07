# Trabalho de Introdução ao Desenvolvimento Web

### [Link do mockup do projeto](https://www.figma.com/file/7SPhFp78MEqhogvI7zdPX7/Projeto-Web?type=design&node-id=0%3A1&t=hIrwpg2fKBBboKdN-1)

### Sobre as entregas parciais
<p>A pasta "html-css" do repositório contém os arquivos do **Milestone 1** (primeira entrega do projeto).</p>
<p>A pasta "app" do repositório contém os arquivos do **Milestone 2** (segunda entrega do projeto). Se deseja rodar a aplicação dele, escreva os comandos (dentro da pasta "app") em seu terminal:</p>
```bash
npm install
npm start
```
<p>Os códigos referentes à uma das entregas não dependem dos da outra entrega para funcionarem.</p>

### Grupo
Gabriel Natal Coutinho<br>
Fellip Silva Alves<br>
João Vitor Tigre<br>

### Introdução
<p>
Neste trabalho da disciplina, o grupo desenvolve completamente um site de vendas de imóveis próximos ao mar e lotes de ilhas, denominado <b>OceanView Properties</b>.
</p>

### Ferramentas
<p>
Para a implementação, são utilizadas algumas técnicas/ferramentas de desenvolvimento e planejamento, como:
</p>
<ul>
    <li>Utilização do Figma para o planejamento do layout das páginas (1° Entrega);
    <li>Utilização do Miro para desenhar o diagrama (1° Entrega);
    <li>Técnicas de HTML e CSS para a estilização das páginas (1° Entrega);
    <li>Utilização do React e muitos de seus plugins para o front end completo (2° Entrega);
</ul>
E mais outras que serão utilizadas e especificadas nas próximas entregas do trabalho.

### Requisitos
<p>
Os principais requisitos de nossa aplicação, de forma geral, englobam:
</p>
<ul>
    <li>Possibilidade de se registrar e/ou entrar em uma conta própria no sistema;
    <li>Possibilidade do cliente pesquisar especificamente os produtos (apartamentos, ilhas) que deseja por categoria ou nome;
    <li>Possibilidade do cliente visualizar todas as informações cadastradas sobre um produto em específico;
    <li>Possibilidade do cliente comprar diretamente ou adicionar no carrinho o produto desejado;
    <li>Possibilidade do cliente finalizar a compra para o(s) produto(s) escolhido(s). Customizando sua forma de pagamento;
    <li>Possibilidade do administrador adicionar, editar ou remover produtos no sistema;
    <li>Possibilidade do administrador cadastrar outro administrador no sistema.
</ul>

### Descrição do projeto
<p>
Para a implementação do requisitos descritos, o projeto terá:
</p>
<ul>
    <li>Uma página de cadastro e login para usuários, para preencher as informações necessárias e entrar;
    <li>Uma barra de pesquisa presente no header;
    <li>Uma página para cada produto da loja contendo suas informações (Apenas um esqueleto de página com as informações modificadas com JS). Além disso, cada página possui um <b>mapa personalizado</b> mostrando a localização exata do imóvel (funcionalidade extra do projeto);
    <li>Uma página para acessar o carrinho de compras do usuário (cliente) na aplicação, deixando visível todos os produtos selecionados;
    <li>Uma página para a finalização de compra, sendo necessário preencher os dados (principalmente sobre a forma de pagamento);
    <li>Uma página para a visualização de todos os produtos do sistema, com a opção de removê-los (disponível apenas apra usuários administradores);
    <li>Uma página de adição/edição de produtos no sistema (disponível apenas para usuários administradores);
</ul>

<p>
Para o funcionamento do servidor, o banco de dados vai precisar armazenar os dados sobre:
</p>
<ul>
    <li>Clientes: nome completo, email, senha, foto, endereço, telefone;
    <li>Endereço: CEP, cidade, estado, país, rua, número, complemento;
    <li>Administrador: usuário, email, senha;
    <li>Ítem: nome, descrição, preço, quant estoque, quant vendida, fotos, coordenadas.
</ul>

### Sobre a funcionalidade extra
<p>
Na 2° entrega do projeto, a funcionalidade extra de **vizualizar a localização real do ítem em sua página de descrição** funciona utilizando de uma API do Google Maps. Para isso, foi necessário criar uma conta e obter uma **chave de acesso pessoal** à essa API, para assim funcionar o minimapa na aplicação.
</p>
<p>
Dessa forma, como a chave de acesso não pode ser de uso público, criamos um arquivo ".env" logo na raiz da pasta "app" no formato:
</p>
```bash
REACT_APP_GOOGLE_MAPS_API_KEY=xxxxxx_chave_pessoal_xxxxxxx
```
<p>
Portanto, se deseja ver o funcionamento do minimapa em cada item, obtenha sua chave de acesso à API e crie um arquivo ".env" colocando a chave onde é especificado.
</p>

### Diagrama de acesso às páginas
<p>
Ao criar o HTML e CSS de todas as páginas de nosso site, definimos um grafo que mostra quais páginas poderão ser acessadas diretamente através de outras ou quais páginas possuem locais de acessos a outras. Para isso, as páginas de nossa aplicação Web seguirá a seguinte lógica de acesso: 
</p>

<img src="https://github.com/Fellip15/trab-web/blob/main/diagr%20paginas.jpg" width="500"/>
