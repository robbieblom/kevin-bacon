create table if not exists dive (datetime text, duration text, buddy text);
create table dog (dog_id integer primary key autoincrement, name text not null check(name != ""), sex text not null check(sex = "M" or sex = "F"),owner_id references owner(owner_id));
create table owner (owner_id integer primary key autoincrement,name text not null check(name != ""));