--  This is all the SQL which was on our Supabase along with all of the Triggers and constraits which are part of the DDL code


create table public.archive (
  archive_id serial not null,
  reservation_id integer null,
  rental_id integer null,
  archived_at timestamp without time zone null default CURRENT_TIMESTAMP,
  constraint archive_pkey primary key (archive_id),
  constraint archive_rental_id_fkey foreign KEY (rental_id) references rental (rental_id) on delete set null,
  constraint archive_reservation_id_fkey foreign KEY (reservation_id) references reservation (reservation_id) on delete set null
) TABLESPACE pg_default;

create table public.destinations (
  id serial not null,
  name character varying(100) not null,
  hotels integer not null,
  image character varying(255) null,
  constraint destinations_pkey primary key (id)
) TABLESPACE pg_default;

create table public.employee (
  employee_id serial not null,
  hotel_id integer not null,
  full_name text not null,
  address text not null,
  sin text not null,
  role text not null,
  "phoneNumber" bigint not null,
  "Hire_Date" text null,
  constraint employee_pkey primary key (employee_id),
  constraint employee_sin_key unique (sin)
) TABLESPACE pg_default;

create table public.guest (
  guest_id serial not null,
  full_name text not null,
  address text not null,
  sin text not null,
  checkin_date date null,
  constraint guest_pkey primary key (guest_id),
  constraint guest_sin_key unique (sin)
) TABLESPACE pg_default;

create table public.hotel (
  hotel_id serial not null,
  chain_id integer not null,
  rating integer null default 0,
  num_rooms integer not null,
  address text not null,
  contact_email text not null,
  ammenities text null,
  name text not null,
  contact_number bigint not null,
  image_url text null,
  capacity bigint null,
  "Hire_Date" text null,
  price bigint not null,
  size bigint not null,
  constraint hotel_pkey primary key (hotel_id),
  constraint hotel_name_key unique (name),
  constraint hotel_chain_id_fkey foreign KEY (chain_id) references hotelchain (chain_id) on delete CASCADE,
  constraint hotel_contact_email_check check ((contact_email ~~ '%@%.%'::text)),
  constraint hotel_rating_check check (
    (
      (rating >= 0)
      and (rating <= 5)
    )
  )
) TABLESPACE pg_default;

create trigger trg_check_manager
after INSERT
or
update on hotel for EACH row
execute FUNCTION ensure_hotel_has_manager ();


create table public.hotelchain (
  chain_id serial not null,
  central_office_address text not null,
  num_hotels integer not null default 0,
  contact_email text not null,
  contact_number text not null,
  name text not null,
  logo_url text null,
  number_of_hotels integer not null,
  hotel_chain_classification integer null,
  hotel_chain_images_url text null,
  constraint hotelchain_pkey primary key (chain_id),
  constraint hotelchain_name_key unique (name),
  constraint hotelchain_contact_email_check check ((contact_email ~~ '%@%.%'::text))
) TABLESPACE pg_default;

create table public.rental (
  rental_id serial not null,
  reservation_id integer null,
  guest_id integer not null,
  room_id integer not null,
  checkin_date date not null,
  checkout_date date not null,
  employee_id integer not null,
  constraint rental_pkey primary key (rental_id),
  constraint rental_employee_id_fkey foreign KEY (employee_id) references employee (employee_id),
  constraint rental_guest_id_fkey foreign KEY (guest_id) references guest (guest_id) on delete CASCADE,
  constraint rental_reservation_id_fkey foreign KEY (reservation_id) references reservation (reservation_id) on delete set null,
  constraint rental_room_id_fkey foreign KEY (room_id) references room (room_id) on delete CASCADE
) TABLESPACE pg_default;

create table public.reservation (
  reservation_id serial not null,
  guest_id integer not null,
  room_id integer not null,
  checkin_date date not null,
  checkout_date date not null,
  status text null default 'Pending'::text,
  constraint reservation_pkey primary key (reservation_id),
  constraint reservation_guest_id_fkey foreign KEY (guest_id) references guest (guest_id) on delete CASCADE,
  constraint reservation_room_id_fkey foreign KEY (room_id) references room (room_id) on delete CASCADE,
  constraint reservation_checkin_date_check check ((checkin_date >= CURRENT_DATE))
) TABLESPACE pg_default;

create trigger trg_archive_reservation
after INSERT
or
update on reservation for EACH row
execute FUNCTION archive_after_checkout ();

create table public.room (
  room_id serial not null,
  hotel_id integer not null,
  price numeric(10, 2) not null,
  amenities text not null,
  capacity integer not null,
  view text not null,
  issues text null,
  extendable boolean not null default false,
  constraint room_pkey primary key (room_id),
  constraint room_hotel_id_fkey foreign KEY (hotel_id) references hotel (hotel_id) on delete CASCADE,
  constraint room_price_check check ((price > (0)::numeric))
) TABLESPACE pg_default;

create trigger trg_no_room_delete BEFORE DELETE on room for EACH row
execute FUNCTION prevent_delete_if_linked ();