--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: jessicachen
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    company_name character varying(45),
    contact_name character varying(225),
    contact_email character varying(45),
    contact_phone character varying(13)
);


-- ALTER TABLE public.customers OWNER TO jessicachen;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: jessicachen
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.customers_id_seq OWNER TO jessicachen;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jessicachen
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: item; Type: TABLE; Schema: public; Owner: jessicachen
--

CREATE TABLE public.item (
    id integer NOT NULL,
    name character varying(45),
    description character varying(225)
);


-- ALTER TABLE public.item OWNER TO jessicachen;

--
-- Name: item_id_seq; Type: SEQUENCE; Schema: public; Owner: jessicachen
--

CREATE SEQUENCE public.item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.item_id_seq OWNER TO jessicachen;

--
-- Name: item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jessicachen
--

ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;


--
-- Name: manufacturers; Type: TABLE; Schema: public; Owner: jessicachen
--

CREATE TABLE public.manufacturers (
    id integer NOT NULL,
    company_name character varying(45),
    contact_name character varying(225),
    contact_email character varying(45),
    contact_phone_number character varying(13)
);


ALTER TABLE public.manufacturers OWNER TO jessicachen;

--
-- Name: manufacturers_id_seq; Type: SEQUENCE; Schema: public; Owner: jessicachen
--

CREATE SEQUENCE public.manufacturers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.manufacturers_id_seq OWNER TO jessicachen;

--
-- Name: manufacturers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jessicachen
--

ALTER SEQUENCE public.manufacturers_id_seq OWNED BY public.manufacturers.id;


--
-- Name: purchase_has_item; Type: TABLE; Schema: public; Owner: jessicachen
--

CREATE TABLE public.purchase_has_item (
    purchase_id integer,
    item_id integer
);


-- ALTER TABLE public.purchase_has_item OWNER TO jessicachen;

--
-- Name: purchases; Type: TABLE; Schema: public; Owner: jessicachen
--

CREATE TABLE public.purchases (
    id integer NOT NULL,
    qty integer,
    date_ordered character varying(225),
    date_received character varying(225),
    manufacturers_id integer NOT NULL,
    users_id integer NOT NULL
);


-- ALTER TABLE public.purchases OWNER TO jessicachen;

--
-- Name: purchase_id_seq; Type: SEQUENCE; Schema: public; Owner: jessicachen
--

CREATE SEQUENCE public.purchase_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.purchase_id_seq OWNER TO jessicachen;

--
-- Name: purchase_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jessicachen
--

ALTER SEQUENCE public.purchase_id_seq OWNED BY public.purchases.id;


--
-- Name: sales; Type: TABLE; Schema: public; Owner: jessicachen
--

CREATE TABLE public.sales (
    id integer NOT NULL,
    qty integer,
    date_ordered character varying(45),
    date_received character varying(45),
    users_id integer NOT NULL,
    customers_id integer NOT NULL
);


-- ALTER TABLE public.sales OWNER TO jessicachen;

--
-- Name: sales_has_item; Type: TABLE; Schema: public; Owner: jessicachen
--

CREATE TABLE public.sales_has_item (
    sales_id integer,
    item_id integer
);


-- ALTER TABLE public.sales_has_item OWNER TO jessicachen;

--
-- Name: sales_id_seq; Type: SEQUENCE; Schema: public; Owner: jessicachen
--

CREATE SEQUENCE public.sales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.sales_id_seq OWNER TO jessicachen;

--
-- Name: sales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jessicachen
--

ALTER SEQUENCE public.sales_id_seq OWNED BY public.sales.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: jessicachen
--

CREATE TABLE public.users (
    id integer NOT NULL,
    fname character varying(45),
    lname character varying(45),
    email character varying(45)
);


-- ALTER TABLE public.users OWNER TO jessicachen;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: jessicachen
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.users_id_seq OWNER TO jessicachen;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jessicachen
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: item id; Type: DEFAULT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.item ALTER COLUMN id SET DEFAULT nextval('public.item_id_seq'::regclass);


--
-- Name: manufacturers id; Type: DEFAULT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.manufacturers ALTER COLUMN id SET DEFAULT nextval('public.manufacturers_id_seq'::regclass);


--
-- Name: purchases id; Type: DEFAULT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.purchases ALTER COLUMN id SET DEFAULT nextval('public.purchase_id_seq'::regclass);


--
-- Name: sales id; Type: DEFAULT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.sales ALTER COLUMN id SET DEFAULT nextval('public.sales_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: jessicachen
--

COPY public.customers (id, company_name, contact_name, contact_email, contact_phone) FROM stdin;
2	company2	contact2	email2@mail.com	(123)456-7891
3	company1	contact1	email1@mail.com	(123)456-7890
\.


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: jessicachen
--

COPY public.item (id, name, description) FROM stdin;
2	scissors	cuts things
3	construction paper	colored paper
4	glue stick	glues things
5	hole punch	punches holes in paper
\.


--
-- Data for Name: manufacturers; Type: TABLE DATA; Schema: public; Owner: jessicachen
--

COPY public.manufacturers (id, company_name, contact_name, contact_email, contact_phone_number) FROM stdin;
1	Target	Bob Vance	bobvance@gmail.com	(443)251-7865
2	Nordstrom	Michael Scott	mscott@gmail.com	(443)251-9987
3	Sears	Jim Halper	jhalper@gmail.com	(443)251-3326
\.


--
-- Data for Name: purchase_has_item; Type: TABLE DATA; Schema: public; Owner: jessicachen
--

COPY public.purchase_has_item (purchase_id, item_id) FROM stdin;
5	2
6	2
7	3
8	4
9	5
9	2
12	3
13	5
13	3
\.


--
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: jessicachen
--

COPY public.purchases (id, qty, date_ordered, date_received, manufacturers_id, users_id) FROM stdin;
5	1	Date 1	DateR 1	1	1
6	2	Date 2	DateR 2	1	2
7	3	Date 4	DateR 4	1	3
8	4	Date 5	DateR 5	2	2
9	5	Date 6	DateR 6	2	3
10	1	Date 1	DateR 1	1	1
11	1	Date 5	DateR 5	1	1
12	1	Date 5	DateR 5	1	1
13	1	Date 5	DateR 5	1	1
\.


--
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: jessicachen
--

COPY public.sales (id, qty, date_ordered, date_received, users_id, customers_id) FROM stdin;
2	2	date1	date2	3	2
\.


--
-- Data for Name: sales_has_item; Type: TABLE DATA; Schema: public; Owner: jessicachen
--

COPY public.sales_has_item (sales_id, item_id) FROM stdin;
2	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: jessicachen
--

COPY public.users (id, fname, lname, email) FROM stdin;
1	Greg	Maddox	gmaddox@gmail.com
3	Pam	Beasley	pbeasley@gmail.com
2	Test3	Name2	didwefixit3@gmail.com
\.


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jessicachen
--

SELECT pg_catalog.setval('public.customers_id_seq', 3, true);


--
-- Name: item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jessicachen
--

SELECT pg_catalog.setval('public.item_id_seq', 5, true);


--
-- Name: manufacturers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jessicachen
--

SELECT pg_catalog.setval('public.manufacturers_id_seq', 4, true);


--
-- Name: purchase_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jessicachen
--

SELECT pg_catalog.setval('public.purchase_id_seq', 13, true);


--
-- Name: sales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jessicachen
--

SELECT pg_catalog.setval('public.sales_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jessicachen
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);


--
-- Name: manufacturers manufacturers_pkey; Type: CONSTRAINT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.manufacturers
    ADD CONSTRAINT manufacturers_pkey PRIMARY KEY (id);


--
-- Name: purchases purchase_pkey; Type: CONSTRAINT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchase_pkey PRIMARY KEY (id);


--
-- Name: sales sales_pkey; Type: CONSTRAINT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: purchase_has_item purchase_has_item_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.purchase_has_item
    ADD CONSTRAINT purchase_has_item_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.item(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: purchase_has_item purchase_has_item_purchase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.purchase_has_item
    ADD CONSTRAINT purchase_has_item_purchase_id_fkey FOREIGN KEY (purchase_id) REFERENCES public.purchases(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: purchases purchases_manufacturers_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_manufacturers_id_fkey FOREIGN KEY (manufacturers_id) REFERENCES public.manufacturers(id);


--
-- Name: purchases purchases_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_user_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- Name: sales sales_customers_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_customers_id_fkey FOREIGN KEY (customers_id) REFERENCES public.customers(id);


--
-- Name: sales_has_item sales_has_item_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.sales_has_item
    ADD CONSTRAINT sales_has_item_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.item(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sales_has_item sales_has_item_sales_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.sales_has_item
    ADD CONSTRAINT sales_has_item_sales_id_fkey FOREIGN KEY (sales_id) REFERENCES public.sales(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sales sales_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jessicachen
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

