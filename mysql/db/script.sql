use cadastro;

create table if not exists people ( 
  id int auto_increment primary key, 
  nome varchar(50) not null
);