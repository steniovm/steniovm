# APODnasaBR
<i><strong>Todo dia uma imagem astronômica supimpa diferente.</strong></i>

<strong>Descrição</strong>
<ul>
  <li>Imagens selecionadas e disponibilizada pela NASA para efeitos de divulgação.</li>
  <li>As imagens possuem titulo e explicação.</li>
  <li>As imagens começaram a ser disponibilizada pela API em 16 de jun de 1995.</li>
  <li>Algumas imagens são protegidas por Copyright, neste caso elas são devidamente creditadas.</li>
  <li>Em algumas datas a media disponibilizada são videos, nessas datas, além de exibir o video, também é exibido um thumbs-image.</li>
  <li>Os dados das imagens são disponibilizados pela agencia espacial americana em inglês, a ferramenta de tradução do goole está disponivel para o usuário que desejar.</li>
  <li>Existe um limite de requicições por hora e diário, <a href="https://api.nasa.gov/#signUp" target="_blank">pode-se eliminar esse limite obtendo uma API key na NASA.</a></li>
</ul>

<strong>Instrução</strong>
<ul>
  <li>Ao abrir a pagina uma requisição para a imagem do dia é feita automaticamente.</li>
  <li>Ao selecionar uma data uma nova requisição para a imagem da data seleciona é feita.</li>
  <li>Nos dois casos a imagem, assim como seus dados, são exibidos logo que a requisição é respondida.</li>
  <li>Se o usuário desejar traduzir as informações basta selecionar o idioma com a <a href="https://translate.google.com/" target="_blank">ferramenta de google translate.<a></li>
  <li>O usuário tem duas opções de download da imagem exibida:
    <ul>
      <li>Em baixa resolução (como a que é exibida na pagina).</li>
      <li>Em alta resolução (conforme disponibilização da API).</li>
    </ul>
  </li>
  <li>Também é possível baixar uma lista de imagens que serão exibidas em miniaturas.</li>
  <li>Para requisitar a lista o usuário possui duas opções:</li>
    <ul>
      <li>Inserindo data inicial e final, obtendo todas as imagens entre essas datas.</li>
      <li>De forma aleatório, inserindo apenas o numero de imagens desejadas.</li>
    </ul>
  <li>Em ambos os casos, é feita apenas uma requisição para se obter toda a lista.</li>
  <li>Ao se clicar em uma miniatura um modal com a imagem em tamanho normal, todos os dados e os links para download é aberto.</li>
  <li>Abrir as imagens das miniaturas não realiza requisições.</li>
</ul>

<strong>API</strong></br>
<a href="https://api.nasa.gov/#apod" target="_blank">A pagina consome a API publica da NASA disponibilizada em https://api.nasa.gov/#apod</a><b/>
<p>A documentação completa para esta API pode ser encontrada no <a href="https://github.com/nasa/apod-api" target="_blank">repositório APOD API Github.</a></p></br>
<strong>Requicisão http basica</strong><br/>
<code>GET https://api.nasa.gov/planetary/apod</code><br>
<strong>Parâmetros de consulta</strong>
<table>
    <thead>
        <tr>
            <th>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">Parâmetro</font>
                </font>
            </th>
            <th>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">Modelo</font>
                </font>
            </th>
            <th>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">Padrão</font>
                </font>
            </th>
            <th>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">Descrição</font>
                </font>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">date</font>
                </font>
            </td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">AAAA-MM-DD</font>
                </font>
            </td>
            <td>
                <em>
                    <font style="vertical-align: inherit;">
                        <font style="vertical-align: inherit;">hoje</font>
                    </font>
                </em>
            </td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">A data da imagem APOD a recuperar</font>
                </font>
            </td>
        </tr>
        <tr>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">start_date</font>
                </font>
            </td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">AAAA-MM-DD</font>
                </font>
            </td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">Nenhum</font>
                </font>
            </td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">O início de um intervalo de datas, ao solicitar data para um
                        intervalo de datas.</font>
                    <font style="vertical-align: inherit;">Não pode ser usado com </font>
                </font>
                <code class="prettyprint">date</code>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">.</font>
                </font>
            </td>
        </tr>
        <tr>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">end_date</font>
                </font>
            </td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">AAAA-MM-DD</font>
                </font>
            </td>
            <td><em>
                    <font style="vertical-align: inherit;">
                        <font style="vertical-align: inherit;">hoje</font>
                    </font>
                </em></td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">O final do intervalo de datas, quando usado com </font>
                </font><code class="prettyprint">start_date</code>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">.</font>
                </font>
            </td>
        </tr>
        <tr>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">count</font>
                </font>
            </td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">int</font>
                </font>
            </td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">Nenhum</font>
                </font>
            </td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">Se isso for especificado, </font>
                </font><code class="prettyprint">count</code>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">as imagens escolhidas aleatoriamente serão retornadas.
                    </font>
                    <font style="vertical-align: inherit;">Não pode ser usado com </font>
                </font><code class="prettyprint">date</code>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">ou </font>
                </font><code class="prettyprint">start_date</code>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">e </font>
                </font><code class="prettyprint">end_date</code>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">.</font>
                </font>
            </td>
        </tr>
        <tr>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">thumbs</font>
                </font>
            </td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">bool</font>
                </font>
            </td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">Falso</font>
                </font>
            </td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">Retorna o URL da miniatura do vídeo. </font>
                    <font style="vertical-align: inherit;">Se um APOD não for um vídeo, este parâmetro será ignorado.
                    </font>
                </font>
            </td>
        </tr>
        <tr>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">api_key</font>
                </font>
            </td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">string</font>
                </font>
            </td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">DEMO_KEY</font>
                </font>
            </td>
            <td>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">chave api.nasa.gov para uso expandido</font>
                </font>
            </td>
        </tr>
    </tbody>
</table>
