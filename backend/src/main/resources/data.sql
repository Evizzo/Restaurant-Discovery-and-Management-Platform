INSERT INTO users (id, firstname, lastname, picture_url, provider, role, email)
VALUES
    (UNHEX('5298a3e34933459b931c6f8abe723f9d'), 'Stefan', 'Matić', 'https://lh3.googleusercontent.com/a/ACg8ocKzIECDaon4VyO8Gf3eWhdpa9oUgULrsfd3wXflwQeoexxtGQ=s96-c','GOOGLE', 'SPOT_OWNER', 'stefanmatic941@gmail.com');

INSERT INTO spot (spot_id, name, description, city, address, google_maps_url, website_url, working_hours, always_open, phone_number, email, instagram,
tiktok, facebook, outdoor_seating,wifi_available, parking, pets_allowed, has_special_dietary_option_vegetarian,has_special_dietary_option_vegan,
 has_special_dietary_option_gluten_free,has_fitness_menu, has_posna_food, spot_type, reviews_count, has_breakfast, owner_id)
VALUES
    (UNHEX('c0f38b6789ec4b5280936e150bdc46f7'), 'Bar G', 'Ovo je opis jednog restorana koji se zove Name i neki broji, i stvarno ne znam, dodjite top je.Ovo je opis jednog restorana koji se zove Name i neki broji, i stvarno ne znam, dodjite top je.', 'Beograd', 'Ulica bb', 'gm1', 'w1', '08-22',1,'04545745','email@gmail.com','odnsdf','dasdas','dsad dsada',1,1,1,1,1,1,1,1,1, 'BAR', 0,1,UNHEX('5298a3e34933459b931c6f8abe723f9d')),
    (UNHEX('e8d5a62a22e046818ab4447febc6e9c1'), 'Poslastičarnica G', 'Ovo je opis jednog restorana koji se zove Name i neki broji, i stvarno ne znam, dodjite top je.Ovo je opis jednog restorana koji se zove Name i neki broji, i stvarno ne znam, dodjite top je.', 'Novi Sad', 'Ulica bb', 'g2m1', 'w12', '08-22',1,'04245745','em2ail@gmail.com','od2nsdf','d2asdas','ds2ad dsada2',1,1,1,1,1,1,1,1,1, 'POSLASTIČARNICA', 0,1,UNHEX('5298a3e34933459b931c6f8abe723f9d')),
    (UNHEX('f27d5d6bf01b4c83a90a5bece3ea8833'), 'Restoran G', 'Ovo je opis jednog restorana koji se zove Name i neki broji, i stvarno ne znam, dodjite top je.Ovo je opis jednog restorana koji se zove Name i neki broji, i stvarno ne znam, dodjite top je.', 'Kragujevac', 'Ulica bb', 'gm3', 'w3', '08-22',1,'04545745','email3@gmail.com','odnsdf3','dasdas3','dsad dsada3',1,1,1,1,1,1,1,1,1, 'RESTORAN', 0,1,UNHEX('5298a3e34933459b931c6f8abe723f9d')),
    (UNHEX('a73d54b0f78c4dfb9a17d9fb3f6b306f'), 'Kafic G', 'Ovo je opis jednog restorana koji se zove Name i neki broji, i stvarno ne znam, dodjite top je.Ovo je opis jednog restorana koji se zove Name i neki broji, i stvarno ne znam, dodjite top je.', 'Pančevo', 'Ulica bb', 'gm4', 'w4', '08-22',1,'04545745','email4@gmail.com','odnsdf4','dasdas4','dsad dsada4',1,1,1,1,1,1,1,1,1, 'KAFIĆ', 0,1,UNHEX('5298a3e34933459b931c6f8abe723f9d'));

INSERT INTO spot_ambiance_types (spot_spot_id, ambiance_types)
VALUES
    (UNHEX('c0f38b6789ec4b5280936e150bdc46f7'), 'ELEGANTNO'),
    (UNHEX('c0f38b6789ec4b5280936e150bdc46f7'), 'BIZNIS'),
    (UNHEX('e8d5a62a22e046818ab4447febc6e9c1'), 'ROMANTIČNO'),
    (UNHEX('e8d5a62a22e046818ab4447febc6e9c1'), 'MODERNO'),
    (UNHEX('f27d5d6bf01b4c83a90a5bece3ea8833'), 'PORODIČNO'),
    (UNHEX('f27d5d6bf01b4c83a90a5bece3ea8833'), 'MINIMALISTIČKI'),
    (UNHEX('a73d54b0f78c4dfb9a17d9fb3f6b306f'), 'OPUŠTAJUĆE'),
    (UNHEX('a73d54b0f78c4dfb9a17d9fb3f6b306f'), 'TIHO');

INSERT INTO spot_music_types (spot_spot_id, music_types)
VALUES
    (UNHEX('c0f38b6789ec4b5280936e150bdc46f7'), 'POP'),
    (UNHEX('c0f38b6789ec4b5280936e150bdc46f7'), 'TREP'),
    (UNHEX('e8d5a62a22e046818ab4447febc6e9c1'), 'REP'),
    (UNHEX('e8d5a62a22e046818ab4447febc6e9c1'), 'FOLK'),
    (UNHEX('f27d5d6bf01b4c83a90a5bece3ea8833'), 'NARODNJACI'),
    (UNHEX('f27d5d6bf01b4c83a90a5bece3ea8833'), 'REP'),
    (UNHEX('a73d54b0f78c4dfb9a17d9fb3f6b306f'), 'DISKO'),
    (UNHEX('a73d54b0f78c4dfb9a17d9fb3f6b306f'), 'OPERA');

INSERT INTO spot_cuisine_types (spot_spot_id, cuisine_types)
VALUES
    (UNHEX('c0f38b6789ec4b5280936e150bdc46f7'), 'ROŠTILJ'),
    (UNHEX('c0f38b6789ec4b5280936e150bdc46f7'), 'PEČENO'),
    (UNHEX('e8d5a62a22e046818ab4447febc6e9c1'), 'POHOVANO'),
    (UNHEX('e8d5a62a22e046818ab4447febc6e9c1'), 'DOMAĆE'),
    (UNHEX('f27d5d6bf01b4c83a90a5bece3ea8833'), 'MORSKA_HRANA'),
    (UNHEX('f27d5d6bf01b4c83a90a5bece3ea8833'), 'DIMNJENO'),
    (UNHEX('a73d54b0f78c4dfb9a17d9fb3f6b306f'), 'KUVANO'),
    (UNHEX('a73d54b0f78c4dfb9a17d9fb3f6b306f'), 'NA_PARI');

INSERT INTO spot_available_activities (spot_spot_id, available_activities)
VALUES
    (UNHEX('c0f38b6789ec4b5280936e150bdc46f7'), 'BILIJAR'),
    (UNHEX('c0f38b6789ec4b5280936e150bdc46f7'), 'PIKADO'),
    (UNHEX('e8d5a62a22e046818ab4447febc6e9c1'), 'DRUŠTVENE_IGRE'),
    (UNHEX('e8d5a62a22e046818ab4447febc6e9c1'), 'DEČIJA_IGRAONICA'),
    (UNHEX('f27d5d6bf01b4c83a90a5bece3ea8833'), 'KARAOKE'),
    (UNHEX('f27d5d6bf01b4c83a90a5bece3ea8833'), 'UŽIVO_ZABAVA'),
    (UNHEX('a73d54b0f78c4dfb9a17d9fb3f6b306f'), 'KUGLANJE'),
    (UNHEX('a73d54b0f78c4dfb9a17d9fb3f6b306f'), 'BILIJAR');

INSERT INTO spot_specialties (spot_spot_id, specialties)
VALUES
    (UNHEX('c0f38b6789ec4b5280936e150bdc46f7'), 'Sarma'),
    (UNHEX('c0f38b6789ec4b5280936e150bdc46f7'), 'Pecenje'),
    (UNHEX('e8d5a62a22e046818ab4447febc6e9c1'), 'Rostilj'),
    (UNHEX('e8d5a62a22e046818ab4447febc6e9c1'), 'Kupus'),
    (UNHEX('f27d5d6bf01b4c83a90a5bece3ea8833'), 'Paela'),
    (UNHEX('f27d5d6bf01b4c83a90a5bece3ea8833'), 'Sushi'),
    (UNHEX('a73d54b0f78c4dfb9a17d9fb3f6b306f'), 'Tapas'),
    (UNHEX('a73d54b0f78c4dfb9a17d9fb3f6b306f'), 'Kafa');
