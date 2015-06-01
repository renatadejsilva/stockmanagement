-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.7.1
-- PostgreSQL version: 9.3
-- Project Site: pgmodeler.com.br
-- Model Author: ---

SET check_function_bodies = false;
-- ddl-end --


-- Database creation must be done outside an multicommand file.
-- These commands were put in this file only for convenience.
-- -- object: glamyland | type: DATABASE --
-- -- DROP DATABASE glamyland;
-- CREATE DATABASE glamyland
-- ;
-- -- ddl-end --
-- 

-- object: loja | type: SCHEMA --
-- DROP SCHEMA loja;
CREATE SCHEMA loja;
-- ddl-end --

SET search_path TO pg_catalog,public,loja;
-- ddl-end --

-- object: loja.fornecedor | type: TABLE --
-- DROP TABLE loja.fornecedor;
CREATE TABLE loja.fornecedor(
	id_fornecedor integer,
	id_local_fornecedor integer NOT NULL,
	nome varchar(50) NOT NULL,
	responsavel varchar(50),
	telefone varchar(15),
	email varchar(150),
	site varchar(255),
	facebook varchar(255),
	instagram varchar(80),
	logradouro text,
	comentario text,
	CONSTRAINT pk_fornecedor PRIMARY KEY (id_fornecedor),
	CONSTRAINT uq_fornecedor_nome UNIQUE (nome)

);
-- ddl-end --
-- object: loja.produto | type: TABLE --
-- DROP TABLE loja.produto;
CREATE TABLE loja.produto(
	id_produto integer,
	id_fornecedor integer NOT NULL,
	id_categoria_produto integer NOT NULL,
	descricao varchar(150) NOT NULL,
	CONSTRAINT pk_produto PRIMARY KEY (id_produto),
	CONSTRAINT uq_produto_descricao UNIQUE (descricao)

);
-- ddl-end --
-- object: loja.cliente | type: TABLE --
-- DROP TABLE loja.cliente;
CREATE TABLE loja.cliente(
	id_cliente integer,
	id_cidade integer NOT NULL,
	id_como_conheceu integer NOT NULL,
	nome varchar(80) NOT NULL,
	data_nascimento date,
	data_cadastro date,
	telefone varchar(15),
	email varchar(150),
	site varchar(255),
	facebook varchar(255),
	instagram varchar(80),
	logradouro text,
	comentario text,
	CONSTRAINT pk_cliente PRIMARY KEY (id_cliente)

);
-- ddl-end --
-- object: loja.entrada | type: TABLE --
-- DROP TABLE loja.entrada;
CREATE TABLE loja.entrada(
	id_entrada integer,
	id_produto integer NOT NULL,
	id_tamanho_produto integer NOT NULL,
	id_cor_produto integer NOT NULL,
	id_revenda integer,
	preco_custo double precision NOT NULL,
	preco_estimado_venda double precision NOT NULL,
	preco_venda_desconto double precision,
	preco_revenda double precision NOT NULL DEFAULT 0,
	data date,
	disponivel boolean NOT NULL DEFAULT true,
	comentario text,
	CONSTRAINT pk_entrada PRIMARY KEY (id_entrada)

);
-- ddl-end --
-- object: loja.item | type: TABLE --
-- DROP TABLE loja.item;
CREATE TABLE loja.item(
	id_item integer,
	id_entrada integer NOT NULL,
	id_venda integer NOT NULL,
	preco_venda double precision NOT NULL,
	desconto double precision NOT NULL DEFAULT 0,
	comissao double precision NOT NULL DEFAULT 0,
	comentario text,
	CONSTRAINT pk_saida PRIMARY KEY (id_item)

);
-- ddl-end --
-- object: loja.vendedor | type: TABLE --
-- DROP TABLE loja.vendedor;
CREATE TABLE loja.vendedor(
	id_vendedor integer,
	id_cidade integer NOT NULL,
	nome varchar(80) NOT NULL,
	logradouro text,
	CONSTRAINT pk_vendedor PRIMARY KEY (id_vendedor)

);
-- ddl-end --
-- object: loja.tipo_pagamento | type: TABLE --
-- DROP TABLE loja.tipo_pagamento;
CREATE TABLE loja.tipo_pagamento(
	id_tipo_pagamento integer,
	tipo_pagamento varchar(30) NOT NULL,
	CONSTRAINT pk_pagamento PRIMARY KEY (id_tipo_pagamento)

);
-- ddl-end --
-- object: loja.tipo_pagamento_venda | type: TABLE --
-- DROP TABLE loja.tipo_pagamento_venda;
CREATE TABLE loja.tipo_pagamento_venda(
	id_venda integer NOT NULL,
	id_tipo_pagamento integer NOT NULL,
	valor double precision NOT NULL,
	taxa_cartao double precision DEFAULT 0,
	CONSTRAINT tipo_pagamento_venda_pk PRIMARY KEY (id_tipo_pagamento,id_venda)

);
-- ddl-end --
-- object: loja.parcela_venda | type: TABLE --
-- DROP TABLE loja.parcela_venda;
CREATE TABLE loja.parcela_venda(
	id_parcela_venda integer,
	id_venda integer NOT NULL,
	id_tipo_pagamento integer NOT NULL,
	valor double precision NOT NULL,
	data_vencimento date NOT NULL,
	data_pagamento date,
	CONSTRAINT pk_parcelamento PRIMARY KEY (id_parcela_venda)

);
-- ddl-end --
-- object: loja.local_fornecedor | type: TABLE --
-- DROP TABLE loja.local_fornecedor;
CREATE TABLE loja.local_fornecedor(
	id_local_fornecedor integer,
	id_cidade integer NOT NULL,
	nome varchar(80) NOT NULL,
	CONSTRAINT pk_local_fornecedor PRIMARY KEY (id_local_fornecedor)

);
-- ddl-end --
-- object: loja.cidade | type: TABLE --
-- DROP TABLE loja.cidade;
CREATE TABLE loja.cidade(
	id_cidade integer,
	id_estado integer NOT NULL,
	nome varchar(80) NOT NULL,
	CONSTRAINT pk_cidade PRIMARY KEY (id_cidade)

);
-- ddl-end --
-- object: loja.estado | type: TABLE --
-- DROP TABLE loja.estado;
CREATE TABLE loja.estado(
	id_estado integer,
	nome varchar(30) NOT NULL,
	sigla varchar(2) NOT NULL,
	CONSTRAINT pk_estado PRIMARY KEY (id_estado)

);
-- ddl-end --
-- object: loja.tamanho_produto | type: TABLE --
-- DROP TABLE loja.tamanho_produto;
CREATE TABLE loja.tamanho_produto(
	id_tamanho_produto integer,
	tamanho varchar(20) NOT NULL,
	CONSTRAINT pk_tamanho_produto PRIMARY KEY (id_tamanho_produto),
	CONSTRAINT uq_tamanho_produto_tamanho UNIQUE (tamanho)

);
-- ddl-end --
-- object: loja.seq_estado | type: SEQUENCE --
-- ALTER TABLE loja.estado DROP SEQUENCE loja.seq_estado;
CREATE SEQUENCE loja.seq_estado
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.estado.id_estado;

ALTER TABLE loja.estado ALTER COLUMN id_estado
      SET DEFAULT nextval('loja.seq_estado'::regclass);
-- ddl-end --

-- object: loja.seq_fornecedor | type: SEQUENCE --
-- ALTER TABLE loja.fornecedor DROP SEQUENCE loja.seq_fornecedor;
CREATE SEQUENCE loja.seq_fornecedor
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.fornecedor.id_fornecedor;

ALTER TABLE loja.fornecedor ALTER COLUMN id_fornecedor
      SET DEFAULT nextval('loja.seq_fornecedor'::regclass);
-- ddl-end --

-- object: loja.seq_cidade | type: SEQUENCE --
-- ALTER TABLE loja.cidade DROP SEQUENCE loja.seq_cidade;
CREATE SEQUENCE loja.seq_cidade
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.cidade.id_cidade;

ALTER TABLE loja.cidade ALTER COLUMN id_cidade
      SET DEFAULT nextval('loja.seq_cidade'::regclass);
-- ddl-end --

-- object: loja.seq_local_fornecedor | type: SEQUENCE --
-- ALTER TABLE loja.local_fornecedor DROP SEQUENCE loja.seq_local_fornecedor;
CREATE SEQUENCE loja.seq_local_fornecedor
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.local_fornecedor.id_local_fornecedor;

ALTER TABLE loja.local_fornecedor ALTER COLUMN id_local_fornecedor
      SET DEFAULT nextval('loja.seq_local_fornecedor'::regclass);
-- ddl-end --

-- object: loja.seq_produto | type: SEQUENCE --
-- ALTER TABLE loja.produto DROP SEQUENCE loja.seq_produto;
CREATE SEQUENCE loja.seq_produto
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.produto.id_produto;

ALTER TABLE loja.produto ALTER COLUMN id_produto
      SET DEFAULT nextval('loja.seq_produto'::regclass);
-- ddl-end --

-- object: loja.seq_cliente | type: SEQUENCE --
-- ALTER TABLE loja.cliente DROP SEQUENCE loja.seq_cliente;
CREATE SEQUENCE loja.seq_cliente
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.cliente.id_cliente;

ALTER TABLE loja.cliente ALTER COLUMN id_cliente
      SET DEFAULT nextval('loja.seq_cliente'::regclass);
-- ddl-end --

-- object: loja.seq_tamanho_produto | type: SEQUENCE --
-- ALTER TABLE loja.tamanho_produto DROP SEQUENCE loja.seq_tamanho_produto;
CREATE SEQUENCE loja.seq_tamanho_produto
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.tamanho_produto.id_tamanho_produto;

ALTER TABLE loja.tamanho_produto ALTER COLUMN id_tamanho_produto
      SET DEFAULT nextval('loja.seq_tamanho_produto'::regclass);
-- ddl-end --

-- object: loja.seq_entrada | type: SEQUENCE --
-- ALTER TABLE loja.entrada DROP SEQUENCE loja.seq_entrada;
CREATE SEQUENCE loja.seq_entrada
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.entrada.id_entrada;

ALTER TABLE loja.entrada ALTER COLUMN id_entrada
      SET DEFAULT nextval('loja.seq_entrada'::regclass);
-- ddl-end --

-- object: loja.seq_item | type: SEQUENCE --
-- ALTER TABLE loja.item DROP SEQUENCE loja.seq_item;
CREATE SEQUENCE loja.seq_item
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.item.id_item;

ALTER TABLE loja.item ALTER COLUMN id_item
      SET DEFAULT nextval('loja.seq_item'::regclass);
-- ddl-end --

-- object: loja.seq_vendedor | type: SEQUENCE --
-- ALTER TABLE loja.vendedor DROP SEQUENCE loja.seq_vendedor;
CREATE SEQUENCE loja.seq_vendedor
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.vendedor.id_vendedor;

ALTER TABLE loja.vendedor ALTER COLUMN id_vendedor
      SET DEFAULT nextval('loja.seq_vendedor'::regclass);
-- ddl-end --

-- object: loja.seq_tipo_pagamento | type: SEQUENCE --
-- ALTER TABLE loja.tipo_pagamento DROP SEQUENCE loja.seq_tipo_pagamento;
CREATE SEQUENCE loja.seq_tipo_pagamento
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.tipo_pagamento.id_tipo_pagamento;

ALTER TABLE loja.tipo_pagamento ALTER COLUMN id_tipo_pagamento
      SET DEFAULT nextval('loja.seq_tipo_pagamento'::regclass);
-- ddl-end --

-- object: loja.seq_parcela_venda | type: SEQUENCE --
-- ALTER TABLE loja.parcela_venda DROP SEQUENCE loja.seq_parcela_venda;
CREATE SEQUENCE loja.seq_parcela_venda
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.parcela_venda.id_parcela_venda;

ALTER TABLE loja.parcela_venda ALTER COLUMN id_parcela_venda
      SET DEFAULT nextval('loja.seq_parcela_venda'::regclass);
-- ddl-end --

-- object: estado_fk | type: CONSTRAINT --
-- ALTER TABLE loja.cidade DROP CONSTRAINT estado_fk;
ALTER TABLE loja.cidade ADD CONSTRAINT estado_fk FOREIGN KEY (id_estado)
REFERENCES loja.estado (id_estado) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: cidade_fk | type: CONSTRAINT --
-- ALTER TABLE loja.local_fornecedor DROP CONSTRAINT cidade_fk;
ALTER TABLE loja.local_fornecedor ADD CONSTRAINT cidade_fk FOREIGN KEY (id_cidade)
REFERENCES loja.cidade (id_cidade) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: local_fornecedor_fk | type: CONSTRAINT --
-- ALTER TABLE loja.fornecedor DROP CONSTRAINT local_fornecedor_fk;
ALTER TABLE loja.fornecedor ADD CONSTRAINT local_fornecedor_fk FOREIGN KEY (id_local_fornecedor)
REFERENCES loja.local_fornecedor (id_local_fornecedor) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: fornecedor_fk | type: CONSTRAINT --
-- ALTER TABLE loja.produto DROP CONSTRAINT fornecedor_fk;
ALTER TABLE loja.produto ADD CONSTRAINT fornecedor_fk FOREIGN KEY (id_fornecedor)
REFERENCES loja.fornecedor (id_fornecedor) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: produto_fk | type: CONSTRAINT --
-- ALTER TABLE loja.entrada DROP CONSTRAINT produto_fk;
ALTER TABLE loja.entrada ADD CONSTRAINT produto_fk FOREIGN KEY (id_produto)
REFERENCES loja.produto (id_produto) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: tamanho_produto_fk | type: CONSTRAINT --
-- ALTER TABLE loja.entrada DROP CONSTRAINT tamanho_produto_fk;
ALTER TABLE loja.entrada ADD CONSTRAINT tamanho_produto_fk FOREIGN KEY (id_tamanho_produto)
REFERENCES loja.tamanho_produto (id_tamanho_produto) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: entrada_fk | type: CONSTRAINT --
-- ALTER TABLE loja.item DROP CONSTRAINT entrada_fk;
ALTER TABLE loja.item ADD CONSTRAINT entrada_fk FOREIGN KEY (id_entrada)
REFERENCES loja.entrada (id_entrada) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: tipo_pagamento_fk | type: CONSTRAINT --
-- ALTER TABLE loja.tipo_pagamento_venda DROP CONSTRAINT tipo_pagamento_fk;
ALTER TABLE loja.tipo_pagamento_venda ADD CONSTRAINT tipo_pagamento_fk FOREIGN KEY (id_tipo_pagamento)
REFERENCES loja.tipo_pagamento (id_tipo_pagamento) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: loja.cor_produto | type: TABLE --
-- DROP TABLE loja.cor_produto;
CREATE TABLE loja.cor_produto(
	id_cor_produto integer,
	cor varchar(20) NOT NULL,
	CONSTRAINT pk_cor_produto PRIMARY KEY (id_cor_produto),
	CONSTRAINT uq_cor_produto_cor UNIQUE (cor)

);
-- ddl-end --
-- object: cor_produto_fk | type: CONSTRAINT --
-- ALTER TABLE loja.entrada DROP CONSTRAINT cor_produto_fk;
ALTER TABLE loja.entrada ADD CONSTRAINT cor_produto_fk FOREIGN KEY (id_cor_produto)
REFERENCES loja.cor_produto (id_cor_produto) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: loja.seq_cor_produto | type: SEQUENCE --
-- ALTER TABLE loja.cor_produto DROP SEQUENCE loja.seq_cor_produto;
CREATE SEQUENCE loja.seq_cor_produto
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.cor_produto.id_cor_produto;

ALTER TABLE loja.cor_produto ALTER COLUMN id_cor_produto
      SET DEFAULT nextval('loja.seq_cor_produto'::regclass);
-- ddl-end --

-- object: uq_saida_entrada | type: CONSTRAINT --
-- ALTER TABLE loja.item DROP CONSTRAINT uq_saida_entrada;
ALTER TABLE loja.item ADD CONSTRAINT uq_saida_entrada UNIQUE (id_entrada);
-- ddl-end --


-- object: loja.venda | type: TABLE --
-- DROP TABLE loja.venda;
CREATE TABLE loja.venda(
	id_venda integer,
	id_vendedor integer NOT NULL,
	id_cliente integer NOT NULL,
	id_meio_comunicacao_compra integer NOT NULL,
	data date,
	frete double precision NOT NULL DEFAULT 0,
	desconto double precision NOT NULL DEFAULT 0,
	comentario text,
	CONSTRAINT pk_venda PRIMARY KEY (id_venda)

);
-- ddl-end --
-- object: venda_fk | type: CONSTRAINT --
-- ALTER TABLE loja.item DROP CONSTRAINT venda_fk;
ALTER TABLE loja.item ADD CONSTRAINT venda_fk FOREIGN KEY (id_venda)
REFERENCES loja.venda (id_venda) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: vendedor_fk | type: CONSTRAINT --
-- ALTER TABLE loja.venda DROP CONSTRAINT vendedor_fk;
ALTER TABLE loja.venda ADD CONSTRAINT vendedor_fk FOREIGN KEY (id_vendedor)
REFERENCES loja.vendedor (id_vendedor) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: cliente_fk | type: CONSTRAINT --
-- ALTER TABLE loja.venda DROP CONSTRAINT cliente_fk;
ALTER TABLE loja.venda ADD CONSTRAINT cliente_fk FOREIGN KEY (id_cliente)
REFERENCES loja.cliente (id_cliente) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: venda_fk | type: CONSTRAINT --
-- ALTER TABLE loja.tipo_pagamento_venda DROP CONSTRAINT venda_fk;
ALTER TABLE loja.tipo_pagamento_venda ADD CONSTRAINT venda_fk FOREIGN KEY (id_venda)
REFERENCES loja.venda (id_venda) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: loja.seq_venda | type: SEQUENCE --
-- ALTER TABLE loja.venda DROP SEQUENCE loja.seq_venda;
CREATE SEQUENCE loja.seq_venda
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.venda.id_venda;

ALTER TABLE loja.venda ALTER COLUMN id_venda
      SET DEFAULT nextval('loja.seq_venda'::regclass);
-- ddl-end --

-- object: tipo_pagamento_venda_fk | type: CONSTRAINT --
-- ALTER TABLE loja.parcela_venda DROP CONSTRAINT tipo_pagamento_venda_fk;
ALTER TABLE loja.parcela_venda ADD CONSTRAINT tipo_pagamento_venda_fk FOREIGN KEY (id_tipo_pagamento,id_venda)
REFERENCES loja.tipo_pagamento_venda (id_tipo_pagamento,id_venda) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: cidade_fk | type: CONSTRAINT --
-- ALTER TABLE loja.vendedor DROP CONSTRAINT cidade_fk;
ALTER TABLE loja.vendedor ADD CONSTRAINT cidade_fk FOREIGN KEY (id_cidade)
REFERENCES loja.cidade (id_cidade) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: cidade_fk | type: CONSTRAINT --
-- ALTER TABLE loja.cliente DROP CONSTRAINT cidade_fk;
ALTER TABLE loja.cliente ADD CONSTRAINT cidade_fk FOREIGN KEY (id_cidade)
REFERENCES loja.cidade (id_cidade) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: loja.como_conheceu | type: TABLE --
-- DROP TABLE loja.como_conheceu;
CREATE TABLE loja.como_conheceu(
	id_como_conheceu integer,
	descricao varchar(50) NOT NULL,
	CONSTRAINT pk_como_conheceu PRIMARY KEY (id_como_conheceu)

);
-- ddl-end --
-- object: loja.meio_comunicacao_compra | type: TABLE --
-- DROP TABLE loja.meio_comunicacao_compra;
CREATE TABLE loja.meio_comunicacao_compra(
	id_meio_comunicacao_compra integer,
	descricao varchar(50) NOT NULL,
	CONSTRAINT pk_meio_comunicacao_compra PRIMARY KEY (id_meio_comunicacao_compra)

);
-- ddl-end --
-- object: loja.seq_como_conheceu | type: SEQUENCE --
-- ALTER TABLE loja.como_conheceu DROP SEQUENCE loja.seq_como_conheceu;
CREATE SEQUENCE loja.seq_como_conheceu
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.como_conheceu.id_como_conheceu;

ALTER TABLE loja.como_conheceu ALTER COLUMN id_como_conheceu
      SET DEFAULT nextval('loja.seq_como_conheceu'::regclass);
-- ddl-end --

-- object: loja.seq_meio_comunicacao_compra | type: SEQUENCE --
-- ALTER TABLE loja.meio_comunicacao_compra DROP SEQUENCE loja.seq_meio_comunicacao_compra;
CREATE SEQUENCE loja.seq_meio_comunicacao_compra
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.meio_comunicacao_compra.id_meio_comunicacao_compra;

ALTER TABLE loja.meio_comunicacao_compra ALTER COLUMN id_meio_comunicacao_compra
      SET DEFAULT nextval('loja.seq_meio_comunicacao_compra'::regclass);
-- ddl-end --

-- object: como_conheceu_fk | type: CONSTRAINT --
-- ALTER TABLE loja.cliente DROP CONSTRAINT como_conheceu_fk;
ALTER TABLE loja.cliente ADD CONSTRAINT como_conheceu_fk FOREIGN KEY (id_como_conheceu)
REFERENCES loja.como_conheceu (id_como_conheceu) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: meio_comunicacao_compra_fk | type: CONSTRAINT --
-- ALTER TABLE loja.venda DROP CONSTRAINT meio_comunicacao_compra_fk;
ALTER TABLE loja.venda ADD CONSTRAINT meio_comunicacao_compra_fk FOREIGN KEY (id_meio_comunicacao_compra)
REFERENCES loja.meio_comunicacao_compra (id_meio_comunicacao_compra) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: loja.revenda | type: TABLE --
-- DROP TABLE loja.revenda;
CREATE TABLE loja.revenda(
	id_revenda integer,
	id_vendedor integer NOT NULL,
	data date NOT NULL,
	desconto double precision NOT NULL DEFAULT 0,
	comentario text,
	CONSTRAINT pk_revenda PRIMARY KEY (id_revenda)

);
-- ddl-end --
-- object: loja.seq_revenda | type: SEQUENCE --
-- ALTER TABLE loja.revenda DROP SEQUENCE loja.seq_revenda;
CREATE SEQUENCE loja.seq_revenda
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.revenda.id_revenda;

ALTER TABLE loja.revenda ALTER COLUMN id_revenda
      SET DEFAULT nextval('loja.seq_revenda'::regclass);
-- ddl-end --

-- object: vendedor_fk | type: CONSTRAINT --
-- ALTER TABLE loja.revenda DROP CONSTRAINT vendedor_fk;
ALTER TABLE loja.revenda ADD CONSTRAINT vendedor_fk FOREIGN KEY (id_vendedor)
REFERENCES loja.vendedor (id_vendedor) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: revenda_fk | type: CONSTRAINT --
-- ALTER TABLE loja.entrada DROP CONSTRAINT revenda_fk;
ALTER TABLE loja.entrada ADD CONSTRAINT revenda_fk FOREIGN KEY (id_revenda)
REFERENCES loja.revenda (id_revenda) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --


-- object: loja.tipo_pagamento_revenda | type: TABLE --
-- DROP TABLE loja.tipo_pagamento_revenda;
CREATE TABLE loja.tipo_pagamento_revenda(
	id_revenda integer NOT NULL,
	id_tipo_pagamento integer NOT NULL,
	valor double precision NOT NULL,
	taxa_cartao double precision DEFAULT 0,
	CONSTRAINT tipo_pagamento_revenda_pk PRIMARY KEY (id_revenda,id_tipo_pagamento)

);
-- ddl-end --
-- object: revenda_fk | type: CONSTRAINT --
-- ALTER TABLE loja.tipo_pagamento_revenda DROP CONSTRAINT revenda_fk;
ALTER TABLE loja.tipo_pagamento_revenda ADD CONSTRAINT revenda_fk FOREIGN KEY (id_revenda)
REFERENCES loja.revenda (id_revenda) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: tipo_pagamento_fk | type: CONSTRAINT --
-- ALTER TABLE loja.tipo_pagamento_revenda DROP CONSTRAINT tipo_pagamento_fk;
ALTER TABLE loja.tipo_pagamento_revenda ADD CONSTRAINT tipo_pagamento_fk FOREIGN KEY (id_tipo_pagamento)
REFERENCES loja.tipo_pagamento (id_tipo_pagamento) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: loja.parcela_revenda | type: TABLE --
-- DROP TABLE loja.parcela_revenda;
CREATE TABLE loja.parcela_revenda(
	id_parcela_revenda integer,
	id_revenda integer NOT NULL,
	id_tipo_pagamento integer NOT NULL,
	valor double precision NOT NULL,
	data_vencimento date NOT NULL,
	data_pagamento date,
	CONSTRAINT pk_parcela_revenda PRIMARY KEY (id_parcela_revenda)

);
-- ddl-end --
-- object: loja.seq_parcela_revenda | type: SEQUENCE --
-- ALTER TABLE loja.parcela_revenda DROP SEQUENCE loja.seq_parcela_revenda;
CREATE SEQUENCE loja.seq_parcela_revenda
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.parcela_revenda.id_parcela_revenda;

ALTER TABLE loja.parcela_revenda ALTER COLUMN id_parcela_revenda
      SET DEFAULT nextval('loja.seq_parcela_revenda'::regclass);
-- ddl-end --

-- object: tipo_pagamento_revenda_fk | type: CONSTRAINT --
-- ALTER TABLE loja.parcela_revenda DROP CONSTRAINT tipo_pagamento_revenda_fk;
ALTER TABLE loja.parcela_revenda ADD CONSTRAINT tipo_pagamento_revenda_fk FOREIGN KEY (id_revenda,id_tipo_pagamento)
REFERENCES loja.tipo_pagamento_revenda (id_revenda,id_tipo_pagamento) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


-- object: loja.categoria_produto | type: TABLE --
-- DROP TABLE loja.categoria_produto;
CREATE TABLE loja.categoria_produto(
	id_categoria_produto integer,
	descricao varchar(150) NOT NULL,
	CONSTRAINT pk_categoria PRIMARY KEY (id_categoria_produto)

);
-- ddl-end --
-- object: loja.seq_categoria_produto | type: SEQUENCE --
-- ALTER TABLE loja.categoria_produto DROP SEQUENCE loja.seq_categoria_produto;
CREATE SEQUENCE loja.seq_categoria_produto
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY loja.categoria_produto.id_categoria_produto;

ALTER TABLE loja.categoria_produto ALTER COLUMN id_categoria_produto
      SET DEFAULT nextval('loja.seq_categoria_produto'::regclass);
-- ddl-end --

-- object: categoria_produto_fk | type: CONSTRAINT --
-- ALTER TABLE loja.produto DROP CONSTRAINT categoria_produto_fk;
ALTER TABLE loja.produto ADD CONSTRAINT categoria_produto_fk FOREIGN KEY (id_categoria_produto)
REFERENCES loja.categoria_produto (id_categoria_produto) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --




