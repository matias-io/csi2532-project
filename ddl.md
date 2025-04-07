# DDL Constraints

### The Sql Code can be found here [Sql code &amp; Constraints](Template.sql)

## The DDL constraints table

| table_name   | column_name                | data_type                   | is_nullable | column_default                                      |
| ------------ | -------------------------- | --------------------------- | ----------- | --------------------------------------------------- |
| archive      | archive_id                 | integer                     | NO          | nextval('archive_archive_id_seq'::regclass)         |
| archive      | reservation_id             | integer                     | YES         | null                                                |
| archive      | rental_id                  | integer                     | YES         | null                                                |
| archive      | archived_at                | timestamp without time zone | YES         | CURRENT_TIMESTAMP                                   |
| destinations | id                         | integer                     | NO          | nextval('destinations_id_seq'::regclass)            |
| destinations | name                       | character varying           | NO          | null                                                |
| destinations | hotels                     | integer                     | NO          | null                                                |
| destinations | image                      | character varying           | YES         | null                                                |
| employee     | employee_id                | integer                     | NO          | nextval('employee_employee_id_seq'::regclass)       |
| employee     | hotel_id                   | integer                     | NO          | null                                                |
| employee     | full_name                  | text                        | NO          | null                                                |
| employee     | address                    | text                        | NO          | null                                                |
| employee     | sin                        | text                        | NO          | null                                                |
| employee     | role                       | text                        | NO          | null                                                |
| employee     | phoneNumber                | bigint                      | NO          | null                                                |
| employee     | Hire_Date                  | text                        | YES         | null                                                |
| guest        | guest_id                   | integer                     | NO          | nextval('guest_guest_id_seq'::regclass)             |
| guest        | full_name                  | text                        | NO          | null                                                |
| guest        | address                    | text                        | NO          | null                                                |
| guest        | sin                        | text                        | NO          | null                                                |
| guest        | checkin_date               | date                        | YES         | null                                                |
| hotel        | hotel_id                   | integer                     | NO          | nextval('hotel_hotel_id_seq'::regclass)             |
| hotel        | chain_id                   | integer                     | NO          | null                                                |
| hotel        | rating                     | integer                     | YES         | 0                                                   |
| hotel        | num_rooms                  | integer                     | NO          | null                                                |
| hotel        | address                    | text                        | NO          | null                                                |
| hotel        | contact_email              | text                        | NO          | null                                                |
| hotel        | ammenities                 | text                        | YES         | null                                                |
| hotel        | name                       | text                        | NO          | null                                                |
| hotel        | contact_number             | bigint                      | NO          | null                                                |
| hotel        | image_url                  | text                        | YES         | null                                                |
| hotel        | capacity                   | bigint                      | YES         | null                                                |
| hotel        | Hire_Date                  | text                        | YES         | null                                                |
| hotel        | price                      | bigint                      | NO          | null                                                |
| hotel        | size                       | bigint                      | NO          | null                                                |
| hotelchain   | chain_id                   | integer                     | NO          | nextval('hotelchain_chain_id_seq'::regclass)        |
| hotelchain   | central_office_address     | text                        | NO          | null                                                |
| hotelchain   | num_hotels                 | integer                     | NO          | 0                                                   |
| hotelchain   | contact_email              | text                        | NO          | null                                                |
| hotelchain   | contact_number             | text                        | NO          | null                                                |
| hotelchain   | name                       | text                        | NO          | null                                                |
| hotelchain   | logo_url                   | text                        | YES         | null                                                |
| hotelchain   | number_of_hotels           | integer                     | NO          | null                                                |
| hotelchain   | hotel_chain_classification | integer                     | YES         | null                                                |
| hotelchain   | hotel_chain_images_url     | text                        | YES         | null                                                |
| rental       | rental_id                  | integer                     | NO          | nextval('rental_rental_id_seq'::regclass)           |
| rental       | reservation_id             | integer                     | YES         | null                                                |
| rental       | guest_id                   | integer                     | NO          | null                                                |
| rental       | room_id                    | integer                     | NO          | null                                                |
| rental       | checkin_date               | date                        | NO          | null                                                |
| rental       | checkout_date              | date                        | NO          | null                                                |
| rental       | employee_id                | integer                     | NO          | null                                                |
| reservation  | reservation_id             | integer                     | NO          | nextval('reservation_reservation_id_seq'::regclass) |
| reservation  | guest_id                   | integer                     | NO          | null                                                |
| reservation  | room_id                    | integer                     | NO          | null                                                |
| reservation  | checkin_date               | date                        | NO          | null                                                |
| reservation  | checkout_date              | date                        | NO          | null                                                |
| reservation  | status                     | text                        | YES         | 'Pending'::text                                     |
| room         | room_id                    | integer                     | NO          | nextval('room_room_id_seq'::regclass)               |
| room         | hotel_id                   | integer                     | NO          | null                                                |
| room         | price                      | numeric                     | NO          | null                                                |
| room         | amenities                  | text                        | NO          | null                                                |
| room         | capacity                   | integer                     | NO          | null                                                |
| room         | view                       | text                        | NO          | null                                                |
| room         | issues                     | text                        | YES         | null                                                |
| room         | extendable                 | boolean                     | NO          | false                                               |
