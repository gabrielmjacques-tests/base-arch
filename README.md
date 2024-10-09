# Tutorial de instalação do Servidor de IA na Base Arch

*Disponível publicamente apenas pelo período de testes da API*

Esta API tem objetivo de gerar descrições de imagens a partir do uso de **Inteligência Artificial**.
No momento, ela possui duas rotas:
* ```/api/describe-image``` - **GET** - Rota com uma interface simples apenas para propósito de testes de funcionamento da API;
* ```/api/describe-image``` - **POST** - Rota que recebe uma imagem e retorna a descrição da imagem (Atualmente, utilizando o Gemini).

## Download dos Arquivos Necessários

### Alternativa 1 (Recomendado): Download via Terminal
1. Abra um terminal e execute o comando abaixo para clonar o repositório:
```bash
wget https://github.com/gabrielmjacques-tests/base-arch/raw/main/basearch.zip
```

2. Extraia o arquivo **basearch.zip**:
```bash
unzip basearch.zip
```

### Alternativa 2: Download via Navegador
Todos os arquivos podem ser encontrados no [GitHub](https://github.com/gabrielmjacques-tests/base-arch) em **.zip** e passados via WinSCP para o servidor.




## Substituição do Plugin da Base Arch
É necessário que todas as operações a partir de agora sejam feitas como **root**.
```bash
sudo su
```

1. Em um terminal, remova o antigo template da Base Arch:
```bash
rm -rf /usr/share/nginx/atom/plugins/arBaseArchPlugin
```

2. Mova o novo template para a pasta de plugins do AtoM:
```bash
mv arBaseArchPlugin /usr/share/nginx/atom/plugins
```

3. Execute o script de limpeza do cache do AtoM:
```bash
cd /usr/share/nginx/atom
./refresh.sh
```

4. Volte para o diretório anterior (diretório onde baixou os arquivos):
```bash
cd -
```



## Instalação e Configuração do Servidor Node

### Instalar o NVM (Node Version Manager)
O NVM é um gerenciador de versões do NodeJS, que permite instalar e alternar entre diferentes versões do NodeJS

1. Execute os comandos abaixo para instalar o NVM:
```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
```

2. Verifique se o NVM foi instalado corretamente (deverá aparecer a versão do NVM):
```bash
nvm --version
```

### Instale o NodeJS
O NodeJS é uma plataforma que permite executar JavaScript no lado do servidor.

1. Ainda no terminal, execute o comando abaixo para instalar a versão 22.8.0 do NodeJS:
```bash
nvm install 22.8.0
```
2. Verifique se o NodeJS foi instalado corretamente (deverá aparecer a versão do NodeJS):
```bash
node -v
```

3. Verifique se, junto do NodeJS, o NPM (Node Package Manager) foi instalado corretamente (deve aparecer a versão do NPM):
```bash
npm -v
```

### Configuração do Servidor NodeJS
1. Mova a pasta da API para o diretório do AtoM:
```bash
mv ia_server /usr/share/nginx/atom
```

2. Entre na pasta da API:
```bash
cd /usr/share/nginx/atom/ia_server
```

3. Abra o arquivo de configuração `.env` e adicione sua chave de API no campo `GOOGLE_API_KEY`: 
```bash
nano .env
```
**Nota:** A chave de API do Google é necessária para o funcionamento da API de descrição de imagens. Para obter uma chave de API, acesse o site [Google AI Studio](https://aistudio.google.com/app/apikey)

4. Instale as dependências do servidor NodeJS:
```bash
npm install
```

5. A fim de garantir que este servidor continue sendo executado em segundo plano, é necessário a instalação da biblioteca PM2 (Process Manager 2) globalmente:
```bash
npm install pm2 -g
```

6. Inicie o servidor NodeJS com o PM2 (deverá aparecer o estado do processo)
```bash
pm2 start src/index.js --name base_arch_IA --watch
```
**Nota:** As opções `--name base_arch_IA` e `--watch` são opcionais. A primeira define o nome do processo e a segunda faz com que o PM2 reinicie o processo caso haja alguma alteração no código.



## Configuração do NGINX
Para que o servidor NodeJS seja acessível através de um domínio, é necessário configurar o NGINX para fazer o proxy reverso.

1. Abra o arquivo de configuração do NGINX:
```bash
nano /etc/nginx/sites-available/atom
```

2. Adicione o seguinte bloco de configuração dentro do bloco `server`:
```nginx
location /api/ {
    proxy_pass http://localhost:3000;  # Porta onde sua API está rodando
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

3. Reinicie o servidor do NGINX:
```bash
sudo systemctl restart nginx
```

## Teste da API
* Para testar a API, acesse um objeto digital no AtoM e clique no botão logo abaixo da imagem principal.

* Caso queira testar a API diretamente, acesse a rota ```/api/describe-image``` via navegador, que possui uma interface simples **apenas** para testes.
