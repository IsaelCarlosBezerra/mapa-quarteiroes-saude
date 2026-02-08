# Mapa do Desenvolvimento – Aplicação de Mapa de Quarteirões (Saúde em Campo)

**Objetivo:**Este documento serve como um guia vivo e central para o projeto, visando evitar desalinhamentos durante o desenvolvimento. Ele descreve o esqueleto do monorepo, a arquitetura limpa, a linguagem ubíqua (em português), os fluxos principais, as responsabilidades por camada, os contratos, as decisões arquiteturais e os checklists, garantindo que todos os envolvidos tenham uma compreensão clara e unificada da aplicação.

---

## 1. Visão Geral do Produto e Contexto de Uso

A aplicação "Mapa de Quarteirões (Saúde em Campo)" é uma ferramenta web interativa projetada para auxiliar **profissionais da saúde que trabalham em campo**. Seu propósito principal é fornecer uma visualização clara e detalhada de áreas geográficas divididas em quarteirões, permitindo que esses profissionais carreguem dados GeoJSON para montar seus mapas de trabalho.

**Contexto de Uso:**Profissionais da saúde, como agentes comunitários, enfermeiros ou equipes de vigilância epidemiológica, necessitam de informações georreferenciadas para planejar rotas de visita, identificar áreas de risco, organizar campanhas de vacinação ou monitorar a saúde da população em territórios específicos. A aplicação permitirá que eles visualizem os limites dos quarteirões, acessem informações relevantes sobre cada um e gerem rotas de navegação diretamente para o local de interesse, otimizando seu tempo e a eficácia de suas ações em campo.

---

## 2. Escopo do MVP (Produto Mínimo Viável) e Fora de Escopo

### 2.1. Escopo do MVP

• **Carregamento de GeoJSON:**Permitir que o usuário selecione e carregue um arquivo GeoJSON localmente.
• **Visualização do Mapa:**Renderizar um mapa interativo exibindo os polígonos dos quarteirões definidos no GeoJSON.
• **Interação com Polígonos:**Ao clicar em um polígono de quarteirão, exibir um painel lateral ou modal com suas informações detalhadas.
• **Informações do Quarteirão:**Apresentar dados extraídos das propriedades do GeoJSON (ex: nome, código, população, etc.).
• **Geração de Rota:**Opção de abrir o Google Maps com uma rota pré-definida.
• **Origem da Rota:**Localização atual do usuário (obtida via geolocalização do navegador).
• **Destino da Rota:**O **Centro Ideal do Quarteirão**clicado.
• **Origem da Rota:**Localização atual do usuário (obtida via geolocalização do navegador).
• **Destino da Rota:**O **Centro Ideal do Quarteirão**clicado.

### 2.2. Fora de Escopo (Anti-Escopo) para o MVP

• **Persistência de Dados:**Não haverá armazenamento de GeoJSONs ou informações de quarteirões em banco de dados. Os dados são efêmeros, carregados a cada sessão.
• **Autenticação e Autorização:**Não haverá sistema de login ou controle de acesso.
• **Edição de GeoJSON:**Não será possível editar os polígonos ou suas propriedades na aplicação.
• **Múltiplas Camadas/Filtros Avançados:**Apenas uma camada de quarteirões será exibida por vez.
• **Relatórios ou Análises Complexas:**Não haverá funcionalidades de geração de relatórios ou análises espaciais avançadas.
• **Integração com Outros Sistemas:**Não haverá integração com sistemas de saúde externos.

---

## 3. Linguagem Ubíqua (Glossário)

A seguir, o glossário de termos em português que devem ser utilizados de forma consistente em todo o projeto (código, documentação, comunicação):

• **Quarteirão:**Uma área geográfica delimitada por um polígono, representando uma unidade territorial de interesse para o trabalho em campo. É a entidade central do domínio.
• **Polígono do Quarteirão:**A representação geométrica (conjunto de coordenadas) que define os limites de um Quarteirão no mapa.
• **Centro Ideal do Quarteirão:**Um ponto de coordenada (Latitude, Longitude) que representa o local mais adequado para ser o destino de uma rota dentro de um Quarteirão. Deve ser um ponto interno ao polígono.
• **Mapa:**A representação visual da área geográfica onde os Polígonos dos Quarteirões são exibidos.
• **Camada:**Um conjunto de elementos geográficos (neste caso, os Polígonos dos Quarteirões) exibidos sobre o Mapa.
• **Profissional de Saúde:**O usuário final da aplicação, que utiliza o Mapa de Quarteirões para seu trabalho em campo.
• **Trabalho em Campo:**As atividades realizadas pelos Profissionais de Saúde fora de um ambiente fixo, utilizando a aplicação como ferramenta de apoio.
• **Rota:**O caminho sugerido para ir de um ponto de Origem a um ponto de Destino, geralmente visualizado em um serviço de mapas (ex: Google Maps).
• **Origem do Usuário:**A localização geográfica atual do Profissional de Saúde, obtida via geolocalização do navegador.
• **Destino:**O ponto final de uma Rota, que neste contexto é o Centro Ideal do Quarteirão.
• **GeoJSON:**Um formato padrão aberto baseado em JSON para representar características geográficas simples, juntamente com seus atributos não espaciais. É a fonte de dados para os Quarteirões.
• **Feature (GeoJSON):**Um objeto GeoJSON que representa uma entidade espacial, como um ponto, linha ou polígono, e suas propriedades. No nosso contexto, cada Feature representa um Quarteirão.
• **Propriedades (GeoJSON):**Um objeto JSON contido em uma Feature GeoJSON que armazena atributos não espaciais (ex: nome, id, população) associados à geometria.
• **Validação:**O processo de verificar se um dado (ex: GeoJSON, coordenadas) está em um formato correto e atende às regras de negócio e de integridade.

---

## 4. Requisitos Funcionais e Não Funcionais

### 4.1. Requisitos Funcionais

• RF001: O sistema deve permitir ao usuário selecionar um arquivo GeoJSON localmente.
• RF002: O sistema deve carregar e validar o conteúdo do arquivo GeoJSON.
• RF003: O sistema deve exibir um mapa interativo com os polígonos dos quarteirões definidos no GeoJSON.
• RF004: O sistema deve permitir que o usuário clique em um polígono de quarteirão no mapa.
• RF005: Ao clicar em um polígono, o sistema deve exibir um painel/modal com as informações detalhadas do Quarteirão (extraídas das propriedades do GeoJSON).
• RF006: O sistema deve apresentar uma opção para "Abrir Rota no Google Maps" no painel de detalhes do Quarteirão.
• RF007: Ao acionar a opção de rota, o sistema deve obter a localização atual do usuário (Origem do Usuário).
• RF008: O sistema deve calcular o Centro Ideal do Quarteirão clicado (Destino).
• RF009: O sistema deve gerar uma URL do Google Maps com a Origem do Usuário e o Destino (Centro Ideal do Quarteirão).
• RF010: O sistema deve abrir a URL gerada em uma nova aba/janela do navegador.

### 4.2. Requisitos Não Funcionais

• RNF001 (Performance): O mapa e os polígonos devem carregar de forma responsiva, mesmo com arquivos GeoJSON de tamanho moderado (ex: até 1000 polígonos).
• RNF002 (Usabilidade): A interface deve ser intuitiva e fácil de usar para profissionais da saúde, com foco na clareza e acessibilidade das informações.
• RNF003 (Segurança): A obtenção da localização do usuário deve respeitar as permissões do navegador e a privacidade do usuário.
• RNF004 (Manutenibilidade): O código deve ser bem estruturado, testável e fácil de manter, seguindo os princípios de Clean Architecture e SOLID.
• RNF005 (Confiabilidade): A validação do GeoJSON e o cálculo do Centro Ideal devem ser robustos para lidar com diferentes formatos e geometrias.
• RNF006 (Compatibilidade): A aplicação deve ser compatível com os navegadores modernos (Chrome, Firefox, Edge, Safari).
• RNF007 (Linguagem): Toda a interface e mensagens de erro devem estar em português (pt-BR).

---

## 5. Arquitetura e Princípios

A aplicação será construída seguindo os princípios da **Clean Architecture**, **SOLID**e **Ports & Adapters (Arquitetura Hexagonal)**, com foco na separação de preocupações e na independência do domínio em relação a detalhes de infraestrutura e frameworks.

• **Clean Architecture:**Organiza o código em camadas concêntricas, onde as dependências fluem de fora para dentro. O Core (domínio e casos de uso) é a camada mais interna e não deve ter conhecimento das camadas externas (UI, Banco de Dados, APIs).
• **SOLID:**Princípios de design de software que promovem código mais compreensível, flexível e manutenível. Serão aplicados especialmente no Core para garantir a robustez das entidades e casos de uso.
• **Ports & Adapters (Hexagonal):**O Core define "ports" (interfaces) que representam as interações necessárias com o mundo externo (ex: obter localização do usuário, renderizar mapa). As camadas externas (Frontend, Backend) implementam "adapters" que concretizam essas interfaces, invertendo a dependência e permitindo que o Core permaneça agnóstico a tecnologias específicas.

**Aplicação Prática no Core:**O pacote `core`será o coração da aplicação, contendo a lógica de negócio pura. Ele não terá dependências de bibliotecas de UI (React, Next.js), de servidor (NestJS), de banco de dados, ou de APIs de mapa (Leaflet, Google Maps API). Em vez disso, ele definirá interfaces (ports) para essas interações. Por exemplo, o Core não saberá como "renderizar um mapa", mas saberá que precisa de um `IMapaRenderizadorPort`para que o Frontend possa exibir os `PoligonosDoQuarteirao`.

---

## 6. Estrutura do Monorepo

O projeto será organizado como um monorepo, utilizando o `npm`ou `yarn`workspaces para gerenciar os pacotes.

```
`/
├── packages/
│   ├── core/
│   │   ├── src/
│   │   │   ├── domain/        # Entidades, Value Objects, Agregados, Repositórios (interfaces)
│   │   │   ├── application/   # Casos de Uso (Use Cases)
│   │   │   ├── infra/         # Ports (interfaces)
│   │   │   └── index.ts       # Exporta o Core
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── backend/
│   │   ├── src/
│   │   │   ├── infra/         # Adapters (implementações das Ports do Core), Controllers, Services
│   │   │   └── main.ts        # Ponto de entrada da aplicação NestJS
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── frontend/
│       ├── src/
│       │   ├── components/    # Componentes React
│       │   ├── pages/         # Páginas Next.js
│       │   ├── hooks/
│       │   ├── infra/         # Adapters (implementações das Ports do Core), Serviços de UI
│       │   └── styles/
│       │   └── types/         # Tipos específicos do frontend
│       ├── public/
│       ├── package.json
│       └── tsconfig.json
├── package.json               # Monorepo root
├── tsconfig.json              # Configuração TypeScript base
└── README.md`
```

### 6.1. Pacotes e Responsabilidades

• **`core/`**:
• **Responsabilidade:**Contém toda a lógica de negócio, entidades, Value Objects, casos de uso e interfaces (ports). É a camada mais interna e agnóstica a frameworks.
• **Tecnologia:**TypeScript puro (Node.js runtime).
• **Dependências:**Nenhuma dependência externa de frameworks ou infraestrutura.
• **Responsabilidade:**Contém toda a lógica de negócio, entidades, Value Objects, casos de uso e interfaces (ports). É a camada mais interna e agnóstica a frameworks.
• **Tecnologia:**TypeScript puro (Node.js runtime).
• **Dependências:**Nenhuma dependência externa de frameworks ou infraestrutura.
• **`backend/`**:
• **Responsabilidade:**Fornece uma API REST (se necessário) ou serve como um processador de dados. No MVP, pode ser mínimo ou inexistente, dependendo da necessidade de processamento server-side do GeoJSON.
• **Tecnologia:**NestJS.
• **Dependências:**Pode depender de `core/`.
• **Responsabilidade:**Fornece uma API REST (se necessário) ou serve como um processador de dados. No MVP, pode ser mínimo ou inexistente, dependendo da necessidade de processamento server-side do GeoJSON.
• **Tecnologia:**NestJS.
• **Dependências:**Pode depender de `core/`.
• **`frontend/`**:
• **Responsabilidade:**Interface do usuário, renderização do mapa, interação do usuário, obtenção de geolocalização.
• **Tecnologia:**Next.js (React).
• **Dependências:**Pode depender de `core/`.
• **Responsabilidade:**Interface do usuário, renderização do mapa, interação do usuário, obtenção de geolocalização.
• **Tecnologia:**Next.js (React).
• **Dependências:**Pode depender de `core/`.

### 6.2. Convenções de Import

• Imports internos do monorepo devem usar aliases para clareza: • `import { Quarteirao } from '@app/core/domain/entities/quarteirao';`
• `import { CarregarGeoJsonUseCase } from '@app/core/application/use-cases/carregar-geojson';`
• `import { GeoJsonParserAdapter } from '@app/backend/infra/adapters/geojson-parser-adapter';`
• `import { MapaComponent } from '@app/frontend/components/mapa';`
• `import { Quarteirao } from '@app/core/domain/entities/quarteirao';`
• `import { CarregarGeoJsonUseCase } from '@app/core/application/use-cases/carregar-geojson';`
• `import { GeoJsonParserAdapter } from '@app/backend/infra/adapters/geojson-parser-adapter';`
• `import { MapaComponent } from '@app/frontend/components/mapa';`

### 6.3. Regras de Dependência

• `frontend`**PODE**depender de `core`.
• `backend`**PODE**depender de `core`.
• `core`**NÃO PODE**depender de `frontend`ou `backend`.
• `frontend`**NÃO PODE**depender de `backend`(diretamente, apenas via API HTTP se houver).
• `backend`**NÃO PODE**depender de `frontend`.

---

## 7. Design do Core (Framework-Agnostic)

O pacote `core`é a camada mais importante, garantindo a independência da lógica de negócio.

### 7.1. Entidades e Agregados

• **`Quarteirao`(Agregado Raiz):**Representa a unidade de negócio principal.

```
`// packages/core/src/domain/entities/quarteirao.ts
import { IdQuarteirao } from '../value-objects/id-quarteirao';
import { Poligono } from '../value-objects/poligono';
import { PropriedadesQuarteirao } from '../value-objects/propriedades-quarteirao';
import { CentroIdeal } from '../value-objects/centro-ideal';

export class Quarteirao {
  public readonly id: IdQuarteirao;<br/>
  public readonly poligono: Poligono;<br/>
  public readonly propriedades: PropriedadesQuarteirao;<br/>
  private _centroIdeal?: CentroIdeal; // Calculado sob demanda ou via serviço

  private constructor(id: IdQuarteirao, poligono: Poligono, propriedades: PropriedadesQuarteirao) {
    this.id = id;
    this.poligono = poligono;
    this.propriedades = propriedades;
    // Validações de invariantes aqui
  }

  static criar(id: string, coordenadas: number[][][], props: Record<string, any>): Quarteirao {
    const idQuarteirao = IdQuarteirao.criar(id);
    const poligono = Poligono.criar(coordenadas);
    const propriedades = PropriedadesQuarteirao.criar(props);
    return new Quarteirao(idQuarteirao, poligono, propriedades);
  }

  public get centroIdeal(): CentroIdeal | undefined {
    return this._centroIdeal;
  }

  public definirCentroIdeal(centro: CentroIdeal): void {
    this._centroIdeal = centro;
  }

  // Métodos de domínio (ex: calcularArea(), estaDentroDoQuarteirao(ponto))
}`
```

### 7.2. Value Objects

• **`IdQuarteirao`:**Identificador único e imutável de um Quarteirão.

```
`// packages/core/src/domain/value-objects/id-quarteirao.ts
export class IdQuarteirao {
  private constructor(public readonly valor: string) {
    if (!valor || valor.trim() === '') {
      throw new Error('ID do Quarteirão não pode ser vazio.');
    }
  }
  static criar(valor: string): IdQuarteirao { return new IdQuarteirao(valor); }<br/>
  equals(other: IdQuarteirao): boolean { return this.valor === other.valor; }
}`
```

• **`Coordenadas`:**Representa um par Latitude/Longitude.

```
`// packages/core/src/domain/value-objects/coordenadas.ts
export class Coordenadas {
  private constructor(public readonly latitude: number, public readonly longitude: number) {
      throw new Error('Coordenadas inválidas.');
    }
  }
  static criar(latitude: number, longitude: number): Coordenadas { return new Coordenadas(latitude, longitude); }<br/>
  toString(): string { return `${this.latitude},${this.longitude}`; }<br/>
  equals(other: Coordenadas): boolean { return this.latitude === other.latitude && this.longitude === other.longitude; }
}`
```

• **`Poligono`:**Encapsula a geometria de um polígono (array de coordenadas).
• **`PropriedadesQuarteirao`:**Encapsula as propriedades não espaciais de um Quarteirão.
• **`CentroIdeal`:**Um `Coordenadas`específico para o centro ideal.
• **`UrlRotaGoogleMaps`:**Encapsula a URL completa para a rota no Google Maps.
• **`GeoJsonFeature`:**Representação de uma Feature GeoJSON bruta, antes de ser mapeada para `Quarteirao`.

### 7.3. Casos de Uso (Application Services)

• **`CarregarGeoJson`:**

```
`// packages/core/src/application/use-cases/carregar-geojson.ts
import { IGeoJsonParserPort } from '../../infra/ports/geojson-parser-port';
import { Quarteirao } from '../../domain/entities/quarteirao';
import { ICalculadorCentroIdealPort } from '../../infra/ports/calculador-centro-ideal-port';

export class CarregarGeoJson {
  constructor(
    private readonly geoJsonParser: IGeoJsonParserPort,<br/>
    private readonly calculadorCentroIdeal: ICalculadorCentroIdealPort
  ) {}

  async executar(conteudoGeoJson: string): Promise<Quarteirao[]> {
    const features = this.geoJsonParser.parse(conteudoGeoJson);
    const quarteiroes: Quarteirao[] = [];
    for (const feature of features) {
      const quarteirao = Quarteirao.criar(
        feature.properties.id || feature.id, // Exemplo de como obter ID
        feature.geometry.coordinates,
        feature.properties
      );
      const centro = await this.calculadorCentroIdeal.calcular(quarteirao.poligono);
      quarteirao.definirCentroIdeal(centro);
      quarteiroes.push(quarteirao);
    }
    return quarteiroes;
  }
}`
```

• **`ListarQuarteiroes`:**Retorna todos os quarteirões carregados (pode ser um simples getter de um repositório em memória).
• **`ObterDetalhesDoQuarteirao`:**Retorna um `Quarteirao`específico pelo seu `IdQuarteirao`.
• **`GerarUrlDeRotaNoGoogleMaps`:**

```
`// packages/core/src/application/use-cases/gerar-url-rota-google-maps.ts
import { IdQuarteirao } from '../../domain/value-objects/id-quarteirao';
import { Coordenadas } from '../../domain/value-objects/coordenadas';
import { UrlRotaGoogleMaps } from '../../domain/value-objects/url-rota-google-maps';
import { IQuarteiraoRepository } from '../../domain/repositories/quarteirao-repository';

export class GerarUrlDeRotaNoGoogleMaps {
  constructor(private readonly quarteiraoRepository: IQuarteiraoRepository) {}

  async executar(idQuarteirao: IdQuarteirao, origemUsuario: Coordenadas): Promise<UrlRotaGoogleMaps> {
    const quarteirao = await this.quarteiraoRepository.buscarPorId(idQuarteirao);
    if (!quarteirao || !quarteirao.centroIdeal) {
      throw new Error('Quarteirão ou centro ideal não encontrado.');
    }
    return UrlRotaGoogleMaps.criar(origemUsuario, quarteirao.centroIdeal);
  }
}`
```

### 7.4. Ports/Interfaces Necessárias

• **`IGeoJsonParserPort`:**Interface para parsing e validação de GeoJSON.

```
`// packages/core/src/infra/ports/geojson-parser-port.ts
import { GeoJsonFeature } from '../../domain/value-objects/geojson-feature';
export interface IGeoJsonParserPort {
  parse(conteudo: string): GeoJsonFeature[];
}`
```

• **`ICalculadorCentroIdealPort`:**Interface para calcular o centro ideal de um polígono.

```
`// packages/core/src/infra/ports/calculador-centro-ideal-port.ts
import { Poligono } from '../../domain/value-objects/poligono';
import { CentroIdeal } from '../../domain/value-objects/centro-ideal';
export interface ICalculadorCentroIdealPort {
  calcular(poligono: Poligono): Promise<CentroIdeal>;
}`
```

• **`IQuarteiraoRepository`:**Interface para acesso a dados de Quarteirões (no MVP, pode ser um repositório em memória).

```
`// packages/core/src/domain/repositories/quarteirao-repository.ts
import { Quarteirao } from '../entities/quarteirao';
import { IdQuarteirao } from '../value-objects/id-quarteirao';
export interface IQuarteiraoRepository {
  salvar(quarteiroes: Quarteirao[]): Promise<void>;<br/>
  buscarTodos(): Promise<Quarteirao[]>;<br/>
  buscarPorId(id: IdQuarteirao): Promise<Quarteirao | undefined>;
}`
```

• **`ILocalizacaoUsuarioPort`(Frontend Adapter):**Interface para obter a localização do usuário.
• **`IMapaRenderizadorPort`(Frontend Adapter):**Interface para renderizar polígonos no mapa.

### 7.5. Regras e Invariantes

• **Validação de GeoJSON:**O GeoJSON deve ser válido (formato JSON, tipos de geometria suportados, coordenadas válidas).
• **Validação de Polígonos:**Polígonos devem ser fechados, não auto-intersectantes (se possível), e ter um número mínimo de vértices.
• **Invariantes de Value Objects:**`IdQuarteirao`não pode ser vazio, `Coordenadas`devem estar dentro dos limites geográficos.
• **Invariantes de Entidades:**Um `Quarteirao`deve sempre ter um `IdQuarteirao`e um `Poligono`válido.

---

## 8. Backend (NestJS)

No contexto do MVP, o backend em NestJS terá responsabilidades mínimas, atuando principalmente como um servidor para o frontend e, opcionalmente, para processamento de GeoJSON mais complexo se o frontend não for adequado.

### 8.1. Responsabilidades Mínimas no MVP

• **Servir o Frontend:**O NestJS pode servir os arquivos estáticos do Next.js (após o build) ou atuar como um proxy reverso.
• **Processamento de GeoJSON (Opcional):**Se o arquivo GeoJSON for muito grande ou exigir validações complexas que seriam pesadas para o navegador, o backend pode expor um endpoint para receber o arquivo, processá-lo usando o `core`, e retornar os dados já estruturados para o frontend.

### 8.2. Contratos de API Sugeridos (Opcionais)

• **`POST /api/geojson/processar`:**
• **Entrada:**`multipart/form-data`com o arquivo GeoJSON.
• **Saída:**`200 OK`com `Quarteirao[]`(serializado) ou `400 Bad Request`com erros de validação.
• **Uso do Core:**O controller injetaria o `CarregarGeoJson`do Core e um adapter para `IGeoJsonParserPort`(ex: `GeoJsonParserLibAdapter`usando uma biblioteca Node.js).
• **Entrada:**`multipart/form-data`com o arquivo GeoJSON.
• **Saída:**`200 OK`com `Quarteirao[]`(serializado) ou `400 Bad Request`com erros de validação.
• **Uso do Core:**O controller injetaria o `CarregarGeoJson`do Core e um adapter para `IGeoJsonParserPort`(ex: `GeoJsonParserLibAdapter`usando uma biblioteca Node.js).

### 8.3. Como o Backend Utiliza o Core

• O backend injetará os Casos de Uso do Core em seus `Services`ou `Controllers`.
• Implementará os `Adapters`para as `Ports`do Core que necessitem de infraestrutura de servidor (ex: um `GeoJsonParserNodeAdapter`que usa uma biblioteca de parsing GeoJSON para Node.js).

### 8.4. Caminho para Evolução

• **Persistência:**Adicionar módulos de banco de dados (TypeORM, Prisma) e implementar `IQuarteiraoRepository`para salvar e recuperar `Quarteirao`s.
• **Autenticação/Autorização:**Implementar estratégias de autenticação (JWT, OAuth) e guardas de rota.
• **Integração:**Conectar-se a outros sistemas via APIs.

---

## 9. Frontend (Next.js)

O frontend será a interface principal do usuário, responsável pela interação, visualização e obtenção de dados do navegador.

### 9.1. Páginas/Telas Principais

• **`/`(Página Inicial/Mapa):** • Componente de upload de arquivo GeoJSON.
• Componente de mapa (ex: Leaflet, Mapbox GL JS) que renderiza os `PoligonosDoQuarteirao`.
• Painel lateral ou modal para exibir `DetalhesDoQuarteirao`(visível ao clicar em um polígono).
• Componente de upload de arquivo GeoJSON.
• Componente de mapa (ex: Leaflet, Mapbox GL JS) que renderiza os `PoligonosDoQuarteirao`.
• Painel lateral ou modal para exibir `DetalhesDoQuarteirao`(visível ao clicar em um polígono).

### 9.2. Estado/Fluxos de UI

• **Estado Global:**Gerenciar o `GeoJSON`carregado, a lista de `Quarteirao`s, o `Quarteirao`atualmente selecionado.
• **Fluxo de Upload:** 1. Usuário seleciona arquivo. 2. Leitura do arquivo (FileReader). 3. Chamada ao `CarregarGeoJson`do Core. 4. Atualização do estado com os `Quarteirao`s resultantes. 5. Renderização no mapa.
• Usuário seleciona arquivo.
• Leitura do arquivo (FileReader).
• Chamada ao `CarregarGeoJson`do Core.
• Atualização do estado com os `Quarteirao`s resultantes.
• Renderização no mapa.

### 9.3. Integração com Core

• O frontend injetará os Casos de Uso do Core em seus componentes ou hooks.
• Implementará os `Adapters`para as `Ports`do Core que necessitem de infraestrutura de navegador (ex: `LocalizacaoUsuarioBrowserAdapter`para `ILocalizacaoUsuarioPort`, `MapaRenderizadorLeafletAdapter`para `IMapaRenderizadorPort`).

### 9.4. Upload e Parsing do GeoJSON

• Utilizar `FileReader`para ler o conteúdo do arquivo GeoJSON.
• Passar o conteúdo para o `CarregarGeoJson`do Core.

### 9.5. Interação de Clique e Abertura do Painel de Detalhes

• O componente de mapa terá um `event listener`para cliques em polígonos.
• Ao clicar, o `IdQuarteirao`será extraído e passado para o `ObterDetalhesDoQuarteirao`do Core.
• O resultado será usado para popular o painel de detalhes.

### 9.6. Obtenção de Geolocalização do Usuário

• Utilizar a API `navigator.geolocation.getCurrentPosition()`do navegador.
• Essa lógica será encapsulada em um `LocalizacaoUsuarioBrowserAdapter`que implementa `ILocalizacaoUsuarioPort`.

---

## 10. Fluxos (Diagramas Textuais)

### 10.1. Fluxo A: Importar GeoJSON e Renderizar Mapa

1. **Usuário:**Clica no botão "Carregar GeoJSON" na interface.
2. **Frontend (UI):**Abre o seletor de arquivos do sistema operacional.
3. **Usuário:**Seleciona um arquivo `.geojson`e confirma.
4. **Frontend (UI):**Lê o conteúdo do arquivo GeoJSON usando `FileReader`.
5. **Frontend (Adapter):**Instancia e chama o `CarregarGeoJson`(do Core), passando o conteúdo do arquivo.
   • _Internamente no Core:_ • `CarregarGeoJson`usa `IGeoJsonParserPort`(implementado pelo Frontend Adapter) para fazer o parse e validação inicial do GeoJSON.
   • Para cada `Feature`válida, cria um `Quarteirao`.
   • Para cada `Quarteirao`, usa `ICalculadorCentroIdealPort`(implementado pelo Frontend Adapter) para calcular o `CentroIdealDoQuarteirao`.
   • Define o `CentroIdeal`no `Quarteirao`.
   • Retorna uma lista de `Quarteirao`s.
   • `CarregarGeoJson`usa `IGeoJsonParserPort`(implementado pelo Frontend Adapter) para fazer o parse e validação inicial do GeoJSON.
   • Para cada `Feature`válida, cria um `Quarteirao`.
   • Para cada `Quarteirao`, usa `ICalculadorCentroIdealPort`(implementado pelo Frontend Adapter) para calcular o `CentroIdealDoQuarteirao`.
   • Define o `CentroIdeal`no `Quarteirao`.
   • Retorna uma lista de `Quarteirao`s.
6. _Internamente no Core:_ • `CarregarGeoJson`usa `IGeoJsonParserPort`(implementado pelo Frontend Adapter) para fazer o parse e validação inicial do GeoJSON.
   • Para cada `Feature`válida, cria um `Quarteirao`.
   • Para cada `Quarteirao`, usa `ICalculadorCentroIdealPort`(implementado pelo Frontend Adapter) para calcular o `CentroIdealDoQuarteirao`.
   • Define o `CentroIdeal`no `Quarteirao`.
   • Retorna uma lista de `Quarteirao`s.
7. `CarregarGeoJson`usa `IGeoJsonParserPort`(implementado pelo Frontend Adapter) para fazer o parse e validação inicial do GeoJSON.
8. Para cada `Feature`válida, cria um `Quarteirao`.
9. Para cada `Quarteirao`, usa `ICalculadorCentroIdealPort`(implementado pelo Frontend Adapter) para calcular o `CentroIdealDoQuarteirao`.
10. Define o `CentroIdeal`no `Quarteirao`.
11. Retorna uma lista de `Quarteirao`s.
12. **Frontend (UI):**Recebe a lista de `Quarteirao`s do Core.
13. **Frontend (Adapter):**Usa `IMapaRenderizadorPort`(implementado pelo Frontend Adapter) para renderizar os `PoligonosDoQuarteirao`no componente de mapa.
14. **Usuário:**Visualiza o mapa com os quarteirões.

### 10.2. Fluxo B: Clicar no Quarteirão e Abrir Detalhes

1. **Usuário:**Clica em um `PoligonoDoQuarteirao`no mapa.
2. **Frontend (UI - Componente de Mapa):**Captura o evento de clique e identifica o `IdQuarteirao`do polígono clicado.
3. **Frontend (Adapter):**Instancia e chama o `ObterDetalhesDoQuarteirao`(do Core), passando o `IdQuarteirao`.
   • _Internamente no Core:_ • `ObterDetalhesDoQuarteirao`usa `IQuarteiraoRepository`(implementado pelo Frontend Adapter, em memória) para buscar o `Quarteirao`correspondente.
   • Retorna o `Quarteirao`completo.
   • `ObterDetalhesDoQuarteirao`usa `IQuarteiraoRepository`(implementado pelo Frontend Adapter, em memória) para buscar o `Quarteirao`correspondente.
   • Retorna o `Quarteirao`completo.
4. _Internamente no Core:_ • `ObterDetalhesDoQuarteirao`usa `IQuarteiraoRepository`(implementado pelo Frontend Adapter, em memória) para buscar o `Quarteirao`correspondente.
   • Retorna o `Quarteirao`completo.
5. `ObterDetalhesDoQuarteirao`usa `IQuarteiraoRepository`(implementado pelo Frontend Adapter, em memória) para buscar o `Quarteirao`correspondente.
6. Retorna o `Quarteirao`completo.
7. **Frontend (UI):**Recebe o `Quarteirao`e exibe suas `Propriedades`em um painel lateral ou modal.
8. **Usuário:**Visualiza as informações detalhadas do Quarteirão.

### 10.3. Fluxo C: Abrir Rota (Origem = Localização Atual do Usuário, Destino = Centro Ideal do Quarteirão)

1. **Usuário:**No painel de detalhes do Quarteirão, clica no botão "Abrir Rota no Google Maps".
2. **Frontend (UI):**Obtém o `IdQuarteirao`do quarteirão atualmente selecionado.
3. **Frontend (Adapter):**Instancia e chama `ILocalizacaoUsuarioPort`(implementado pelo Frontend Adapter) para obter a `Coordenadas`da `OrigemDoUsuario`.
   • *Navegador:*Solicita permissão de geolocalização ao usuário.
   • *Usuário:*Concede (ou nega) permissão.
4. *Navegador:*Solicita permissão de geolocalização ao usuário.
5. *Usuário:*Concede (ou nega) permissão.
6. **Frontend (Adapter):**Instancia e chama o `GerarUrlDeRotaNoGoogleMaps`(do Core), passando o `IdQuarteirao`e a `OrigemDoUsuario`.
   • _Internamente no Core:_ • `GerarUrlDeRotaNoGoogleMaps`usa `IQuarteiraoRepository`para buscar o `Quarteirao`e seu `CentroIdeal`.
   • Constrói a `UrlRotaGoogleMaps`usando a `OrigemDoUsuario`e o `CentroIdeal`.
   • Retorna a `UrlRotaGoogleMaps`.
   • `GerarUrlDeRotaNoGoogleMaps`usa `IQuarteiraoRepository`para buscar o `Quarteirao`e seu `CentroIdeal`.
   • Constrói a `UrlRotaGoogleMaps`usando a `OrigemDoUsuario`e o `CentroIdeal`.
   • Retorna a `UrlRotaGoogleMaps`.
7. _Internamente no Core:_ • `GerarUrlDeRotaNoGoogleMaps`usa `IQuarteiraoRepository`para buscar o `Quarteirao`e seu `CentroIdeal`.
   • Constrói a `UrlRotaGoogleMaps`usando a `OrigemDoUsuario`e o `CentroIdeal`.
   • Retorna a `UrlRotaGoogleMaps`.
8. `GerarUrlDeRotaNoGoogleMaps`usa `IQuarteiraoRepository`para buscar o `Quarteirao`e seu `CentroIdeal`.
9. Constrói a `UrlRotaGoogleMaps`usando a `OrigemDoUsuario`e o `CentroIdeal`.
10. Retorna a `UrlRotaGoogleMaps`.
11. **Frontend (UI):**Recebe a `UrlRotaGoogleMaps`do Core.
12. **Frontend (UI):**Abre uma nova aba/janela do navegador com a URL do Google Maps.
13. **Usuário:**Visualiza a rota no Google Maps.

---

## 11. Estratégia de Cálculo do "Centro Ideal"

O "Centro Ideal do Quarteirão" é crucial para a funcionalidade de rota. Existem algumas abordagens:

• **Centróide Geométrico Simples:**Calcula a média das coordenadas de todos os vértices do polígono.
• **Vantagens:**Simples de implementar.
• **Desvantagens:**Para polígonos côncavos ou complexos (em forma de "U" ou "L"), o centróide pode cair fora do polígono, o que é indesejável para uma rota "para o quarteirão".
• **Vantagens:**Simples de implementar.
• **Desvantagens:**Para polígonos côncavos ou complexos (em forma de "U" ou "L"), o centróide pode cair fora do polígono, o que é indesejável para uma rota "para o quarteirão".
• **Ponto Interno Representativo (Recomendado):**Calcula um ponto que garante estar dentro do polígono, mesmo para geometrias complexas. Isso pode envolver algoritmos mais avançados (ex: encontrar o "polo de inacessibilidade" ou um ponto no maior círculo inscrito).
• **Vantagens:**Garante que o destino da rota esteja sempre dentro do quarteirão, oferecendo uma experiência mais precisa e útil para o profissional em campo.
• **Desvantagens:**Mais complexo de implementar, pode exigir bibliotecas de geometria computacional.
• **Vantagens:**Garante que o destino da rota esteja sempre dentro do quarteirão, oferecendo uma experiência mais precisa e útil para o profissional em campo.
• **Desvantagens:**Mais complexo de implementar, pode exigir bibliotecas de geometria computacional.

**Recomendação:**Para o MVP, podemos começar com o **centróide geométrico simples**, mas com a consciência de que ele pode ser aprimorado para um **ponto interno representativo**em futuras iterações, caso a precisão se mostre um problema para polígonos complexos. A interface `ICalculadorCentroIdealPort`no Core permite essa substituição sem afetar o restante da aplicação.

**Implicações:**A escolha afeta a precisão da rota e a complexidade da implementação do adapter `ICalculadorCentroIdealPort`.

---

## 12. Checklist de Consistência (Anti-Desalinhamento)

Este checklist deve ser usado continuamente durante o desenvolvimento para garantir o alinhamento com a arquitetura e os princípios definidos.

• **Regras do Core:** • O pacote `core`não possui dependências de frameworks (Next.js, NestJS) ou bibliotecas de infraestrutura (APIs de mapa, bancos de dados, HTTP clients).
• Todas as interações do `core`com o mundo externo são feitas através de interfaces (Ports).
• O `core`contém apenas TypeScript puro e lógica de negócio.
• O pacote `core`não possui dependências de frameworks (Next.js, NestJS) ou bibliotecas de infraestrutura (APIs de mapa, bancos de dados, HTTP clients).
• Todas as interações do `core`com o mundo externo são feitas através de interfaces (Ports).
• O `core`contém apenas TypeScript puro e lógica de negócio.
• **Nomenclatura:** • Todas as classes, variáveis, métodos, componentes e endpoints estão em português, conforme o Glossário de Linguagem Ubíqua.
• A terminologia é consistente entre frontend, backend e core.
• Todas as classes, variáveis, métodos, componentes e endpoints estão em português, conforme o Glossário de Linguagem Ubíqua.
• A terminologia é consistente entre frontend, backend e core.
• **Onde colocar cada tipo de lógica:**
• **Regras de Negócio, Validações de Domínio, Entidades, Value Objects:**Exclusivamente no `core/domain`.
• **Orquestração de Regras de Negócio (Casos de Uso):**Exclusivamente no `core/application`.
• **Implementações de Interfaces (Adapters):**No `infra/`do `backend`ou `frontend`, dependendo da tecnologia.
• **Lógica de UI, Componentes, Gerenciamento de Estado de Tela:**Exclusivamente no `frontend`.
• **Controladores de API, Serviços de Backend:**Exclusivamente no `backend`.
• **Regras de Negócio, Validações de Domínio, Entidades, Value Objects:**Exclusivamente no `core/domain`.
• **Orquestração de Regras de Negócio (Casos de Uso):**Exclusivamente no `core/application`.
• **Implementações de Interfaces (Adapters):**No `infra/`do `backend`ou `frontend`, dependendo da tecnologia.
• **Lógica de UI, Componentes, Gerenciamento de Estado de Tela:**Exclusivamente no `frontend`.
• **Controladores de API, Serviços de Backend:**Exclusivamente no `backend`.
• **Testes Mínimos Esperados:**
• **Testes Unitários:**Obrigatórios para todas as Entidades, Value Objects e Casos de Uso no `core`. Devem cobrir validações e lógica de negócio.
• **Testes de Integração:**Para os Adapters (verificar se a integração com a tecnologia externa funciona).
• **Testes E2E:**Para os fluxos principais da aplicação (opcional para MVP, mas recomendado).
• **Testes Unitários:**Obrigatórios para todas as Entidades, Value Objects e Casos de Uso no `core`. Devem cobrir validações e lógica de negócio.
• **Testes de Integração:**Para os Adapters (verificar se a integração com a tecnologia externa funciona).
• **Testes E2E:**Para os fluxos principais da aplicação (opcional para MVP, mas recomendado).

---

## 13. Decisões Arquiteturais Registradas (ADR-lite)

Este é um registro inicial de decisões arquiteturais importantes. Novas decisões devem ser adicionadas aqui.

• **ADR-001: Uso de Monorepo**
• **Decisão:**Adotar uma estrutura de monorepo com `core`, `backend`e `frontend`como pacotes separados.
• **Justificativa:**Facilita o compartilhamento do `core`entre frontend e backend, promove a coesão do projeto, simplifica a gestão de dependências e o versionamento.
• **Decisão:**Adotar uma estrutura de monorepo com `core`, `backend`e `frontend`como pacotes separados.
• **Justificativa:**Facilita o compartilhamento do `core`entre frontend e backend, promove a coesão do projeto, simplifica a gestão de dependências e o versionamento.
• **ADR-002: Adoção de Clean Architecture e Ports & Adapters**
• **Decisão:**Implementar o `core`seguindo os princípios de Clean Architecture e Ports & Adapters.
• **Justificativa:**Garante a independência da lógica de negócio em relação a frameworks e infraestrutura, aumentando a testabilidade, manutenibilidade e a capacidade de evolução futura sem reescrever o domínio.
• **Decisão:**Implementar o `core`seguindo os princípios de Clean Architecture e Ports & Adapters.
• **Justificativa:**Garante a independência da lógica de negócio em relação a frameworks e infraestrutura, aumentando a testabilidade, manutenibilidade e a capacidade de evolução futura sem reescrever o domínio.
• **ADR-003: Linguagem Ubíqua em Português**
• **Decisão:**Utilizar o português (pt-BR) para todas as nomenclaturas de código, documentação e interface.
• **Justificativa:**Alinha o desenvolvimento com o domínio de negócio e a equipe de usuários (profissionais da saúde no Brasil), facilitando a comunicação e reduzindo a barreira de entrada para novos desenvolvedores.
• **Decisão:**Utilizar o português (pt-BR) para todas as nomenclaturas de código, documentação e interface.
• **Justificativa:**Alinha o desenvolvimento com o domínio de negócio e a equipe de usuários (profissionais da saúde no Brasil), facilitando a comunicação e reduzindo a barreira de entrada para novos desenvolvedores.
• **ADR-004: Cálculo do Centro Ideal do Quarteirão**
• **Decisão:**Inicialmente, usar o centróide geométrico simples para o cálculo do `CentroIdealDoQuarteirao`, com a ressalva de que pode ser aprimorado para um ponto interno representativo se necessário.
• **Justificativa:**Equilibra a simplicidade de implementação para o MVP com a necessidade de uma funcionalidade de rota, permitindo uma evolução futura sem quebrar o contrato do Core.
• **Decisão:**Inicialmente, usar o centróide geométrico simples para o cálculo do `CentroIdealDoQuarteirao`, com a ressalva de que pode ser aprimorado para um ponto interno representativo se necessário.
• **Justificativa:**Equilibra a simplicidade de implementação para o MVP com a necessidade de uma funcionalidade de rota, permitindo uma evolução futura sem quebrar o contrato do Core.
• **ADR-005: Obtenção da Localização do Usuário via Navegador**
• **Decisão:**A `OrigemDoUsuario`para a rota será obtida diretamente da API de geolocalização do navegador.
• **Justificativa:**Simplifica o MVP, evita a necessidade de um backend para geolocalização e atende ao requisito de "localização atual do usuário".
• **Decisão:**A `OrigemDoUsuario`para a rota será obtida diretamente da API de geolocalização do navegador.
• **Justificativa:**Simplifica o MVP, evita a necessidade de um backend para geolocalização e atende ao requisito de "localização atual do usuário".

---

## 14. Plano de Evolução (Pós-MVP)

Após a entrega do MVP, as seguintes funcionalidades e melhorias podem ser consideradas:

• **Persistência de GeoJSONs:**Permitir que os usuários salvem e carreguem GeoJSONs previamente utilizados, talvez associados a um perfil de usuário.
• **Autenticação e Autorização:**Implementar um sistema de login para gerenciar perfis de usuários e suas permissões.
• **Múltiplas Camadas:**Suporte para exibir diferentes camadas de dados no mapa (ex: pontos de interesse, outras áreas de cobertura).
• **Edição Básica de Quarteirões:**Ferramentas simples para ajustar limites de quarteirões ou adicionar/editar propriedades.
• **Integração com Sistemas de Saúde:**Conectar a aplicação a sistemas de informação em saúde existentes para enriquecer os dados dos quarteirões.
• **Otimização de Performance:**Para grandes volumes de dados GeoJSON, explorar otimizações de renderização e processamento.
• **Modo Offline:**Permitir o uso da aplicação e visualização de mapas mesmo sem conexão à internet.
