INSERT INTO mydb.document_types (id, name, external_code) values 
(1, 'Cédula de ciudadanía', "CC"), 
(2, 'Cédula de extrangería', "CE"),
(3, 'Carné diplomático', "CD"),
(4, 'Pasaporte', "PA"),
(5, 'Salvo conducto de permanencia', "SC"),
(6, 'Permiso especial de permanencia', "PE"),
(7, 'Tarjeta de identidad', "TI"),
(8, 'Documento extranjero', "DE"),
(9, 'Numero de identificación tributaria', "NIT");

INSERT INTO mydb.countries (name) values 
('Colombia');

INSERT INTO mydb.cities (name, country_id) values 
('Bogotá', 1),
('Medellín', 1),
('Cali', 1);

INSERT INTO mydb.localities (name, city_id) values 
('Martires', 1),
('Usme', 1),
('Kennedy', 1);

INSERT INTO mydb.pet_types (name) values 
('Perro'), ('Gato');

INSERT INTO mydb.breeds (name, pet_type_id) values 
('Chihuahua', 1),
('Bulldog', 1),
('Pitbull bum dale, mr worldwide', 1),
('Abisinio', 2),
('Asiático', 2),
('Azul ruso', 2);

'''
/oauth/signup POST
{
    "email": "johan@gmail.com",
    "password": "1123123",
    "first_name": "Johan",
    "last_name": "Mancilla",
    "document_type_id": 1,
    "document_number": "23123112",
    "country_id": 1,
    "city_id": 1,
    "locality_id": 1
}

// /pets/new-pet POST
{
   "name":"Rufito",
   "age":"2",
   "gender":"M",
   "weight":4,
   "breed_id":1,
   "user_id":1,
   "pet_type_id":1
}

// /pets/update-pet/:id PUT
{
   "name":"Rufito",
   "age":"2",
   "gender":"M",
   "weight":4,
   "breed_id":1,
   "pet_type_id":1,
   "delete_images": ["40bb3b6aae01113eb9c36bbabad0e3a1"]
}

'''








