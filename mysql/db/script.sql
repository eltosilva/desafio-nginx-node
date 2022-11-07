use empresa;

create table if not exists clientes ( 
  id int auto_increment primary key, 
  nome varchar(50) not null,
  nasc date not null
);