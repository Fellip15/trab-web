# Trabalho de Introdução ao Desenvolvimento Web

### Introdução
<p>
Neste trabalho da disciplina, o grupo desenvolve completamente um site de vendas de imóveis próximos ao mar e lotes de ilhas, denominado <b>OceanView Properties</b>.
</p>

### [Link do mockup do projeto](https://www.figma.com/file/7SPhFp78MEqhogvI7zdPX7/Projeto-Web?type=design&node-id=0%3A1&t=hIrwpg2fKBBboKdN-1)

### Sobre as entregas parciais
<p>A pasta "html-css" do repositório contém os arquivos do <b>Milestone 1</b> (primeira entrega do projeto). Os códigos escritos nela não compõem o funcionamento da aplicação final, servindo apenas de modelo para o desenvolvimento.</p>
<p>A pasta "app" do repositório contém os arquivos do <b>Milestone 2</b> (segunda entrega do projeto) com algumas adições feitas no <b>Milestone 3<b> (terceira entrega do projeto).</p>
<p>Por fim, a pasta "server" do repositório foi feita completamente durante o <b>Milestone 3</b>.</p>
<p>Tanto os códigos da pasta "app" (cliente) quanto os da pasta "server" (servidor) compõem realmente a aplicação do trabalho.</p>

### Como rodar o projeto
<p>Para o site funcionar em sua máquina, é necessário abrir 2 abas em seu terminal simultaneamente. Em uma delas, vá para dentro da pasta "server" do projeto e digite os comandos:</p>

```bash
npm install
npm run dev
```
Isso irá inicializar a parte do servidor da aplicação.

<p>Enquanto isso, na outra aba do seu terminal, vá para dentro da pasta "app" do projeto e digite os comandos:</p>

```bash
npm install
npm start
```
Isso irá inicializar a parte do cliente da aplicação.

<p>Após isso, o projeto deverá funcionar corretamente em seu navegador no localhost e porta 3000</p>

### Diagrama de acesso às páginas
<p>
Ao criar o HTML e CSS de todas as páginas de nosso site, definimos um grafo que mostra quais páginas poderão ser acessadas diretamente através de outras ou quais páginas possuem locais de acessos a outras. Para isso, as páginas de nossa aplicação Web seguirá a seguinte lógica de acesso: 
</p>

<img src="https://github.com/Fellip15/trab-web/blob/main/diagr%20paginas.jpg" width="500"/>

### Ferramentas
<p>
Para a implementação, são utilizadas algumas técnicas/ferramentas de desenvolvimento e planejamento, como:
</p>
<ul>
    <li>Utilização do Figma para o planejamento do layout das páginas (1° Entrega);
    <li>Utilização do Miro para desenhar o diagrama (1° Entrega);
    <li>Técnicas de HTML e CSS para a estilização das páginas (1° Entrega);
    <li>Utilização do React e muitos de seus plugins para o front end completo (2° Entrega);
    <li>Utilização do Node.js com Express e Mongoose para a elaboração do back end completo, juntamente com banco de dados (3° Entrega);
</ul>

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
    <li>Clientes: nome de usuário, nome completo, email, cpf, senha, foto, endereço, telefone;
    <li>Endereço: CEP, rua, número, bairro;
    <li>Administrador: nome de usuário, email, senha;
    <li>Ítem: nome, descrição, preço, número de parcelas, quant estoque, quant vendida, fotos, coordenadas.
</ul>

### Sobre a funcionalidade extra
<p>
Na 2° entrega do projeto, a funcionalidade extra de <b>vizualizar a localização real do ítem em sua página de descrição</b> funciona utilizando de uma API do Google Maps. Para isso, foi necessário criar uma conta e obter uma <b>chave de acesso pessoal</b> à essa API, para assim funcionar o minimapa na aplicação.
</p>
<p>
Dessa forma, como a chave de acesso não pode ser de uso público, criamos um arquivo ".env" logo na raiz da pasta "app" (e adicionamos ao .gitignore para não subir ao repositório) contendo:
</p>

```bash
REACT_APP_GOOGLE_MAPS_API_KEY=xxxxxx_chave_pessoal_xxxxxxx
```
<p>
Portanto, se deseja ver o funcionamento do minimapa em cada item, obtenha sua chave de acesso à API e crie um arquivo ".env" colocando a chave onde é especificado.
</p>

### Plano de testes
Com o projeto finalizado, é possível realizar alguns testes sobre suas principais funcionalidades e verifica se elas operam como o esperado. Para isso, temos os testes sobre a aplicação:
<ul>
    <li><b>Cadastrar novo usuário:</b> Na tela inicial, clique no ícone do canto superior direito para ser direcionado à tela de Login, nela vc clica em "ainda não possui cadastro" para ir para a tela de cadastro. Então preencha os dados do novo usuário, confirme e, se nenhum nome de usuário ou email descritos foram utilizados, o cadastro será feito;
    <li><b>Fazer login como usuário:</b> Na tela inicial, clique no ícone do canto superior direito para ser direcionado à tela de Login, então preencha seus dados de usuário e confirme. Se os dados já foram cadastrados e estiverem corretos, então o login será feito;
    <li><b>Editar perfil:</b> Na tela inicial e com o usuário logado, clique no ícone superior para ir para a tela de perfil do usuário, lá serão mostrados todos os dados que o usuário possui e deixar editável aqueles que podem ser mudados. Caso tenha feita alguma alteração neles, clique em "salvar" que eles já serão atualizados;
    <li><b>Ver informações sobre um item:</b> Em qualquer tela que possua uma miniatura do item disponível (tela principal ou de busca), clicando na miniatura do ítem desejado, o usuário será direcionado à tela que fala sobre as informações do item;
    <li><b>Comprar um item:</b> Na tela de informações do item, se ele estiver em estoque, será possível selecionar a quantidade e clicar em "comprar item" e ser direcionado à tela de finalização de compras. Nesta tela será necessário preencher os dados de compra e finalizá-la. Isso irá atualizar o estoque do item no banco;
    <li><b>Comprar vários itens:</b> Na tela de informações do item, se ele estiver em estoque, será possível selecionar a quantidade e clicar em "adicionar ao carrinho". Fazendo isso com todos os itens que desejar, eles estarão armazenados no carrinho do usuário. Portanto, ao clicar no ícone do carrinho no canto superior, o usuário será levado à tela de carrinho e poderá ver todos os itens adicionados (podendo removê-los ou limpar todo o carrinho). Por fim, clicando em "finalizar compra", o usuário será direcionado à tela de finalização de compra novamente;
    <li><b>Buscar itens pelo nome:</b> No header da página, inserindo algum nome na barra de busca e clicando no ícone da lupa, o usuário será mandado à uma página de busca que retorna todos os itens de nome correspondente ao buscado;
    <li><b>Fazer login como administrador:</b> Na mesma tela de login (descrita antes), se o usuário ou email forem de um usuário administrador e a senha estiver correta, o login será efetuado;
    <li><b>Cadastrar novo administrador:</b> Logado como administrador e em sua tela principal, clique no ícone presente no canto superior para ser direcionado à tela de cadastrar um novo administrador. Com isso, informe os dados necessários e confirme. Se nenhum outro usuário ou administrador utilizou do email ou nome informados, o cadastro será efetuado;
    <li><b>Editar itens presentes no banco:</b> Logado como administrador e em sua tela principal, clique no ícone presente no canto inferior direito do ítem para ser direcionado à tela de editar os dados do item escolhido. Após editar os dados desejados, clique em "salvar";
    <li><b>Remover itens presentes no banco:</b> Logado como administrador e em sua tela principal, clique no ícone presente no canto superior direito do ítem para removê-lo do banco;
    <li><b>Adicionar novos itens no banco:</b> Logado como administrador e em sua tela principal, clique em "adicionar item" para ser direcionado à tela de preencher as informações do novo item. Após finalizar, clique em "salvar" que ele já estará disponível no banco;
    <li><b>Remover usuário do banco:</b> Logado como administrador e em sua tela principal, clique no ícone presente no canto superior para ser direcionado à tela de usuários presentes no site. Com isso, clique no ícone presente à direita do usuário desejado e confirme para removê-lo do banco.
</ul>
Todos esses testes descritos já foram verificados e funcionam corretamente no projeto.

### Grupo
Gabriel Natal Coutinho<br>
Fellip Silva Alves<br>
João Vitor Tigre<br>