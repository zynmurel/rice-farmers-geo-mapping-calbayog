--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at) FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Admin" (id, "adminName", email, "phoneNumber", username, password, "createdAt", "updatedAt") FROM stdin;
f6dcacce-5337-44fc-8b9c-1fe0d392a055	GEO-AGRI	geoagri@test.com	09131312233	adminone	$2b$10$.I4umy5RPjk4Y8CF8X5pJ.Zs99wdy/snvxtH49dKa1LGgAZt7/H0O	2025-08-11 02:38:03.557	2025-08-11 02:38:03.557
\.


--
-- Data for Name: Crop; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Crop" (id, title, variety, code, source, "releaseAt", "createdAt", "updatedAt", environment, establishment, season, seed_classification, "daysOfSowing") FROM stdin;
0817d9b3-b4a9-46b9-aa5a-d5685b04d839	Mestiso 90	NSIC Rc 516H	LP 402	Long Ping	2017-12-31 16:00:00	2025-09-17 01:34:26.689	2025-09-19 09:00:00.281	{IRRIGATED_LOWLAND}	{DIRECT_WET_SEEDED,DIRECT_DRY_SEEDED,TRANSPLANTED}	{DRY_SEASON}	HYBRID	110
a7d4e49e-b830-4e54-8b82-27152ac8478a	Tubigan 48	NSIC Rc 622	PR38168-2B-3-1-3-1-1-1-2	Philrice	2020-12-31 16:00:00	2025-09-16 22:09:36.427	2025-09-17 01:22:04.256	{IRRIGATED_LOWLAND}	{DIRECT_WET_SEEDED}	{DRY_SEASON,WET_SEASON}	INBRED	110
db146f41-082c-4898-94d2-0a9f70fc78d8	Tubigan 49	NSIC Rc 624	PR39142-10-3-2-1-1	Philrice	2020-12-31 16:00:00	2025-09-17 01:11:08.408	2025-09-17 01:22:28.688	{IRRIGATED_LOWLAND}	{DIRECT_WET_SEEDED}	{DRY_SEASON,WET_SEASON}	INBRED	110
e7ccdd72-9df8-4e3f-a65d-aef6da722d4f	Tubigan 50	NSIC Rc 626	PR40432-14-2-1-B	Philrice	2020-12-31 16:00:00	2025-09-17 01:23:46.335	2025-09-17 01:23:46.335	{IRRIGATED_LOWLAND}	{DIRECT_WET_SEEDED}	{DRY_SEASON,WET_SEASON}	INBRED	110
646aea11-60aa-405b-b501-3d2b64adbcdf	Pigmented 1	NSIC Rc 638 SR	PR35034-B-3-2-1-1-4-1-2-1-1-2-1 (R/NG)	Philrice	2020-12-31 16:00:00	2025-09-17 01:25:41.727	2025-09-17 01:25:41.727	{IRRIGATED_LOWLAND}	{DIRECT_WET_SEEDED,DIRECT_DRY_SEEDED,TRANSPLANTED}	{DRY_SEASON,WET_SEASON}	SPECIAL_RICE	110
7a15e7b8-9084-4b03-8f77-624dd2d45c22	Zinc Rice 2	NSIC Rc 648	IR93337:37-B-15-15-22-1RGA-2RGA-1-B	Philrice	2020-12-31 16:00:00	2025-09-17 01:27:30.843	2025-09-17 01:27:30.843	{IRRIGATED_LOWLAND}	{DIRECT_WET_SEEDED,DIRECT_DRY_SEEDED,TRANSPLANTED}	{DRY_SEASON,WET_SEASON}	SPECIAL_RICE	110
cfd3921e-d24e-4a1c-9022-03e843d0c86d	Sahod Ulan 36	NSIC Rc 650	IR16L1860	IRRI	2020-12-31 16:00:00	2025-09-17 01:30:52.815	2025-09-17 01:30:52.815	{RAINFED_LOWLAND}	{DIRECT_WET_SEEDED,DIRECT_DRY_SEEDED,TRANSPLANTED}	{DRY_SEASON,WET_SEASON}	INBRED	110
9be49dca-f16d-4b2a-b890-d4105847b549	Salinas 34	NSIC Rc 604	PR45167-B-B-18-1	IRRI	2019-12-31 16:00:00	2025-09-17 01:33:00.579	2025-09-17 01:33:00.579	{SALINE}	{DIRECT_WET_SEEDED,DIRECT_DRY_SEEDED,TRANSPLANTED}	{DRY_SEASON,WET_SEASON}	INBRED	110
5246a0eb-e55c-4be1-9f89-e15c24d755e7	Mestiso 95	NSIC Rc 526H	LPP 952	PHILSCAT	2017-12-31 16:00:00	2025-09-17 01:36:05.921	2025-09-17 01:36:05.921	{IRRIGATED_LOWLAND}	{DIRECT_WET_SEEDED,DIRECT_DRY_SEEDED,TRANSPLANTED}	{DRY_SEASON,WET_SEASON}	HYBRID	110
624e723f-c38d-4fbe-bba1-e2f802013532	Salinas 29	NSIC Rc 534	GSR-IR1-12-D10-S1-D1	IRRI	2017-12-31 16:00:00	2025-09-17 01:37:43.442	2025-09-17 01:37:43.442	{SALINE}	{DIRECT_WET_SEEDED,DIRECT_DRY_SEEDED,TRANSPLANTED}	{DRY_SEASON,WET_SEASON}	INBRED	110
cb56d467-ce32-455b-aa2d-3a3647847567	Mestiso 96	NSIC Rc 538H	LPP 507	philsCAT/Long Ping	2017-12-31 16:00:00	2025-09-17 01:40:57.012	2025-09-17 01:40:57.012	{IRRIGATED_LOWLAND}	{TRANSPLANTED,DIRECT_WET_SEEDED,DIRECT_DRY_SEEDED}	{DRY_SEASON,WET_SEASON}	HYBRID	110
\.


--
-- Data for Name: DistributionBatch; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."DistributionBatch" (id, year, season, who, what, "when", "where", why) FROM stdin;
1	2024	DRY	test	test	test	test	test
2	2025	DRY	bjkb	kjbkjb	kjbkjb	kjb	kjbjk
3	2025	DRY	lnlk	lknlk	nlknl	lkn	lknkln
4	2025	DRY	lnlk	lknlk	nlknl	lkn	lknkln
5	2025	DRY	lnlk	lknlk	nlknl	lkn	lknkln
6	2025	DRY	lnlk	lknlk	nlknl	lkn	lknkln
7	2025	DRY	lnlk	lknlk	nlknl	lkn	lknkln
8	2025	WET	lnlk	lknlk	nlknl	lkn	lknkln
9	2025	WET	;lm;lm	;lm;lm	;lm;lm	;lm;lm	;lml;ml;
10	2025	WET	;lm;lm	;lm;lm	;lm;lm	;lm;lm	;lml;ml;
11	2025	WET	;lm;lm	;lm;lm	;lm;lm	;lm;lm	;lml;ml;
12	2023	WET	kjnlkn	lknlkn	lknl	nlknlknl	lknlknl
13	2023	WET	;lnl;nm;l	;ln;lmn	;ln;ln	;ln;ln	;ln;ln;l
14	2023	WET	lknlkn	klnkn	lknlkn	lkn	lknkln
15	2023	WET	lknkln	lknlkn	lknlkn	lkn	lknlknl
16	2023	WET	lknkln	lknlkn	lknlkn	lkn	lknlknl
17	2023	WET	lknkln	lknlkn	lknlkn	lkn	lknlknl
18	2023	WET	lknkln	lknlkn	lknlkn	lkn	lknlknl
19	2023	WET	lknkln	lknlkn	lknlkn	lkn	lknlknl
20	2023	WET	lknkln	lknlkn	lknlkn	lkn	lknlknl
21	2023	WET	lknkln	lknlkn	lknlkn	lkn	lknlknl
22	2023	WET	lknkln	lknlkn	lknlkn	lkn	lknlknl
23	2023	WET	lknkln	lknlkn	lknlkn	lkn	lknlknl
24	2021	WET	lknkln	lknlkn	lknlkn	lkn	lknlknl
25	2021	DRY	lknkln	lknlkn	lknlkn	lkn	lknlknl
26	2023	WET	lknkln	lknlkn	lknlkn	lkn	lknlknl
27	2023	WET	lknkln	lknlkn	lknlkn	lkn	lknlknl
28	2015	WET	lknkln	lknlkn	lknlkn	lkn	lknlknl
29	2016	DRY	lk lk l	lk lk	lk lk 	lk 	lk kl 
30	2016	DRY	lknkln	lknlkn	lknlkn	lknlkl	knlknlkn
31	2025	WET	Mirasol Sobrino	Seed Distribution	Today at September 29, 2025	At the Department of Agriculture	For Planting Season
32	2025	WET	Farmer	Seed Distribution	Oct. 25, 2025 at 3pm	Barangay Hall of Alibaba 	For planting Season
33	2025	DRY	John Michael Dosado	Seed Distribution	October 1, 2025 1 pm	Barangay Hall of San Rufino	For Planting Season
34	2019	DRY	Farmers who received the message	 Your fertilizer assistance is ready for pickup.  	October 15, 2025, 9:00 AM  	Barangay San Isidro Agricultural Office  	To support your ongoing rice planting season.
35	2019	WET	Farmer who receive this message	Your fertilizer assistance is ready for pickup.\n	October 15, 2025, 9:00 AM \n	Barangay San Isidro Agricultural Office  \n	To support your ongoing rice planting season.\n
36	2025	WET	Mirasol Sobrino	Seed Distribution	October 15, 2025, at 1 pm	Agriculture Office of Calbayog City	For Planting Season
37	2025	DRY	Mirasol Sobrino	Seed Distribution	October 15, 2025, at 1 pm	Agriculture Office of Calbayog City	For Planting Season
\.


--
-- Data for Name: FarmerAccount; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."FarmerAccount" (id, username, password, "createdAt", "updatedAt") FROM stdin;
cbb36734-daab-48c6-b7ad-a3dd50d940af	Jazel	$2b$10$/.T30spk.0dh4dgqcQtcLOaYqmPkYZlXJwXSmo0EOITVRXKZPjwkW	2025-09-30 10:34:08.904	2025-09-30 10:34:08.904
e3c4cbea-426b-4a9a-aab6-bb250a4755d7	seanmaruel	$2b$10$ChBExkQQ99QT6ckMmJFzd.stG3QwavBGg3lbOLzOWbA4JmNp1fALq	2025-10-03 10:14:04.724	2025-10-03 10:14:04.724
83410f57-b76c-4d2f-9fb3-d77f77b77a2f	John 	$2b$10$.P37s5QsxXFecZn.FbNTLukMSsvl60ZykcgqdmVLWXGTt8Ykiw9bS	2025-10-13 06:54:22.954	2025-10-13 06:54:22.954
\.


--
-- Data for Name: Farmer; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Farmer" (id, "accountId", profile, "phoneNumber", "firstName", "lastName", birthday, "addressLineOne", "createdAt", "updatedAt", "civilStatus", gender, indigenous, "middleName", spouse, tribe, "rsbsaNo", "isVerified", otp, "otpCreatedAt") FROM stdin;
94ba1124-3b77-46b2-8e84-8e9ce4dfd4c2	\N	\N	09556615307	ULPIANO 	LEGASPI	1950-08-26 16:00:00	Brgy. Alibaba Calbayog City	2025-09-02 15:18:04.979	2025-10-24 09:00:07.276	MARRIED	MALE	f	DILEMA	\N	\N	08-60-03-003-000004	f	\N	\N
14bb6fc6-178e-4b07-a7f2-b20c1f6c72d2	\N	\N	09776203479	ENRICO	SAGADAL	1976-12-29 16:00:00	Brgy. Acedillo Calbayog City	2025-09-10 00:37:32.412	2025-10-24 08:18:39.992	SINGLE	MALE	f	DACLAG	\N	\N	08-60-03-002-000012	f	\N	\N
3612d19c-a77b-4430-96f5-74a78dfc2443	83410f57-b76c-4d2f-9fb3-d77f77b77a2f	\N	09759353898	ROGELIO	CASALJAY	1953-11-06 16:00:00	Brgy. Alibaba Calbayog City	2025-10-13 06:33:06.851	2025-10-24 08:34:49.42	SINGLE	MALE	f	SUAD	\N	\N	08-60-03-003-000037	t	553314	2025-10-13 06:53:03.393
bbe968ec-0d3c-48cd-8b5e-44ba7e4fb26a	e3c4cbea-426b-4a9a-aab6-bb250a4755d7	\N	09555194663	EDGAR	DEGAMON	1969-03-05 16:00:00	Brgy. Alibaba Calbayog City	2025-10-03 10:13:10.085	2025-10-24 08:48:39.534	MARRIED	MALE	f	DENOY		\N	08-60-03-003-000036	f	106007	2025-10-13 10:50:09.59
0e2057e5-c745-4aeb-9c7a-646cd8b7271c	\N	\N	09264449027	MA. DIVINA	COMONICAL	1962-02-11 16:00:00	Brgy. Cahumpan Calbayog City	2025-10-24 12:42:18.514	2025-10-25 11:47:31.076	MARRIED	FEMALE	f	DIOLON	\N	\N	08-60-03-037-000082	f	\N	\N
27befd0e-6527-4543-9707-8fe9ebfdbcda	\N	\N	09354132456	ROMEO	ESCOTUTO	1990-03-16 16:00:00	Brgy. Anislag Calbayog City 	2025-10-24 11:21:31.275	2025-10-25 11:49:53.77	MARRIED	MALE	f	FRONDA 	\N	\N	08-60-03-005-000073	f	\N	\N
c893e411-3786-4c24-927b-ac56955b4b1b	\N	\N	09388109720	LITO	COMONICAL	1980-08-16 16:00:00	Brgy. Cahumpan Calbayog City	2025-10-24 12:29:24.286	2025-10-24 12:37:59.817	MARRIED	MALE	f	DALUMPINES	\N	\N	08-60-03-037-000009	f	\N	\N
a7cf758f-4027-4af4-80e3-410f1455b0cc	\N	\N	09358100740	NOLITO	GENOTIVA 	1966-09-29 16:00:00	Brgy. Cahumpan Calbayog City	2025-10-24 12:57:26.492	2025-10-25 11:41:04.628	MARRIED	MALE	f	BARANDINO	\N	\N	08-60-03-037-000004	f	\N	\N
6efb84ab-730b-442b-a1f7-66a31ee1f014	\N	\N	09307038821	JUANITA	LORETO	1944-12-15 15:00:00	Brgy. Anislag Calbayog City	2025-10-24 11:02:19.183	2025-10-25 11:50:17.365	WIDOW	FEMALE	f	DOROJA		\N	08-60-03-005-000041	f	\N	\N
6900c5a1-89f1-443b-9b19-ce64493caf53	\N	\N	09555276485	EVELYN	DIOLON	1978-05-26 16:00:00	Brgy. Cahumpan Calbayog City	2025-10-24 12:51:21.418	2025-10-25 11:41:25.598	MARRIED	FEMALE	f	ARIEGA	\N	\N	08-60-03-037-000080	f	\N	\N
7a1428ff-e2d5-423f-a36d-57c89aae2798	\N	\N	09061953295	EMETERIO	RUBION	1948-07-24 16:00:00	Brgy. Acedillo Calbayog City	2025-10-13 06:50:48.256	2025-10-25 11:50:30.133	SINGLE	MALE	f	ESTRELLES	\N	\N	08-60-03-002-000139	f	832005	2025-10-20 19:22:10.717
adc54cbc-3380-4405-841d-6b6fa6f8328a	cbb36734-daab-48c6-b7ad-a3dd50d940af	\N	09165814213	BELEN 	BESTUDIO	1973-12-09 16:00:00	Brgy. Anislag Calbayog City	2025-09-02 15:06:05.138	2025-10-25 11:52:21.194	MARRIED	FEMALE	f	GEMENTIZA			08-60-03-005-000018	t	647812	2025-09-30 10:33:19.729
a280e25d-94df-49e4-b9d4-47d7b9872536	\N	\N	09651739381	DANILO	BRANZUELA	1964-07-04 16:00:00	Brgy. Anislag Calbayog City	2025-08-22 05:54:33.095	2025-10-25 11:52:32.281	MARRIED	MALE	f	CARDENAS	\N	\N	08-60-03-005-000043	f	\N	\N
ced31710-e5f9-432b-9106-b2127905e191	\N	\N	09124701486	EPIFANIA	BRANZUELA	1967-01-05 16:00:00	Brgy. Anislag Calbayog City	2025-08-16 15:01:35.76	2025-10-25 11:52:42.093	SINGLE	FEMALE	f	GETIGAN	\N	\N	08-60-03-005-000045	f	\N	\N
1757621e-8fae-4f3b-813e-cfb66ed9593c	\N	\N	09266001256	GREGORIO	COMONICAL	1967-04-10 16:00:00	Brgy. Cahumpan Calbayog City	2025-10-24 12:35:09.188	2025-10-25 11:42:33.962	SINGLE	MALE	f	REFAMONTE	\N	\N	08-60-03-037-000057	f	\N	\N
cb33eaa8-6f0e-41d6-b775-acc228ce3c4c	\N	\N	09269142636	LORENA	PURALAN	1970-10-22 16:00:00	Brgy. Cagsalaosao Calbayog City	2025-10-24 12:22:47.149	2025-10-25 11:42:58.525	SINGLE	FEMALE	f	LENTESAS	\N	\N	08-60-03-036-000016	f	\N	\N
fdbb2473-59e6-42c3-861e-6e9a9abc381f	\N	\N	09488360619	AMALIA	LAS-AY	1969-11-12 16:00:00	Brgy. Cagsalaosao Calbayog City	2025-10-24 12:05:41.286	2025-10-25 11:43:44.542	SINGLE	FEMALE	f	CERENEO	\N	\N	08-60-03-036-000001	f	\N	\N
510f9404-ca05-4cca-a4c6-25a09282efc7	\N	\N	09067535130	DIONESIO	ORQUIN	1976-10-23 16:00:00	Brgy. Bontay Calbayog City	2025-10-24 11:55:45.366	2025-10-25 11:44:00.415	MARRIED	MALE	f	PALOMERAS	\N	\N	08-60-03-162-000006	f	\N	\N
bbbb1d1d-5485-4fce-8fe8-3d7cf9e9f8bc	\N	\N	09359862367	ELFREDA	MONTA	1960-10-22 16:00:00	Brgy. Anislag Calbayog City	2025-10-24 11:41:36.221	2025-10-25 11:45:13.476	SINGLE	MALE	f	GELLEGO	\N	\N	08-60-03-005-000014	f	\N	\N
6cc7e290-e34e-4679-b880-4138f2eecbcd	\N	\N	09159655809	FERNANDO	CHAN	1961-01-29 16:00:00	Brgy. Anislag Calbayog City	2025-08-16 13:24:30.725	2025-10-25 11:52:57.703	SINGLE	MALE	f	GEMENTIZA	\N	\N	08-60-03-005-000024	f	270927	2025-10-13 08:48:44.839
87e32f86-87b5-4a06-ad2b-b0e4c402af4a	\N	\N	09265667744	MATEO 	MERCADER	1942-01-25 15:00:00	Brgy. Anislag Calbayog City	2025-10-24 11:36:20.653	2025-10-25 11:46:11.734	WIDOW	MALE	f	BARAGENIO	\N	\N	08-60-03-005-000040	f	\N	\N
cbcba2a6-10a1-4746-b40a-3072e4194690	\N	\N	09469491561	HILDA	PINGGOL	1980-10-16 16:00:00	Brgy. Cahumpan Calbayog City	2025-10-25 11:59:33.319	2025-10-25 11:59:33.319	WIDOW	FEMALE	f	TORCULAS	\N	\N	08-60-03-037-000038	f	\N	\N
400b8456-85cd-4136-acdf-fee4ca6f977f	\N	\N	09264072380	BARTOMLOME	GETIGAN	1944-08-23 15:00:00	Brgy. Carayman Calbayog City	2025-10-25 13:17:45.204	2025-10-25 13:17:45.204	WIDOW	MALE	f	MILLAMIS	\N	\N	08-60-03-044-000281	f	\N	\N
\.


--
-- Data for Name: Farm; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Farm" (id, "isPublished", "farmerId", "farmerCount", barangay, address, "landArea", coordinates, "createdAt", "updatedAt", "isFeatured", land_category, soil_type, source_of_irrigation, tenurial_status, topography, weather_risks, index) FROM stdin;
a5c64911-e171-4504-98da-b5f62ef1465b	t	6cc7e290-e34e-4679-b880-4138f2eecbcd	1	Anislag	Brgy. Anislag Calbayog City	1	[{"lat": 12.1059691, "lng": 124.5348811}, {"lat": 12.1059868, "lng": 124.5346464}, {"lat": 12.1059652, "lng": 124.5344754}, {"lat": 12.1060933, "lng": 124.534461}, {"lat": 12.1062635, "lng": 124.534461}, {"lat": 12.1063887, "lng": 124.5344563}, {"lat": 12.1065464, "lng": 124.534468}, {"lat": 12.1065933, "lng": 124.5346806}, {"lat": 12.1066165, "lng": 124.5348368}, {"lat": 12.1066493, "lng": 124.5349475}, {"lat": 12.1066824, "lng": 124.5350816}, {"lat": 12.1066569, "lng": 124.5352194}, {"lat": 12.1064857, "lng": 124.5352868}, {"lat": 12.1063618, "lng": 124.5353595}, {"lat": 12.1063028, "lng": 124.5354001}, {"lat": 12.1062284, "lng": 124.5353907}, {"lat": 12.1061556, "lng": 124.5353662}, {"lat": 12.1060848, "lng": 124.5353867}, {"lat": 12.1060288, "lng": 124.5354195}, {"lat": 12.1059507, "lng": 124.5354494}, {"lat": 12.1058937, "lng": 124.5354487}, {"lat": 12.1058193, "lng": 124.5354219}, {"lat": 12.1057357, "lng": 124.5353994}, {"lat": 12.1056787, "lng": 124.5353987}, {"lat": 12.1056147, "lng": 124.5353763}, {"lat": 12.1055639, "lng": 124.5353434}, {"lat": 12.1055098, "lng": 124.5353119}, {"lat": 12.105497, "lng": 124.5352328}, {"lat": 12.1055003, "lng": 124.5351677}, {"lat": 12.1055265, "lng": 124.5350715}, {"lat": 12.1054938, "lng": 124.5349971}, {"lat": 12.1055108, "lng": 124.5349468}, {"lat": 12.1055098, "lng": 124.5348643}, {"lat": 12.1057449, "lng": 124.5348935}, {"lat": 12.1059691, "lng": 124.5348811}]	2025-08-16 13:24:31.192	2025-10-24 09:52:44.698	t	{RF}	{CL}	{}	{TENANT}	{FLAT}	{FD}	1
6990cb95-6be0-4f0f-a10c-842d5d71caeb	t	ced31710-e5f9-432b-9106-b2127905e191	2	Anislag	Brgy. Anislag Calbayog City	1.2	[{"lat": 12.105978, "lng": 124.5341824}, {"lat": 12.1062268, "lng": 124.5328788}, {"lat": 12.1067031, "lng": 124.5329418}, {"lat": 12.1066818, "lng": 124.5332563}, {"lat": 12.1066572, "lng": 124.5334726}, {"lat": 12.1066375, "lng": 124.5336888}, {"lat": 12.1066182, "lng": 124.5340483}, {"lat": 12.1063684, "lng": 124.5341649}, {"lat": 12.1061625, "lng": 124.5341894}, {"lat": 12.105978, "lng": 124.5341824}]	2025-08-16 15:01:36.197	2025-10-24 09:35:59.666	t	{RF}	{CL}	{}	{TENANT}	{ROLLING}	{FD}	2
e3ffc6bf-9bcc-4b93-be22-4d3cbeb313e6	t	400b8456-85cd-4136-acdf-fee4ca6f977f	10	Carayman	Brgy. Carayman Calbayog City	2.5	[{"lat": 12.0581358771347, "lng": 124.624279104173}, {"lat": 12.0581367, "lng": 124.6242859}, {"lat": 12.0581353, "lng": 124.624295}, {"lat": 12.0581346, "lng": 124.6243437}, {"lat": 12.0581448, "lng": 124.6243707}, {"lat": 12.0581816, "lng": 124.6244123}, {"lat": 12.0581902, "lng": 124.6244533}, {"lat": 12.0582035, "lng": 124.6244702}, {"lat": 12.0582439, "lng": 124.6244934}, {"lat": 12.0582513, "lng": 124.6245028}, {"lat": 12.0582683, "lng": 124.6245443}, {"lat": 12.0582793, "lng": 124.624556}, {"lat": 12.0583093, "lng": 124.6245674}, {"lat": 12.0583363, "lng": 124.6245656}, {"lat": 12.0583828, "lng": 124.6245825}, {"lat": 12.058412, "lng": 124.6246057}, {"lat": 12.0584186, "lng": 124.6246142}, {"lat": 12.0584232, "lng": 124.6246254}, {"lat": 12.0583936, "lng": 124.6247088}, {"lat": 12.0583942, "lng": 124.6247182}, {"lat": 12.0583871, "lng": 124.6247542}, {"lat": 12.0584026, "lng": 124.6247842}, {"lat": 12.0584111, "lng": 124.62482}, {"lat": 12.0584014, "lng": 124.6248635}, {"lat": 12.0584102, "lng": 124.6248944}, {"lat": 12.0584162, "lng": 124.6249035}, {"lat": 12.0584206, "lng": 124.6249147}, {"lat": 12.0584175, "lng": 124.6249357}, {"lat": 12.0584012, "lng": 124.6249623}, {"lat": 12.0583991, "lng": 124.6249717}, {"lat": 12.058405, "lng": 124.6250247}, {"lat": 12.058409, "lng": 124.6250351}, {"lat": 12.0584165, "lng": 124.6250415}, {"lat": 12.0584295, "lng": 124.6250467}, {"lat": 12.058444, "lng": 124.6250414}, {"lat": 12.0584648, "lng": 124.6250559}, {"lat": 12.0584864, "lng": 124.625061}, {"lat": 12.0585142, "lng": 124.6250585}, {"lat": 12.058531, "lng": 124.6250628}, {"lat": 12.0585795, "lng": 124.6251164}, {"lat": 12.058671, "lng": 124.625167}, {"lat": 12.0586807, "lng": 124.6251706}, {"lat": 12.0587746, "lng": 124.6252506}, {"lat": 12.0587961, "lng": 124.6252794}, {"lat": 12.0588079, "lng": 124.6253071}, {"lat": 12.0588171, "lng": 124.62532}, {"lat": 12.0588375, "lng": 124.6253272}, {"lat": 12.0588572, "lng": 124.6253479}, {"lat": 12.0588624, "lng": 124.6253624}, {"lat": 12.0588835, "lng": 124.6253752}, {"lat": 12.0588922, "lng": 124.6253827}, {"lat": 12.0589158, "lng": 124.6254349}, {"lat": 12.0589184, "lng": 124.6254486}, {"lat": 12.0589898, "lng": 124.6255089}, {"lat": 12.0589955, "lng": 124.6255166}, {"lat": 12.0590155, "lng": 124.6255898}, {"lat": 12.0590143, "lng": 124.6256019}, {"lat": 12.0590023, "lng": 124.6256146}, {"lat": 12.0589962, "lng": 124.6256276}, {"lat": 12.0589939, "lng": 124.6256551}, {"lat": 12.0589909, "lng": 124.6256639}, {"lat": 12.0589798, "lng": 124.6256747}, {"lat": 12.0589559, "lng": 124.6257332}, {"lat": 12.0589418, "lng": 124.6257439}, {"lat": 12.058823, "lng": 124.6257805}, {"lat": 12.0587656, "lng": 124.6257722}, {"lat": 12.0587374, "lng": 124.6257783}, {"lat": 12.058724, "lng": 124.6257857}, {"lat": 12.0586997, "lng": 124.6257913}, {"lat": 12.0586864, "lng": 124.6257899}, {"lat": 12.0586743, "lng": 124.6257938}, {"lat": 12.058665, "lng": 124.6257932}, {"lat": 12.05862, "lng": 124.6258045}, {"lat": 12.0586076, "lng": 124.6258012}, {"lat": 12.0585888, "lng": 124.6258019}, {"lat": 12.0585515, "lng": 124.6258214}, {"lat": 12.0585105, "lng": 124.6258138}, {"lat": 12.0584642, "lng": 124.6258344}, {"lat": 12.0584173, "lng": 124.6258474}, {"lat": 12.0584066, "lng": 124.6258451}, {"lat": 12.058384, "lng": 124.6258315}, {"lat": 12.058369, "lng": 124.6258266}, {"lat": 12.0583489, "lng": 124.6258253}, {"lat": 12.0583235, "lng": 124.625811}, {"lat": 12.0583182, "lng": 124.6258021}, {"lat": 12.0583142, "lng": 124.6257439}, {"lat": 12.0583208, "lng": 124.6257085}, {"lat": 12.058317, "lng": 124.625636}, {"lat": 12.0583343, "lng": 124.625565}, {"lat": 12.0583359, "lng": 124.6255045}, {"lat": 12.0583607, "lng": 124.6254421}, {"lat": 12.0583634, "lng": 124.625406}, {"lat": 12.0583558, "lng": 124.6253809}, {"lat": 12.0583563, "lng": 124.6253715}, {"lat": 12.0583637, "lng": 124.6253547}, {"lat": 12.0583636, "lng": 124.6253326}, {"lat": 12.0583797, "lng": 124.6252843}, {"lat": 12.0583748, "lng": 124.6252735}, {"lat": 12.0583589, "lng": 124.6252555}, {"lat": 12.0583365, "lng": 124.6252396}, {"lat": 12.0583274, "lng": 124.6252366}, {"lat": 12.0583194, "lng": 124.625231}, {"lat": 12.0583139, "lng": 124.625221}, {"lat": 12.0583148, "lng": 124.6252116}, {"lat": 12.0583021, "lng": 124.6251521}, {"lat": 12.0582921, "lng": 124.6251297}, {"lat": 12.0582905, "lng": 124.6250764}, {"lat": 12.0582965, "lng": 124.6250462}, {"lat": 12.0582959, "lng": 124.6250027}, {"lat": 12.058299, "lng": 124.6249924}, {"lat": 12.0583153, "lng": 124.6249742}, {"lat": 12.0583117, "lng": 124.6249642}, {"lat": 12.0582973, "lng": 124.6249492}, {"lat": 12.0581938, "lng": 124.6248881}, {"lat": 12.0581735, "lng": 124.6248687}, {"lat": 12.0581515, "lng": 124.6248557}, {"lat": 12.0581411, "lng": 124.6248455}, {"lat": 12.0581316, "lng": 124.6248204}, {"lat": 12.0581288, "lng": 124.6247765}, {"lat": 12.0581318, "lng": 124.6247563}, {"lat": 12.0581287, "lng": 124.6247458}, {"lat": 12.0581128, "lng": 124.6247377}, {"lat": 12.0581047, "lng": 124.6247257}, {"lat": 12.0580719, "lng": 124.624709}, {"lat": 12.0580609, "lng": 124.6247068}, {"lat": 12.0580382, "lng": 124.6247074}, {"lat": 12.0579527, "lng": 124.6246888}, {"lat": 12.0579437, "lng": 124.6246892}, {"lat": 12.0579329, "lng": 124.6246868}, {"lat": 12.057924, "lng": 124.6246825}, {"lat": 12.057874, "lng": 124.624675}, {"lat": 12.0578633, "lng": 124.6246708}, {"lat": 12.0578507, "lng": 124.6246695}, {"lat": 12.0578202, "lng": 124.6246832}, {"lat": 12.0578052, "lng": 124.6246848}, {"lat": 12.0577757, "lng": 124.6246744}, {"lat": 12.0577558, "lng": 124.6246728}, {"lat": 12.0576784, "lng": 124.6246969}, {"lat": 12.0576695, "lng": 124.6247039}, {"lat": 12.0576622, "lng": 124.6247127}, {"lat": 12.0576314, "lng": 124.6247317}, {"lat": 12.0576135, "lng": 124.6247373}, {"lat": 12.0575836, "lng": 124.6247554}, {"lat": 12.0575521, "lng": 124.6247656}, {"lat": 12.057535, "lng": 124.6247756}, {"lat": 12.0575074, "lng": 124.6247846}, {"lat": 12.0574926, "lng": 124.6247934}, {"lat": 12.0574455, "lng": 124.6247968}, {"lat": 12.0573372, "lng": 124.6248308}, {"lat": 12.0573273, "lng": 124.624828}, {"lat": 12.0573208, "lng": 124.62482}, {"lat": 12.0572963, "lng": 124.6246983}, {"lat": 12.057281424037, "lng": 124.624677412212}, {"lat": 12.0577748825087, "lng": 124.624515138566}, {"lat": 12.0577506, "lng": 124.6243297}, {"lat": 12.0577459, "lng": 124.6243179}, {"lat": 12.0577375, "lng": 124.6243073}, {"lat": 12.0577198, "lng": 124.6242929}, {"lat": 12.0577123, "lng": 124.6242699}, {"lat": 12.0576989, "lng": 124.6242597}, {"lat": 12.0576618, "lng": 124.6242635}, {"lat": 12.0574998, "lng": 124.6243022}, {"lat": 12.0574697, "lng": 124.624301}, {"lat": 12.057322, "lng": 124.62434}, {"lat": 12.0572887, "lng": 124.6243588}, {"lat": 12.0572228, "lng": 124.6243813}, {"lat": 12.0572126, "lng": 124.6243827}, {"lat": 12.0571387, "lng": 124.6243736}, {"lat": 12.0571061, "lng": 124.6243644}, {"lat": 12.057091, "lng": 124.6243394}, {"lat": 12.0570653, "lng": 124.6243203}, {"lat": 12.0570273, "lng": 124.6242747}, {"lat": 12.0570024, "lng": 124.6242588}, {"lat": 12.0569911, "lng": 124.6242467}, {"lat": 12.0569857, "lng": 124.6242302}, {"lat": 12.0569656, "lng": 124.6242114}, {"lat": 12.0569601, "lng": 124.6241988}, {"lat": 12.056959, "lng": 124.6241795}, {"lat": 12.0569557, "lng": 124.6241708}, {"lat": 12.0569437, "lng": 124.6241573}, {"lat": 12.0569338, "lng": 124.624111}, {"lat": 12.056929, "lng": 124.6241032}, {"lat": 12.0569151, "lng": 124.6240904}, {"lat": 12.0569102, "lng": 124.6240822}, {"lat": 12.0569043, "lng": 124.6240611}, {"lat": 12.0568983, "lng": 124.6240525}, {"lat": 12.0568535, "lng": 124.6240228}, {"lat": 12.0568483, "lng": 124.6240149}, {"lat": 12.0568416, "lng": 124.62399}, {"lat": 12.0568421, "lng": 124.6239727}, {"lat": 12.0568171, "lng": 124.6238983}, {"lat": 12.0568114, "lng": 124.6238714}, {"lat": 12.0568094, "lng": 124.6238537}, {"lat": 12.0568249, "lng": 124.6238215}, {"lat": 12.056824, "lng": 124.6237728}, {"lat": 12.0568202, "lng": 124.6237404}, {"lat": 12.0568224, "lng": 124.6237236}, {"lat": 12.0568271, "lng": 124.6237143}, {"lat": 12.0568311, "lng": 124.6236968}, {"lat": 12.0568117, "lng": 124.6235716}, {"lat": 12.0568134, "lng": 124.6235622}, {"lat": 12.0568193, "lng": 124.6235517}, {"lat": 12.0568292, "lng": 124.6235454}, {"lat": 12.0568605, "lng": 124.6235403}, {"lat": 12.0568702, "lng": 124.6235364}, {"lat": 12.0569557, "lng": 124.6235339}, {"lat": 12.0569711, "lng": 124.6235389}, {"lat": 12.0570705, "lng": 124.6235309}, {"lat": 12.0570887, "lng": 124.6235335}, {"lat": 12.0570974, "lng": 124.6235374}, {"lat": 12.0572691, "lng": 124.6235638}, {"lat": 12.0572977, "lng": 124.6235821}, {"lat": 12.0573943, "lng": 124.6236088}, {"lat": 12.0573988, "lng": 124.6236172}, {"lat": 12.0574073, "lng": 124.6236571}, {"lat": 12.0574156, "lng": 124.6236692}, {"lat": 12.0574282, "lng": 124.6236758}, {"lat": 12.0574633, "lng": 124.6237181}, {"lat": 12.0574916, "lng": 124.6237385}, {"lat": 12.0574975, "lng": 124.623748}, {"lat": 12.0575021, "lng": 124.6237687}, {"lat": 12.0575209, "lng": 124.6238019}, {"lat": 12.0575198, "lng": 124.6238297}, {"lat": 12.0575221, "lng": 124.6238408}, {"lat": 12.0575325, "lng": 124.6238566}, {"lat": 12.0575415, "lng": 124.6238844}, {"lat": 12.0575571, "lng": 124.6239141}, {"lat": 12.0576119, "lng": 124.623971}, {"lat": 12.0576258, "lng": 124.623976}, {"lat": 12.0576356, "lng": 124.623986}, {"lat": 12.05768, "lng": 124.624008}, {"lat": 12.0576896, "lng": 124.6240083}, {"lat": 12.0576994, "lng": 124.6240056}, {"lat": 12.057751, "lng": 124.6239635}, {"lat": 12.0577564, "lng": 124.6239448}, {"lat": 12.0577635, "lng": 124.6239343}, {"lat": 12.0577747, "lng": 124.6239061}, {"lat": 12.0577936, "lng": 124.6238784}, {"lat": 12.0577945, "lng": 124.6238681}, {"lat": 12.0578526, "lng": 124.6237424}, {"lat": 12.0578828, "lng": 124.6237335}, {"lat": 12.0578916, "lng": 124.6237104}, {"lat": 12.0579006, "lng": 124.6237102}, {"lat": 12.0579106, "lng": 124.6237159}, {"lat": 12.0579266, "lng": 124.6237362}, {"lat": 12.0579999, "lng": 124.6237592}, {"lat": 12.0580601, "lng": 124.623764}, {"lat": 12.0580766, "lng": 124.6237723}, {"lat": 12.058088, "lng": 124.6237974}, {"lat": 12.0580881, "lng": 124.6238103}, {"lat": 12.0580852, "lng": 124.6238202}, {"lat": 12.0580829, "lng": 124.6238586}, {"lat": 12.0580888, "lng": 124.6238801}, {"lat": 12.0580868, "lng": 124.6238913}, {"lat": 12.0580879, "lng": 124.6239014}, {"lat": 12.0581168, "lng": 124.6239593}, {"lat": 12.0581262, "lng": 124.6239605}, {"lat": 12.0581356, "lng": 124.6239592}, {"lat": 12.0581662, "lng": 124.6239622}, {"lat": 12.058178, "lng": 124.6239667}, {"lat": 12.0582068, "lng": 124.6239878}, {"lat": 12.0582197, "lng": 124.6239904}, {"lat": 12.0582537, "lng": 124.6239833}, {"lat": 12.0583385, "lng": 124.6240015}, {"lat": 12.0583861, "lng": 124.6239977}, {"lat": 12.0584768, "lng": 124.6240173}, {"lat": 12.0585122, "lng": 124.6240386}, {"lat": 12.0585448, "lng": 124.6240515}, {"lat": 12.0585855, "lng": 124.6240787}, {"lat": 12.0586009, "lng": 124.6240836}, {"lat": 12.058632, "lng": 124.6241176}, {"lat": 12.0586354, "lng": 124.6241266}, {"lat": 12.058634, "lng": 124.6241482}, {"lat": 12.0586198, "lng": 124.6241779}, {"lat": 12.0586072, "lng": 124.6241864}, {"lat": 12.0586022, "lng": 124.6241968}, {"lat": 12.0585903, "lng": 124.6242082}, {"lat": 12.0585758, "lng": 124.6242319}, {"lat": 12.0585696, "lng": 124.6242494}, {"lat": 12.058541, "lng": 124.6242859}, {"lat": 12.0585244, "lng": 124.6242889}, {"lat": 12.0585078, "lng": 124.6242833}, {"lat": 12.0584436, "lng": 124.624242}, {"lat": 12.0583745, "lng": 124.624227}, {"lat": 12.0583148, "lng": 124.6242372}, {"lat": 12.0582584, "lng": 124.624235}, {"lat": 12.0582023, "lng": 124.6242506}, {"lat": 12.058187, "lng": 124.6242506}, {"lat": 12.058165, "lng": 124.6242558}, {"lat": 12.0581408, "lng": 124.6242676}, {"lat": 12.0581388280424, "lng": 124.624269716442}, {"lat": 12.0581371886493, "lng": 124.624269381166}, {"lat": 12.0581358771347, "lng": 124.624275751412}, {"lat": 12.0581358771347, "lng": 124.624279104173}]	2025-10-25 13:17:45.717	2025-10-25 13:17:45.717	f	{RF}	{SCL}	{}	{OWNER}	{FLAT}	{FD}	25
dd9280fc-e688-4785-9318-fa0537dd2cdd	t	a280e25d-94df-49e4-b9d4-47d7b9872536	1	Anislag	Brgy. Anislag Calbayog City	1	[{"lat": 12.1062218, "lng": 124.5328674}, {"lat": 12.1060907, "lng": 124.5336033}, {"lat": 12.1051673, "lng": 124.5334853}, {"lat": 12.1052777, "lng": 124.5332057}, {"lat": 12.1051656, "lng": 124.5331866}, {"lat": 12.1051653, "lng": 124.5330857}, {"lat": 12.1051394, "lng": 124.5328952}, {"lat": 12.1049869, "lng": 124.5328228}, {"lat": 12.1046352, "lng": 124.5326615}, {"lat": 12.104625, "lng": 124.5323538}, {"lat": 12.1046349, "lng": 124.5320896}, {"lat": 12.1046365, "lng": 124.5319538}, {"lat": 12.1046483, "lng": 124.5318485}, {"lat": 12.1046604, "lng": 124.5316608}, {"lat": 12.104667, "lng": 124.5314767}, {"lat": 12.1045932, "lng": 124.5314472}, {"lat": 12.104606, "lng": 124.5313238}, {"lat": 12.1047463, "lng": 124.5313211}, {"lat": 12.1047457, "lng": 124.5314572}, {"lat": 12.1048103, "lng": 124.5314693}, {"lat": 12.1048525, "lng": 124.5313761}, {"lat": 12.1048745, "lng": 124.5312812}, {"lat": 12.1053505, "lng": 124.5312484}, {"lat": 12.1053298, "lng": 124.5314847}, {"lat": 12.1057321, "lng": 124.5315173}, {"lat": 12.1057104, "lng": 124.5317234}, {"lat": 12.105696, "lng": 124.5318646}, {"lat": 12.105698, "lng": 124.532224}, {"lat": 12.1060799, "lng": 124.5322492}, {"lat": 12.1060235, "lng": 124.5325536}, {"lat": 12.1059737, "lng": 124.5329217}, {"lat": 12.1062218, "lng": 124.5328674}]	2025-08-22 05:54:33.551	2025-10-24 09:25:13.683	f	{RF}	{SiL}	{}	{TENANT}	{FLAT}	{FD}	3
b665f87b-fdf5-401d-b3bc-8123d987ed97	t	adc54cbc-3380-4405-841d-6b6fa6f8328a	3	Anislag	Brgy. Anislag Calbayog City	0.7	[{"lat": 12.1065916, "lng": 124.5344808}, {"lat": 12.1067008, "lng": 124.5345032}, {"lat": 12.1067106, "lng": 124.5344606}, {"lat": 12.1068936, "lng": 124.5344828}, {"lat": 12.1068906, "lng": 124.5345213}, {"lat": 12.106965, "lng": 124.534524}, {"lat": 12.1070788, "lng": 124.5345455}, {"lat": 12.107163, "lng": 124.5345606}, {"lat": 12.1072433, "lng": 124.534577}, {"lat": 12.1072955, "lng": 124.5345941}, {"lat": 12.107344, "lng": 124.5346145}, {"lat": 12.107403, "lng": 124.5346015}, {"lat": 12.1074574, "lng": 124.5345924}, {"lat": 12.1075108, "lng": 124.5345984}, {"lat": 12.1075541, "lng": 124.5346279}, {"lat": 12.1076197, "lng": 124.5346725}, {"lat": 12.1075567, "lng": 124.5347319}, {"lat": 12.1074502, "lng": 124.5348013}, {"lat": 12.1075279, "lng": 124.5349649}, {"lat": 12.1076488, "lng": 124.5352341}, {"lat": 12.1073102, "lng": 124.5352609}, {"lat": 12.107003, "lng": 124.535264}, {"lat": 12.1068713, "lng": 124.5353119}, {"lat": 12.1066569, "lng": 124.5352485}, {"lat": 12.1066874, "lng": 124.53509}, {"lat": 12.1066516, "lng": 124.5349361}, {"lat": 12.1066277, "lng": 124.5348764}, {"lat": 12.1066326, "lng": 124.5348516}, {"lat": 12.1066113, "lng": 124.5348294}, {"lat": 12.1066044, "lng": 124.5348046}, {"lat": 12.1065864, "lng": 124.5347108}, {"lat": 12.1065769, "lng": 124.5345974}, {"lat": 12.1065706, "lng": 124.5345015}, {"lat": 12.1065916, "lng": 124.5344808}]	2025-09-02 15:06:05.333	2025-10-24 09:37:54.087	f	{RF}	{CL}	{SWIP}	{TENANT}	{ROLLING}	{FD}	4
f62a4543-5e30-4835-a276-5f760c73300c	t	7a1428ff-e2d5-423f-a36d-57c89aae2798	3	Acedillo	Brgy. Acedillo Calbayog City	1.7	[{"lat": 12.1025617, "lng": 124.5525656}, {"lat": 12.1031426, "lng": 124.5523775}, {"lat": 12.1037416, "lng": 124.5522216}, {"lat": 12.1037347, "lng": 124.5523771}, {"lat": 12.1036763, "lng": 124.5525065}, {"lat": 12.1035904, "lng": 124.5527245}, {"lat": 12.103377, "lng": 124.5527986}, {"lat": 12.1032849, "lng": 124.5529059}, {"lat": 12.1030512, "lng": 124.5529662}, {"lat": 12.1028784, "lng": 124.5530249}, {"lat": 12.1026722, "lng": 124.5530903}, {"lat": 12.1026296, "lng": 124.5528485}, {"lat": 12.1025617, "lng": 124.5525656}]	2025-10-13 06:50:48.71	2025-10-24 09:36:51.871	f	{RF}	{CL}	{DW}	{TENANT}	{FLAT}	{FD}	9
08b0d61f-cb6d-4e57-b9f0-21896663facc	t	94ba1124-3b77-46b2-8e84-8e9ce4dfd4c2	6	Alibaba	Brgy. Alibaba Calbayog City	1	[{"lat": 12.1290708902321, "lng": 124.650777988136}, {"lat": 12.1289705859605, "lng": 124.650901705027}, {"lat": 12.1288860156631, "lng": 124.651031792164}, {"lat": 12.128837502457, "lng": 124.651177637279}, {"lat": 12.1288709372351, "lng": 124.651204124093}, {"lat": 12.1287401482264, "lng": 124.65127017349}, {"lat": 12.1286382048694, "lng": 124.651261456311}, {"lat": 12.1285624848588, "lng": 124.651367738843}, {"lat": 12.1285326557577, "lng": 124.651458933949}, {"lat": 12.1284834869026, "lng": 124.651525989175}, {"lat": 12.1284228453022, "lng": 124.651556834579}, {"lat": 12.1283638426506, "lng": 124.651559852064}, {"lat": 12.1282746830636, "lng": 124.651589356363}, {"lat": 12.1281927348874, "lng": 124.651597738266}, {"lat": 12.1281396324558, "lng": 124.651528000832}, {"lat": 12.1281288152925, "lng": 124.651414677501}, {"lat": 12.1281747062853, "lng": 124.651333205402}, {"lat": 12.1282500986134, "lng": 124.651211164892}, {"lat": 12.1283543366667, "lng": 124.651072695851}, {"lat": 12.128459885849, "lng": 124.650960713625}, {"lat": 12.1285333113424, "lng": 124.650891311467}, {"lat": 12.128566090574, "lng": 124.650845713913}, {"lat": 12.1284841424874, "lng": 124.650815539062}, {"lat": 12.1284703752064, "lng": 124.650756530464}, {"lat": 12.1284448073969, "lng": 124.650692828}, {"lat": 12.1284074390555, "lng": 124.650633819401}, {"lat": 12.1283638426506, "lng": 124.65055167675}, {"lat": 12.1283799044849, "lng": 124.650433659554}, {"lat": 12.1284054723006, "lng": 124.650344140828}, {"lat": 12.1284238286796, "lng": 124.65027641505}, {"lat": 12.1284100613954, "lng": 124.650232158601}, {"lat": 12.1284920095048, "lng": 124.649995453656}, {"lat": 12.128694257331, "lng": 124.650068543851}, {"lat": 12.1288388136249, "lng": 124.650109782815}, {"lat": 12.12894698495, "lng": 124.650145657361}, {"lat": 12.1290912133152, "lng": 124.650521837175}, {"lat": 12.129038766646, "lng": 124.6505888924}, {"lat": 12.1290089375982, "lng": 124.650683104992}, {"lat": 12.1290708902321, "lng": 124.650777988136}]	2025-09-02 15:18:05.433	2025-10-24 09:04:41.705	f	{RF}	{SCL}	{NIA_CIS}	{TENANT}	{FLAT}	{FD}	5
457a6c14-0f42-4e81-885f-57351c10cf29	t	3612d19c-a77b-4430-96f5-74a78dfc2443	1	Alibaba	Brgy. Alibaba Calbayog City	1	[{"lat": 12.1276980951611, "lng": 124.643766358495}, {"lat": 12.1276774441784, "lng": 124.643927626312}, {"lat": 12.1276367977952, "lng": 124.644032903016}, {"lat": 12.127551243694, "lng": 124.644099958241}, {"lat": 12.1274581503113, "lng": 124.644123762846}, {"lat": 12.1273611233708, "lng": 124.644041955471}, {"lat": 12.1272817972649, "lng": 124.643973559141}, {"lat": 12.1271978820197, "lng": 124.64390181005}, {"lat": 12.127205749075, "lng": 124.643782451749}, {"lat": 12.1272663909523, "lng": 124.64369662106}, {"lat": 12.1273493227946, "lng": 124.643613807857}, {"lat": 12.1273142488565, "lng": 124.643521271646}, {"lat": 12.1272536069901, "lng": 124.643491767347}, {"lat": 12.127214599512, "lng": 124.643424376845}, {"lat": 12.1271657582079, "lng": 124.643344916403}, {"lat": 12.12710609969, "lng": 124.643276184797}, {"lat": 12.1271001993963, "lng": 124.643220193684}, {"lat": 12.1271795255563, "lng": 124.643186666071}, {"lat": 12.1272447565544, "lng": 124.643174596131}, {"lat": 12.1273178545887, "lng": 124.643150120974}, {"lat": 12.127354895289, "lng": 124.64321449399}, {"lat": 12.127340472362, "lng": 124.643262773752}, {"lat": 12.127331949723, "lng": 124.64329328388}, {"lat": 12.1273575176392, "lng": 124.643336869776}, {"lat": 12.1273149044442, "lng": 124.643433429301}, {"lat": 12.1274309434363, "lng": 124.643486738205}, {"lat": 12.1274148815449, "lng": 124.64357458055}, {"lat": 12.1275138752274, "lng": 124.643582962453}, {"lat": 12.1276158190143, "lng": 124.643666446209}, {"lat": 12.1276980951611, "lng": 124.643766358495}]	2025-10-13 06:33:07.326	2025-10-24 08:38:20.89	f	{RF}	{CL}	{DW}	{TENANT}	{FLAT}	{FD}	8
07cd569e-ef4c-4069-bbcf-8d33bad3d3a8	t	27befd0e-6527-4543-9707-8fe9ebfdbcda	1	Anislag	Brgy. Anislag Calbayog City 	0.5	[{"lat": 12.1075728, "lng": 124.5362946}, {"lat": 12.1078416, "lng": 124.5366483}, {"lat": 12.1076433, "lng": 124.536877}, {"lat": 12.1074518, "lng": 124.5370342}, {"lat": 12.1072837, "lng": 124.5371717}, {"lat": 12.1072142, "lng": 124.5371824}, {"lat": 12.1071204, "lng": 124.5371978}, {"lat": 12.1070398, "lng": 124.5370822}, {"lat": 12.1070368, "lng": 124.5369088}, {"lat": 12.1072096, "lng": 124.5367144}, {"lat": 12.1072342, "lng": 124.5366238}, {"lat": 12.1075728, "lng": 124.5362946}]	2025-10-24 11:21:31.786	2025-10-24 11:21:31.786	f	{RF}	{CL}	{}	{TENANT}	{FLAT}	{FD}	11
9a0753f1-3cf2-42b6-b02a-bd3e2eb379ef	t	bbe968ec-0d3c-48cd-8b5e-44ba7e4fb26a	2	Alibaba	Brgy. Alibaba Calbayog City	1	[{"lat": 12.1305718, "lng": 124.6442461}, {"lat": 12.1305679, "lng": 124.6441348}, {"lat": 12.1305856, "lng": 124.6440322}, {"lat": 12.130643, "lng": 124.6439152}, {"lat": 12.1306672, "lng": 124.6438398}, {"lat": 12.1307751, "lng": 124.6437603}, {"lat": 12.1308278, "lng": 124.6437221}, {"lat": 12.130956, "lng": 124.6437325}, {"lat": 12.1309973, "lng": 124.6438264}, {"lat": 12.1310665, "lng": 124.6439363}, {"lat": 12.1311117, "lng": 124.6440094}, {"lat": 12.131289, "lng": 124.6442512}, {"lat": 12.1314556, "lng": 124.6444641}, {"lat": 12.1314189, "lng": 124.6444879}, {"lat": 12.1313707, "lng": 124.6445033}, {"lat": 12.1313015, "lng": 124.6445395}, {"lat": 12.1312225, "lng": 124.6445583}, {"lat": 12.131152, "lng": 124.6445439}, {"lat": 12.1310711, "lng": 124.6445137}, {"lat": 12.1310478, "lng": 124.6444681}, {"lat": 12.1309839, "lng": 124.6444604}, {"lat": 12.1309449, "lng": 124.6444828}, {"lat": 12.1308773, "lng": 124.644566}, {"lat": 12.1308928, "lng": 124.6447444}, {"lat": 12.1308708, "lng": 124.6448356}, {"lat": 12.130876, "lng": 124.6449988}, {"lat": 12.13086, "lng": 124.645143}, {"lat": 12.1307518, "lng": 124.6451591}, {"lat": 12.130641, "lng": 124.6451172}, {"lat": 12.1305302, "lng": 124.6451209}, {"lat": 12.130423, "lng": 124.6451112}, {"lat": 12.1304168, "lng": 124.645035}, {"lat": 12.1303971, "lng": 124.6448946}, {"lat": 12.1304142, "lng": 124.6447024}, {"lat": 12.1304538, "lng": 124.6445831}, {"lat": 12.1305086, "lng": 124.6444393}, {"lat": 12.1305718, "lng": 124.6442461}]	2025-10-03 10:13:10.204	2025-10-24 08:52:46.845	f	{RF}	{SCL}	{DW}	{TENANT}	{FLAT}	{FD}	7
dbf055c4-bc93-4f32-9dd3-cb78d0618d17	t	14bb6fc6-178e-4b07-a7f2-b20c1f6c72d2	5	Acedillo	Brgy. Acedillo Calbayog City	1	[{"lat": 12.102403, "lng": 124.5469225}, {"lat": 12.1037524, "lng": 124.547125}, {"lat": 12.1037642, "lng": 124.5473986}, {"lat": 12.103733, "lng": 124.5476574}, {"lat": 12.1032819, "lng": 124.5476336}, {"lat": 12.1029843, "lng": 124.5475864}, {"lat": 12.1027928, "lng": 124.5475656}, {"lat": 12.102542, "lng": 124.547515}, {"lat": 12.1024096, "lng": 124.5474875}, {"lat": 12.1023804, "lng": 124.5472286}, {"lat": 12.102403, "lng": 124.5469225}]	2025-09-10 00:37:32.894	2025-10-24 08:41:29.028	f	{RF}	{CL}	{DW}	{TENANT}	{FLAT}	{FD}	6
2e684ba2-66dd-42e6-bf01-8e8571d86280	t	6efb84ab-730b-442b-a1f7-66a31ee1f014	5	Anislag	Brgy. Anislag Calbayog City	1	[{"lat": 12.1085028, "lng": 124.5342065}, {"lat": 12.1084497, "lng": 124.5337375}, {"lat": 12.108848, "lng": 124.5337834}, {"lat": 12.1090565, "lng": 124.5337834}, {"lat": 12.109167, "lng": 124.5335494}, {"lat": 12.1092378, "lng": 124.5335712}, {"lat": 12.1091843, "lng": 124.5338514}, {"lat": 12.1092079, "lng": 124.5340271}, {"lat": 12.1087257, "lng": 124.5341565}, {"lat": 12.1085028, "lng": 124.5342065}]	2025-10-24 11:02:19.374	2025-10-24 11:32:08.967	f	{RF}	{SCL}	{}	{TENANT}	{HILLY}	{FD}	10
acc9a0b4-9931-4314-aec7-8cb92e523f8c	t	87e32f86-87b5-4a06-ad2b-b0e4c402af4a	2	Anislag	Brgy. Anislag Calbayog City	1	[{"lat": 12.1035927, "lng": 124.5326381}, {"lat": 12.1036071, "lng": 124.5317875}, {"lat": 12.1036399, "lng": 124.5314385}, {"lat": 12.1037012, "lng": 124.531239}, {"lat": 12.1037907, "lng": 124.5312524}, {"lat": 12.103872, "lng": 124.5312601}, {"lat": 12.1039514, "lng": 124.5312651}, {"lat": 12.1040084, "lng": 124.5312554}, {"lat": 12.104133, "lng": 124.5312417}, {"lat": 12.1041251, "lng": 124.5313972}, {"lat": 12.1041212, "lng": 124.5315042}, {"lat": 12.1041202, "lng": 124.5316215}, {"lat": 12.1041208, "lng": 124.5318415}, {"lat": 12.1041166, "lng": 124.5319907}, {"lat": 12.1040959, "lng": 124.53222}, {"lat": 12.1041048, "lng": 124.5324118}, {"lat": 12.1040972, "lng": 124.532623}, {"lat": 12.1038714, "lng": 124.5326837}, {"lat": 12.1035927, "lng": 124.5326381}]	2025-10-24 11:36:21.108	2025-10-24 11:36:21.108	f	{RF}	{SCL}	{}	{TENANT}	{FLAT}	{FD}	12
7bb3c65c-99ad-4aa7-a8bc-322c1b586082	t	bbbb1d1d-5485-4fce-8fe8-3d7cf9e9f8bc	4	Anislag	Brgy. Anislag Calbayog City	1	[{"lat": 12.1041277, "lng": 124.5315484}, {"lat": 12.1042549, "lng": 124.5314945}, {"lat": 12.1043788, "lng": 124.5314794}, {"lat": 12.1045162, "lng": 124.5315142}, {"lat": 12.1045834, "lng": 124.5314603}, {"lat": 12.1046617, "lng": 124.5314787}, {"lat": 12.1046562, "lng": 124.5316698}, {"lat": 12.1046424, "lng": 124.5318411}, {"lat": 12.1046336, "lng": 124.5319565}, {"lat": 12.1046313, "lng": 124.5320849}, {"lat": 12.1046204, "lng": 124.5323581}, {"lat": 12.1046211, "lng": 124.5325787}, {"lat": 12.1046224, "lng": 124.5327098}, {"lat": 12.1043713, "lng": 124.532687}, {"lat": 12.1041179, "lng": 124.5326391}, {"lat": 12.1041277, "lng": 124.5315484}]	2025-10-24 11:41:36.735	2025-10-24 11:41:36.735	f	{RF}	{CL}	{}	{TENANT}	{FLAT}	{FD}	13
1697e50c-0858-42df-b9c7-44f064dc1268	t	510f9404-ca05-4cca-a4c6-25a09282efc7	8	Bontay	Brgy. Bontay Calbayog City	1.5	[{"lat": 12.1032715, "lng": 124.5596198}, {"lat": 12.1033665, "lng": 124.5592419}, {"lat": 12.1035819, "lng": 124.5592335}, {"lat": 12.1036924, "lng": 124.5592416}, {"lat": 12.1038727, "lng": 124.5594421}, {"lat": 12.1040268, "lng": 124.5595497}, {"lat": 12.1037884, "lng": 124.5601733}, {"lat": 12.1036986, "lng": 124.5603708}, {"lat": 12.1034727, "lng": 124.5606373}, {"lat": 12.1034068, "lng": 124.5605599}, {"lat": 12.1032633, "lng": 124.560468}, {"lat": 12.1031564, "lng": 124.5603808}, {"lat": 12.1031348, "lng": 124.5602668}, {"lat": 12.1030928, "lng": 124.5601515}, {"lat": 12.1030587, "lng": 124.5599098}, {"lat": 12.1031875, "lng": 124.5599155}, {"lat": 12.1032715, "lng": 124.5596198}]	2025-10-24 11:55:45.842	2025-10-24 11:55:45.842	f	{RF}	{CL}	{}	{TENANT}	{FLAT}	{FD}	14
870193ba-351b-44dc-97af-34b245eb5d26	t	fdbb2473-59e6-42c3-861e-6e9a9abc381f	2	Cagsalaosao	Brgy. Cagsalaosao Calbayog City	1	[{"lat": 12.0858005, "lng": 124.5387106}, {"lat": 12.0860356, "lng": 124.5388353}, {"lat": 12.0859015, "lng": 124.5392082}, {"lat": 12.0854146, "lng": 124.5390533}, {"lat": 12.0854786, "lng": 124.5387693}, {"lat": 12.0857484, "lng": 124.5388444}, {"lat": 12.0858005, "lng": 124.5387106}]	2025-10-24 12:05:41.73	2025-10-24 12:05:41.73	f	{RF}	{SCL}	{}	{TENANT}	{HILLY}	{FD}	15
ef8e7757-ed2c-474d-8a8f-2eba7321a7b0	t	cb33eaa8-6f0e-41d6-b775-acc228ce3c4c	3	Cagsalaosao	Brgy. Cagsalaosao Calbayog City	1	[{"lat": 12.082981, "lng": 124.540849}, {"lat": 12.0831866, "lng": 124.5410646}, {"lat": 12.0829224, "lng": 124.541142}, {"lat": 12.0826289, "lng": 124.5412124}, {"lat": 12.0824647, "lng": 124.541376}, {"lat": 12.0823263, "lng": 124.5412382}, {"lat": 12.0822653, "lng": 124.5411196}, {"lat": 12.0823565, "lng": 124.5410367}, {"lat": 12.0823378, "lng": 124.5409895}, {"lat": 12.0825198, "lng": 124.5407853}, {"lat": 12.0826453, "lng": 124.5406797}, {"lat": 12.0828283, "lng": 124.5405731}, {"lat": 12.0829155, "lng": 124.5406877}, {"lat": 12.0830125, "lng": 124.5407977}, {"lat": 12.082981, "lng": 124.540849}]	2025-10-24 12:22:47.659	2025-10-24 12:22:47.659	f	{RF}	{SCL}	{}	{TENANT}	{HILLY}	{FD}	16
b3e4be87-d348-4918-a6ad-90e18928abcd	t	c893e411-3786-4c24-927b-ac56955b4b1b	1	Cahumpan	Brgy. Cahumpan Calbayog City	0.5	[{"lat": 12.080166449138, "lng": 124.5314797014}, {"lat": 12.0803162773161, "lng": 124.531400576234}, {"lat": 12.080483809381, "lng": 124.531303681433}, {"lat": 12.0806201954856, "lng": 124.531524293125}, {"lat": 12.0807041253616, "lng": 124.531641304493}, {"lat": 12.0807588764774, "lng": 124.531698971987}, {"lat": 12.0807680563041, "lng": 124.531731829047}, {"lat": 12.0807913337205, "lng": 124.531754627824}, {"lat": 12.080819856749, "lng": 124.531800560653}, {"lat": 12.0808746078411, "lng": 124.531898461282}, {"lat": 12.0809162448918, "lng": 124.531980268657}, {"lat": 12.0809805036344, "lng": 124.532074145973}, {"lat": 12.0810034531815, "lng": 124.532126784325}, {"lat": 12.0810218128179, "lng": 124.532155282795}, {"lat": 12.0810319761875, "lng": 124.532177075744}, {"lat": 12.0808857547687, "lng": 124.532270282507}, {"lat": 12.0808077262659, "lng": 124.532314874232}, {"lat": 12.0806362601905, "lng": 124.532443620265}, {"lat": 12.08051954517, "lng": 124.532206580043}, {"lat": 12.080399879436, "lng": 124.531966857612}, {"lat": 12.0802743123206, "lng": 124.531715735793}, {"lat": 12.080166449138, "lng": 124.5314797014}]	2025-10-24 12:29:24.737	2025-10-24 12:29:24.737	f	{RF}	{SCL}	{}	{TENANT}	{HILLY}	{FD}	17
3bfa781a-f683-4a90-a105-263bfa6bae40	t	1757621e-8fae-4f3b-813e-cfb66ed9593c	1	Cahumpan	Brgy. Cahumpan Calbayog City	0.12	[{"lat": 12.0823656692079, "lng": 124.531785473228}, {"lat": 12.0824269769623, "lng": 124.531770050526}, {"lat": 12.0824968087724, "lng": 124.531808272004}, {"lat": 12.0825659848668, "lng": 124.531867951155}, {"lat": 12.0826394229759, "lng": 124.531942047179}, {"lat": 12.0826712242937, "lng": 124.531980603933}, {"lat": 12.0827151560048, "lng": 124.532093591988}, {"lat": 12.0827708902548, "lng": 124.532219991088}, {"lat": 12.0828125270105, "lng": 124.53234706074}, {"lat": 12.08285613085, "lng": 124.532431215048}, {"lat": 12.0828836701134, "lng": 124.532511681318}, {"lat": 12.0829020296208, "lng": 124.532589800656}, {"lat": 12.082887932142, "lng": 124.532601870596}, {"lat": 12.0828462953981, "lng": 124.532609581947}, {"lat": 12.0827928561031, "lng": 124.532511346042}, {"lat": 12.0827328598266, "lng": 124.532413780689}, {"lat": 12.0826531926191, "lng": 124.532263241708}, {"lat": 12.082570902598, "lng": 124.53211504966}, {"lat": 12.0823656692079, "lng": 124.531785473228}]	2025-10-24 12:35:09.663	2025-10-24 12:35:09.663	f	{RF}	{SCL}	{}	{TENANT}	{ROLLING}	{FD}	18
04d339c2-c39c-4e2c-a122-9a93ff222614	t	0e2057e5-c745-4aeb-9c7a-646cd8b7271c	4	Cahumpan	Brgy. Cahumpan Calbayog City	1	[{"lat": 12.0797690926007, "lng": 124.52951297164}, {"lat": 12.079788108026, "lng": 124.52977783978}, {"lat": 12.0798123690839, "lng": 124.52989384532}, {"lat": 12.0797966321817, "lng": 124.529917985201}, {"lat": 12.0796559835776, "lng": 124.529986381531}, {"lat": 12.0795264818837, "lng": 124.530062489212}, {"lat": 12.0793835381692, "lng": 124.530138932168}, {"lat": 12.0793537035769, "lng": 124.529946818948}, {"lat": 12.0793350159735, "lng": 124.529931731522}, {"lat": 12.0793592770724, "lng": 124.529924020171}, {"lat": 12.0793389502059, "lng": 124.529638700187}, {"lat": 12.0794586164141, "lng": 124.529629647732}, {"lat": 12.0794946801924, "lng": 124.529330581427}, {"lat": 12.0795815610928, "lng": 124.529101252556}, {"lat": 12.0797356516771, "lng": 124.529117681086}, {"lat": 12.0799133475174, "lng": 124.529112651944}, {"lat": 12.0800500617644, "lng": 124.529089517891}, {"lat": 12.0800398983576, "lng": 124.529238380492}, {"lat": 12.0800320299133, "lng": 124.5293225348}, {"lat": 12.0800012118377, "lng": 124.529516994953}, {"lat": 12.0797690926007, "lng": 124.52951297164}]	2025-10-24 12:42:18.944	2025-10-24 12:42:18.944	f	{RF}	{SCL}	{}	{TENANT}	{FLAT}	{FD}	19
541988d1-0f18-4566-8682-243a7a128372	t	6900c5a1-89f1-443b-9b19-ce64493caf53	1	Cahumpan	Brgy. Cahumpan Calbayog City	0.6	[{"lat": 12.0794041928849, "lng": 124.527794346213}, {"lat": 12.0794251754517, "lng": 124.527786299586}, {"lat": 12.0795359896052, "lng": 124.527839943767}, {"lat": 12.0796064778742, "lng": 124.527865424752}, {"lat": 12.0796212312305, "lng": 124.527884870768}, {"lat": 12.079754994957, "lng": 124.527947902679}, {"lat": 12.0798923649889, "lng": 124.528008922935}, {"lat": 12.0799008891413, "lng": 124.528018981218}, {"lat": 12.0798484328145, "lng": 124.528132304549}, {"lat": 12.0797963043296, "lng": 124.528237916529}, {"lat": 12.0797353238249, "lng": 124.528389461339}, {"lat": 12.0797212261794, "lng": 124.528417959809}, {"lat": 12.0796887688066, "lng": 124.528512507677}, {"lat": 12.0796510657929, "lng": 124.528641924262}, {"lat": 12.0796166412975, "lng": 124.528781734407}, {"lat": 12.0796058221694, "lng": 124.528880640864}, {"lat": 12.0795881181408, "lng": 124.528901092708}, {"lat": 12.0794110777898, "lng": 124.528859183192}, {"lat": 12.0793268196558, "lng": 124.528840072453}, {"lat": 12.0792301030879, "lng": 124.52882733196}, {"lat": 12.0791048632769, "lng": 124.528816603124}, {"lat": 12.0791032240119, "lng": 124.528616778553}, {"lat": 12.0791304358085, "lng": 124.528523571789}, {"lat": 12.0791261737201, "lng": 124.528458192945}, {"lat": 12.0791871543635, "lng": 124.528257362545}, {"lat": 12.0792163332686, "lng": 124.528227522969}, {"lat": 12.0792445286121, "lng": 124.528160467744}, {"lat": 12.0793297703302, "lng": 124.527979418635}, {"lat": 12.0793714076211, "lng": 124.527886547148}, {"lat": 12.0794041928849, "lng": 124.527794346213}]	2025-10-24 12:51:21.878	2025-10-24 12:51:21.878	f	{RF}	{SCL}	{}	{TENANT}	{FLAT}	{FD}	20
b036b3c8-994a-44af-89e3-3c3059c27638	t	a7cf758f-4027-4af4-80e3-410f1455b0cc	3	Cahumpan	Brgy. Cahumpan Calbayog City	1	[{"lat": 12.0790615866793, "lng": 124.527549594641}, {"lat": 12.0791310915144, "lng": 124.527580104768}, {"lat": 12.0791838758346, "lng": 124.527606926858}, {"lat": 12.0791848593933, "lng": 124.527632072568}, {"lat": 12.0792927229714, "lng": 124.527689740062}, {"lat": 12.0793428844382, "lng": 124.527723267674}, {"lat": 12.0793799317901, "lng": 124.527756124735}, {"lat": 12.0793973079799, "lng": 124.527778252959}, {"lat": 12.0793973079799, "lng": 124.527800381184}, {"lat": 12.0793796039374, "lng": 124.527849666774}, {"lat": 12.0792986243209, "lng": 124.52802836895}, {"lat": 12.0792445286121, "lng": 124.528134316206}, {"lat": 12.0792215789141, "lng": 124.528186619282}, {"lat": 12.0792123990344, "lng": 124.528225846589}, {"lat": 12.0791845315404, "lng": 124.528255015612}, {"lat": 12.0791635489548, "lng": 124.528311006725}, {"lat": 12.0791448613381, "lng": 124.528380744159}, {"lat": 12.0791228951904, "lng": 124.528456516564}, {"lat": 12.079126829426, "lng": 124.528522230685}, {"lat": 12.0790956833931, "lng": 124.528529271483}, {"lat": 12.079022900018, "lng": 124.528505466878}, {"lat": 12.0789714270787, "lng": 124.528485350311}, {"lat": 12.0789763448759, "lng": 124.528404213488}, {"lat": 12.0789642143093, "lng": 124.528297930956}, {"lat": 12.0789399531746, "lng": 124.528215453029}, {"lat": 12.0788999550828, "lng": 124.528206065297}, {"lat": 12.078900282936, "lng": 124.528189636767}, {"lat": 12.0788688090235, "lng": 124.528145045042}, {"lat": 12.0788986436698, "lng": 124.528044126928}, {"lat": 12.0789337239639, "lng": 124.527930133045}, {"lat": 12.0789625750435, "lng": 124.527832232416}, {"lat": 12.0789829019386, "lng": 124.527734667063}, {"lat": 12.0789976553293, "lng": 124.527668617666}, {"lat": 12.0790242114304, "lng": 124.527606256306}, {"lat": 12.0790615866793, "lng": 124.527549594641}]	2025-10-24 12:57:26.915	2025-10-24 12:57:26.915	f	{RF}	{SCL}	{}	{TENANT}	{ROLLING}	{FD}	21
088e58f9-eadf-4bf1-8637-9e7c5f66288c	t	cbcba2a6-10a1-4746-b40a-3072e4194690	3	Cahumpan	Brgy. Cahumpan Calbayog City	1	[{"lat": 12.0816575144493, "lng": 124.526693634689}, {"lat": 12.0817312806574, "lng": 124.526701010764}, {"lat": 12.0817840644649, "lng": 124.526708722115}, {"lat": 12.0818375039613, "lng": 124.526717439294}, {"lat": 12.0819109422703, "lng": 124.526740908623}, {"lat": 12.0820053629236, "lng": 124.526776112616}, {"lat": 12.0820925708586, "lng": 124.526787512004}, {"lat": 12.0821640420021, "lng": 124.526805952191}, {"lat": 12.0822266611994, "lng": 124.526826739311}, {"lat": 12.0822709208326, "lng": 124.526853226125}, {"lat": 12.0823112462698, "lng": 124.526899158955}, {"lat": 12.0823387855893, "lng": 124.526946097612}, {"lat": 12.0824059946308, "lng": 124.527015164495}, {"lat": 12.0824640238873, "lng": 124.527073167264}, {"lat": 12.0824836948189, "lng": 124.527126811445}, {"lat": 12.0824797606327, "lng": 124.527200572193}, {"lat": 12.082335507099, "lng": 124.527181461453}, {"lat": 12.0821905977891, "lng": 124.52717307955}, {"lat": 12.0821030620368, "lng": 124.527169056237}, {"lat": 12.0820168376535, "lng": 124.527165703475}, {"lat": 12.0819158600135, "lng": 124.527160674334}, {"lat": 12.0816916108324, "lng": 124.527155309916}, {"lat": 12.0816004685677, "lng": 124.527169391513}, {"lat": 12.0815670278729, "lng": 124.526931680739}, {"lat": 12.0815821089711, "lng": 124.526887759566}, {"lat": 12.081603747067, "lng": 124.5268381387}, {"lat": 12.0816194838629, "lng": 124.526815004647}, {"lat": 12.0816407941059, "lng": 124.526753649116}, {"lat": 12.0816575144493, "lng": 124.526693634689}]	2025-10-25 11:59:33.755	2025-10-25 11:59:33.755	f	{RF}	{SCL}	{}	{TENANT}	{FLAT}	{FD}	24
\.


--
-- Data for Name: Distribution; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Distribution" (id, "createdAt", "updatedAt", "distributionBatchId", "farmId", season, year) FROM stdin;
c1d08300-a618-4e09-802f-2c0822555710	2025-09-23 14:17:35.998	2025-09-23 14:17:35.998	1	08b0d61f-cb6d-4e57-b9f0-21896663facc	DRY	2024
9c3dc262-dfc3-4d21-abe7-af4debc44ed6	2025-09-23 14:17:35.998	2025-09-23 14:17:35.998	1	dd9280fc-e688-4785-9318-fa0537dd2cdd	DRY	2024
6708b5af-dd61-4a01-9791-43bad7e349bd	2025-09-23 14:34:05.459	2025-09-23 14:34:05.459	2	dd9280fc-e688-4785-9318-fa0537dd2cdd	DRY	2025
fe6e77bd-7ec9-4d1e-a2f2-ccd70c9bf27d	2025-09-23 14:34:05.459	2025-09-23 14:34:05.459	2	08b0d61f-cb6d-4e57-b9f0-21896663facc	DRY	2025
08b0d90c-6451-441c-ba03-534540362623	2025-09-23 14:43:10.662	2025-09-23 14:43:10.662	8	dd9280fc-e688-4785-9318-fa0537dd2cdd	WET	2025
f1688493-4f86-4f29-91a2-ff3a17ab72f0	2025-09-23 14:43:54.45	2025-09-23 14:43:54.45	9	08b0d61f-cb6d-4e57-b9f0-21896663facc	WET	2025
0497de00-6a93-40cd-9700-40fbd22f8a2e	2025-09-23 14:47:37.4	2025-09-23 14:47:37.4	14	dd9280fc-e688-4785-9318-fa0537dd2cdd	WET	2023
4c437f00-f0a0-4f05-af69-ac2798ca81f2	2025-09-23 14:52:22.706	2025-09-23 14:52:22.706	21	08b0d61f-cb6d-4e57-b9f0-21896663facc	WET	2023
d0273b66-3f17-45b9-a5e8-a20cfbe64823	2025-09-23 14:53:09.708	2025-09-23 14:53:09.708	24	dd9280fc-e688-4785-9318-fa0537dd2cdd	WET	2021
35490599-09dd-4f19-9ef5-c4728125c16a	2025-09-23 14:53:10.086	2025-09-23 14:53:10.086	24	08b0d61f-cb6d-4e57-b9f0-21896663facc	WET	2021
1602fe6d-47c9-46a6-9fc1-a67db676065d	2025-09-23 14:53:22.557	2025-09-23 14:53:22.557	25	dd9280fc-e688-4785-9318-fa0537dd2cdd	DRY	2021
9614c93d-78fe-4add-ba17-dc972ef986fb	2025-09-23 14:53:22.935	2025-09-23 14:53:22.935	25	08b0d61f-cb6d-4e57-b9f0-21896663facc	DRY	2021
8ce04213-0004-4e25-8fbe-4845e4e36c2e	2025-09-23 14:54:37.477	2025-09-23 14:54:37.477	28	dd9280fc-e688-4785-9318-fa0537dd2cdd	WET	2015
45400313-daf8-417a-8633-af0ffa0386f7	2025-09-23 14:54:37.78	2025-09-23 14:54:37.78	28	08b0d61f-cb6d-4e57-b9f0-21896663facc	WET	2015
faadc2eb-bc26-47e6-a238-339c0a188c24	2025-09-23 14:55:01.315	2025-09-23 14:55:01.315	29	dd9280fc-e688-4785-9318-fa0537dd2cdd	DRY	2016
bdd3e410-3188-4a57-8621-172567dcd276	2025-09-23 14:55:01.652	2025-09-23 14:55:01.652	29	08b0d61f-cb6d-4e57-b9f0-21896663facc	DRY	2016
1b9d7849-9556-41c1-9c8c-9775ef1ee5a6	2025-09-29 00:29:36.518	2025-09-29 00:29:36.518	31	a5c64911-e171-4504-98da-b5f62ef1465b	WET	2025
cfa63798-7561-4185-9da8-d4567496f88a	2025-10-13 02:21:39.855	2025-10-13 02:21:39.855	32	b665f87b-fdf5-401d-b3bc-8123d987ed97	WET	2025
b08773fb-1b0c-4ab5-9959-4a608cdb13f9	2025-10-13 06:37:56.728	2025-10-13 06:37:56.728	33	457a6c14-0f42-4e81-885f-57351c10cf29	DRY	2025
443ba681-c6e7-4f8f-a229-aa94c4d77238	2025-10-13 10:48:18.994	2025-10-13 10:48:18.994	34	9a0753f1-3cf2-42b6-b02a-bd3e2eb379ef	DRY	2019
57a67d76-62c7-47de-84d0-769c7d42c05c	2025-10-13 10:53:24.269	2025-10-13 10:53:24.269	35	9a0753f1-3cf2-42b6-b02a-bd3e2eb379ef	WET	2019
dfe4a742-c1b0-4483-8602-916e248324bc	2025-10-15 07:34:33.928	2025-10-15 07:34:33.928	37	a5c64911-e171-4504-98da-b5f62ef1465b	DRY	2025
\.


--
-- Data for Name: CropDistribution; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CropDistribution" (id, "cropId", "distributionId", "dateGiven", type, quantity, unit) FROM stdin;
2	\N	9c3dc262-dfc3-4d21-abe7-af4debc44ed6	\N	SEED	80	KG
1	\N	c1d08300-a618-4e09-802f-2c0822555710	\N	SEED	400	KG
3	\N	6708b5af-dd61-4a01-9791-43bad7e349bd	\N	SEED	80	KG
4	\N	fe6e77bd-7ec9-4d1e-a2f2-ccd70c9bf27d	\N	SEED	400	KG
5	\N	08b0d90c-6451-441c-ba03-534540362623	\N	SEED	80	KG
6	\N	f1688493-4f86-4f29-91a2-ff3a17ab72f0	\N	SEED	400	KG
7	\N	0497de00-6a93-40cd-9700-40fbd22f8a2e	\N	SEED	80	KG
8	\N	4c437f00-f0a0-4f05-af69-ac2798ca81f2	\N	SEED	400	KG
9	\N	d0273b66-3f17-45b9-a5e8-a20cfbe64823	\N	SEED	80	KG
10	\N	35490599-09dd-4f19-9ef5-c4728125c16a	\N	SEED	400	KG
11	\N	1602fe6d-47c9-46a6-9fc1-a67db676065d	\N	SEED	80	KG
12	\N	9614c93d-78fe-4add-ba17-dc972ef986fb	\N	SEED	400	KG
13	\N	8ce04213-0004-4e25-8fbe-4845e4e36c2e	\N	SEED	80	KG
14	\N	45400313-daf8-417a-8633-af0ffa0386f7	\N	SEED	400	KG
15	\N	faadc2eb-bc26-47e6-a238-339c0a188c24	\N	SEED	80	KG
17	a7d4e49e-b830-4e54-8b82-27152ac8478a	1b9d7849-9556-41c1-9c8c-9775ef1ee5a6	2025-10-04 10:47:29.852	SEED	20	KG
16	\N	bdd3e410-3188-4a57-8621-172567dcd276	\N	SEED	400	KG
18	0817d9b3-b4a9-46b9-aa5a-d5685b04d839	cfa63798-7561-4185-9da8-d4567496f88a	2025-10-12 16:00:00	SEED	40	KG
19	a7d4e49e-b830-4e54-8b82-27152ac8478a	b08773fb-1b0c-4ab5-9959-4a608cdb13f9	2025-10-04 16:00:00	SEED	40	KG
20	\N	443ba681-c6e7-4f8f-a229-aa94c4d77238	\N	SEED	400	KG
21	\N	57a67d76-62c7-47de-84d0-769c7d42c05c	\N	SEED	400	KG
22	\N	dfe4a742-c1b0-4483-8602-916e248324bc	\N	SEED	40	KG
\.


--
-- Data for Name: FarmImage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."FarmImage" (id, "farmId", url, caption, "order", "isFeatured", "uploadedAt") FROM stdin;
48f02569-4e03-4e86-947d-9ea199b3a592	a5c64911-e171-4504-98da-b5f62ef1465b	https://wvhvftdtpnmwxphhgobh.supabase.co/storage/v1/object/public/geo-mapping/uploads/1755350669120-land.jpg	Image 1	0	\N	2025-09-23 12:56:03.863
7938e911-00be-4ec9-a6ff-9788303a15bd	6990cb95-6be0-4f0f-a10c-842d5d71caeb	https://wvhvftdtpnmwxphhgobh.supabase.co/storage/v1/object/public/geo-mapping/uploads/1755356494584-rice-field.jpg	Image 1	0	\N	2025-09-23 12:56:03.863
934ce4f9-286a-4628-9819-d8f600c962f0	08b0d61f-cb6d-4e57-b9f0-21896663facc	https://wvhvftdtpnmwxphhgobh.supabase.co/storage/v1/object/public/geo-mapping/uploads/1756826283635-534883154_1039117631433158_6231278270513614217_n.jpg	Image 1	0	\N	2025-09-23 12:56:03.863
73a7f675-9011-4e0f-83e5-93551ba744b9	08b0d61f-cb6d-4e57-b9f0-21896663facc	https://wvhvftdtpnmwxphhgobh.supabase.co/storage/v1/object/public/geo-mapping/uploads/1756826283635-537259809_1286501440153836_7531963170668484001_n.jpg	Image 2	1	\N	2025-09-23 12:56:03.863
5a5bdf30-1431-4475-bd04-d749a214a202	08b0d61f-cb6d-4e57-b9f0-21896663facc	https://wvhvftdtpnmwxphhgobh.supabase.co/storage/v1/object/public/geo-mapping/uploads/1756826283635-537857036_1894232341125499_8516411709057571220_n.jpg	Image 3	2	\N	2025-09-23 12:56:03.863
f64e626e-dcc4-4fdb-8816-7094b18baf76	9a0753f1-3cf2-42b6-b02a-bd3e2eb379ef	https://wvhvftdtpnmwxphhgobh.supabase.co/storage/v1/object/public/geo-mapping/uploads/1759486363782-aerial-view-rice-terrace-ban-pa-bong-piang-chiang-mai-thailand.jpg	Image 1	0	\N	2025-10-03 10:13:10.204
f67340bb-e0ed-41f0-99a5-e9a1a3cf88fc	457a6c14-0f42-4e81-885f-57351c10cf29	https://wvhvftdtpnmwxphhgobh.supabase.co/storage/v1/object/public/geo-mapping/uploads/1760337191190-4073d4378fad895860ee2285fedf3a74.jpg	Image 1	0	\N	2025-10-13 06:33:07.326
bfe778f9-a8f9-4ff4-8674-db497a1c303d	f62a4543-5e30-4835-a276-5f760c73300c	https://wvhvftdtpnmwxphhgobh.supabase.co/storage/v1/object/public/geo-mapping/uploads/1760338252698-land.jpg	Image 1	0	\N	2025-10-13 06:50:48.71
\.


--
-- Data for Name: Fertilizer; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Fertilizer" (id, type, name, type2, type3) FROM stdin;
6858b631-16ae-40ff-b88c-703e6936c073	SYNTHETIC	Urea (46-0-0)	SOLID	NITROGEN_FERTILIZER
9efab81a-7294-41e9-9483-83f0b0188be1	SYNTHETIC	Ammonium Sulfate (21-0-0)	SOLID	NITROGEN_FERTILIZER
b09ed065-1bab-4364-acde-3f10f4b21de1	SYNTHETIC	Ammonium Nitrate (33-0-0)	SOLID	NITROGEN_FERTILIZER
ebe72ce9-e731-4ab4-9958-2c24a342f010	SYNTHETIC	Superphosphate (0-20-0)	SOLID	PHOSPHORUS_FERTILIZER
693fcece-7237-452d-9a6e-77b10de82677	SYNTHETIC	Triple Superphosphate (0-46-0)	SOLID	PHOSPHORUS_FERTILIZER
7233e158-567e-442a-9a15-8a4a4046f69c	SYNTHETIC	Diammonium Phosphate (DAP) (18-46-0)	SOLID	PHOSPHORUS_FERTILIZER
b0a2713a-a45c-4cb7-875a-4d07b4feb94c	SYNTHETIC	Muriate of Potash (MOP) (0-0-60)	SOLID	POTASSIUM_FERTILIZER
7bbb2c1c-bbcc-4acd-bad5-45f1ff4974db	SYNTHETIC	Sulfate of Potash (SOP) (0-0-50)	SOLID	POTASSIUM_FERTILIZER
49851aae-e640-4d20-9ba7-fc8ed5e68574	SYNTHETIC	16-16-16	SOLID	COMPLETE_FERTILIZER
5889443b-a8e1-498b-be3b-bc27ef7ef841	SYNTHETIC	14-14-14	SOLID	COMPLETE_FERTILIZER
e3d8b199-9dac-4d7b-bbc3-ac30cf30c998	SYNTHETIC	Rapid Gro	LIQUID	FOLIAR_FERTILIZER
3355bf27-df2f-4160-bb13-120dd75e8bdc	SYNTHETIC	Miracle-Gro	LIQUID	FOLIAR_FERTILIZER
f71b56a3-4037-4e53-b2b6-22f1db62f97e	ORGANIC	Manure	SOLID	ANIMAL_BASED_FERTILIZER
1a7e891c-5a06-43a8-b6ea-7b479040b37d	ORGANIC	Bone Meal	SOLID	ANIMAL_BASED_FERTILIZER
7d16649d-7ff7-4634-822a-c15166ff0b07	ORGANIC	Blood Meal	SOLID	ANIMAL_BASED_FERTILIZER
fb0e6ede-a519-429c-b7da-761d660a0539	ORGANIC	Compost	SOLID	PLANT_BASED_FERTILIZER
d54126a0-9293-483f-b934-5bcc6e600b5d	ORGANIC	Green Manure	SOLID	PLANT_BASED_FERTILIZER
05a12286-6b30-4ce1-9ddc-0c2737f9114d	ORGANIC	Humus Plus	LIQUID	EXTRACTS
249b6b42-2e65-45e7-a0ea-904d8c6ea79f	ORGANIC	Seaweed Extract	LIQUID	EXTRACTS
de789e73-2301-4ba3-8ac4-7234261ca8ed	ORGANIC	Fish Emulsion	LIQUID	EMULSION
\.


--
-- Data for Name: FertilizerDistribution; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."FertilizerDistribution" ("dateGiven", quantity, unit, "distributionId", "fertilizerId", id) FROM stdin;
2025-10-01 16:00:00	10	KG	1b9d7849-9556-41c1-9c8c-9775ef1ee5a6	6858b631-16ae-40ff-b88c-703e6936c073	1
\.


--
-- Data for Name: News; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."News" (id, title, content, "postedAt", "updatedAt") FROM stdin;
1	City Council Passes New Environmental Law	In an effort to reduce plastic waste, the city council has passed a law banning single-use plastics in public establishments. The law will take effect next month.	2025-09-24 14:01:39.153	2025-09-24 14:01:39.153
2	Grand Opening of New City Park	The mayor officially opened the new city park today, featuring walking trails, a playground, and a community garden. Hundreds of residents attended the ribbon-cutting ceremony.	2025-09-24 14:02:47.428	2025-09-24 14:02:47.428
3	City Council Passes New Environmental Law	In an effort to reduce plastic waste, the city council has passed a law banning single-use plastics in public establishments. The law will take effect next month.	2025-09-24 14:25:47.853	2025-09-24 14:25:47.853
\.


--
-- Data for Name: NewsImage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."NewsImage" (id, "newsId", url, "createdAt") FROM stdin;
1a5ef250-40c5-462f-b319-4ffc41384278	1	https://wvhvftdtpnmwxphhgobh.supabase.co/storage/v1/object/public/geo-mapping/uploads/1758722476792-Shanghai-Tour-22-1.png	2025-09-24 14:01:39.153
b7534172-c7cf-45fa-ad51-ad80ca2f6482	1	https://wvhvftdtpnmwxphhgobh.supabase.co/storage/v1/object/public/geo-mapping/uploads/1758722476793-Shanghai-Tour-22.png	2025-09-24 14:01:39.153
84929afd-ac97-41d7-964b-922ab9d92e41	1	https://wvhvftdtpnmwxphhgobh.supabase.co/storage/v1/object/public/geo-mapping/uploads/1758722476793-Shanghai-Travels-Tours-1.png	2025-09-24 14:01:39.153
d184a2e8-0aec-4276-b417-2fca6ff518a3	1	https://wvhvftdtpnmwxphhgobh.supabase.co/storage/v1/object/public/geo-mapping/uploads/1758722476793-Shanghai-Travels-Tours.png	2025-09-24 14:01:39.153
dc77e0c7-b8bd-4ecd-b0bb-67448243f046	2	https://wvhvftdtpnmwxphhgobh.supabase.co/storage/v1/object/public/geo-mapping/uploads/1758722566332-rice-field.jpg	2025-09-24 14:02:47.428
92f1883c-77a7-4299-9989-191ce8aff7ad	3	https://wvhvftdtpnmwxphhgobh.supabase.co/storage/v1/object/public/geo-mapping/uploads/1758723946726-rice-field.jpg	2025-09-24 14:25:47.853
\.


--
-- Data for Name: Planting; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Planting" (id, "distributionId", "dateOfSowing", "dateOfTransplant", "expectedHarvestDate", "actualHarvestDate", "plantedArea", "moistureContent", "plantedQuantity", "harvestedQuantity", "harvestedUnit", "distributedCropId", "establishmentType", "plantedUnit") FROM stdin;
253145db-7a94-400e-bcc7-e7f16a8de2db	1b9d7849-9556-41c1-9c8c-9775ef1ee5a6	2025-10-01 16:00:00	2025-10-01 16:00:00	\N	2025-10-01 16:00:00	1	\N	20	200	KG	\N	Transplanted	KG
60496a72-e0fb-41bf-9e72-e7e2ae236f22	bdd3e410-3188-4a57-8621-172567dcd276	2025-10-01 16:00:00	\N	\N	2025-10-08 16:00:00	10	\N	400	300	KG	\N	Direct Wet Seeded	KG
5287ecb0-a077-41dd-b5aa-323eefd5a1bb	cfa63798-7561-4185-9da8-d4567496f88a	2025-10-12 16:00:00	\N	\N	2025-10-24 16:00:00	1	\N	40	200	KG	\N	Direct Wet Seeded	KG
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-08-08 07:41:06
20211116045059	2025-08-08 07:41:06
20211116050929	2025-08-08 07:41:06
20211116051442	2025-08-08 07:41:06
20211116212300	2025-08-08 07:41:06
20211116213355	2025-08-08 07:41:06
20211116213934	2025-08-08 07:41:06
20211116214523	2025-08-08 07:41:06
20211122062447	2025-08-08 07:41:06
20211124070109	2025-08-08 07:41:06
20211202204204	2025-08-08 07:41:06
20211202204605	2025-08-08 07:41:06
20211210212804	2025-08-08 07:41:06
20211228014915	2025-08-08 07:41:06
20220107221237	2025-08-08 07:41:06
20220228202821	2025-08-08 07:41:06
20220312004840	2025-08-08 07:41:06
20220603231003	2025-08-08 07:41:06
20220603232444	2025-08-08 07:41:06
20220615214548	2025-08-08 07:41:06
20220712093339	2025-08-08 07:41:06
20220908172859	2025-08-08 07:41:06
20220916233421	2025-08-08 07:41:06
20230119133233	2025-08-08 07:41:06
20230128025114	2025-08-08 07:41:06
20230128025212	2025-08-08 07:41:06
20230227211149	2025-08-08 07:41:06
20230228184745	2025-08-08 07:41:06
20230308225145	2025-08-08 07:41:06
20230328144023	2025-08-08 07:41:06
20231018144023	2025-08-08 07:41:06
20231204144023	2025-08-08 07:41:06
20231204144024	2025-08-08 07:41:07
20231204144025	2025-08-08 07:41:07
20240108234812	2025-08-08 07:41:07
20240109165339	2025-08-08 07:41:07
20240227174441	2025-08-08 07:41:07
20240311171622	2025-08-08 07:41:07
20240321100241	2025-08-08 07:41:07
20240401105812	2025-08-08 07:41:07
20240418121054	2025-08-08 07:41:07
20240523004032	2025-08-08 07:41:07
20240618124746	2025-08-08 07:41:07
20240801235015	2025-08-08 07:41:07
20240805133720	2025-08-08 07:41:07
20240827160934	2025-08-08 07:41:07
20240919163303	2025-08-08 07:41:07
20240919163305	2025-08-08 07:41:07
20241019105805	2025-08-08 07:41:07
20241030150047	2025-08-08 07:41:07
20241108114728	2025-08-08 07:41:07
20241121104152	2025-08-08 07:41:07
20241130184212	2025-08-08 07:41:07
20241220035512	2025-08-08 07:41:07
20241220123912	2025-08-08 07:41:07
20241224161212	2025-08-08 07:41:07
20250107150512	2025-08-08 07:41:07
20250110162412	2025-08-08 07:41:07
20250123174212	2025-08-08 07:41:07
20250128220012	2025-08-08 07:41:07
20250506224012	2025-08-08 07:41:07
20250523164012	2025-08-08 07:41:07
20250714121412	2025-08-08 07:41:07
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
geo-mapping	geo-mapping	\N	2025-08-11 00:57:58.999835+00	2025-08-11 00:57:58.999835+00	t	f	\N	\N	\N	STANDARD
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets_analytics (id, type, format, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-08-08 07:41:05.599922
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-08-08 07:41:05.644582
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-08-08 07:41:05.674071
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-08-08 07:41:06.034842
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-08-08 07:41:06.426922
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-08-08 07:41:06.429981
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-08-08 07:41:06.434089
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-08-08 07:41:06.444809
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-08-08 07:41:06.450747
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-08-08 07:41:06.454151
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-08-08 07:41:06.457533
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-08-08 07:41:06.468029
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-08-08 07:41:06.475472
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-08-08 07:41:06.478896
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-08-08 07:41:06.483364
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-08-08 07:41:06.867514
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-08-08 07:41:06.870573
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-08-08 07:41:06.873099
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-08-08 07:41:06.893531
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-08-08 07:41:06.909558
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-08-08 07:41:06.912525
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-08-08 07:41:06.917953
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-08-08 07:41:06.961671
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-08-08 07:41:06.980257
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-08-08 07:41:06.983481
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-08-08 07:41:06.98639
26	objects-prefixes	ef3f7871121cdc47a65308e6702519e853422ae2	2025-08-11 00:57:27.210159
27	search-v2	33b8f2a7ae53105f028e13e9fcda9dc4f356b4a2	2025-08-11 00:57:27.32275
28	object-bucket-name-sorting	ba85ec41b62c6a30a3f136788227ee47f311c436	2025-08-11 00:57:27.333691
29	create-prefixes	a7b1a22c0dc3ab630e3055bfec7ce7d2045c5b7b	2025-08-11 00:57:27.344626
30	update-object-levels	6c6f6cc9430d570f26284a24cf7b210599032db7	2025-08-11 00:57:27.351321
31	objects-level-index	33f1fef7ec7fea08bb892222f4f0f5d79bab5eb8	2025-08-11 00:57:27.358354
32	backward-compatible-index-on-objects	2d51eeb437a96868b36fcdfb1ddefdf13bef1647	2025-08-11 00:57:27.368507
33	backward-compatible-index-on-prefixes	fe473390e1b8c407434c0e470655945b110507bf	2025-08-11 00:57:27.375699
34	optimize-search-function-v1	82b0e469a00e8ebce495e29bfa70a0797f7ebd2c	2025-08-11 00:57:27.377574
35	add-insert-trigger-prefixes	63bb9fd05deb3dc5e9fa66c83e82b152f0caf589	2025-08-11 00:57:27.385616
36	optimise-existing-functions	81cf92eb0c36612865a18016a38496c530443899	2025-08-11 00:57:27.390554
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2025-08-11 00:57:27.407408
38	iceberg-catalog-flag-on-buckets	19a8bd89d5dfa69af7f222a46c726b7c41e462c5	2025-08-11 00:57:27.412501
39	add-search-v2-sort-support	39cf7d1e6bf515f4b02e41237aba845a7b492853	2025-09-24 13:52:34.856249
40	fix-prefix-race-conditions-optimized	fd02297e1c67df25a9fc110bf8c8a9af7fb06d1f	2025-09-24 13:52:34.925291
41	add-object-level-update-trigger	44c22478bf01744b2129efc480cd2edc9a7d60e9	2025-09-27 10:42:49.137814
42	rollback-prefix-triggers	f2ab4f526ab7f979541082992593938c05ee4b47	2025-09-27 10:42:49.257451
43	fix-object-level	ab837ad8f1c7d00cc0b7310e989a23388ff29fc6	2025-09-27 10:42:49.290662
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata, level) FROM stdin;
ee13daef-6d95-4699-9b41-0537323385ad	geo-mapping	uploads/1754874910554-Screenshot-2025-08-08-at-4.43.14-PM.png	\N	2025-08-11 01:15:11.731402+00	2025-08-11 01:15:11.731402+00	2025-08-11 01:15:11.731402+00	{"eTag": "\\"09b40ff64a60c17d69fdd25e1eb89145\\"", "size": 50, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T01:15:12.000Z", "contentLength": 50, "httpStatusCode": 200}	cc38602a-fc84-4c03-a503-509357956d9a	\N	{}	2
b20b9744-e691-40f5-ba61-f1fe25b55289	geo-mapping	uploads/1754986930398-aerial-view-rice-terrace-ban-pa-bong-piang-chiang-mai-thailand.jpg	\N	2025-08-12 08:22:13.373937+00	2025-08-12 08:22:13.373937+00	2025-08-12 08:22:13.373937+00	{"eTag": "\\"add6fe844691f00d7cfecfabe2dde0d2-4\\"", "size": 16634913, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-12T08:22:13.000Z", "contentLength": 16634913, "httpStatusCode": 200}	6b75427d-6b11-4aaf-84b6-5c5ef26487ab	\N	{}	2
4baae820-5906-4cc0-a89f-20574e9dfcdb	geo-mapping	uploads/1754874947106-Screenshot-2025-08-08-at-4.43.14-PM.png	\N	2025-08-11 01:15:47.76318+00	2025-08-11 01:15:47.76318+00	2025-08-11 01:15:47.76318+00	{"eTag": "\\"09b40ff64a60c17d69fdd25e1eb89145\\"", "size": 50, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T01:15:48.000Z", "contentLength": 50, "httpStatusCode": 200}	40d37d15-dc5a-49a4-860a-221a04dee47c	\N	{}	2
2acdda8b-5e06-4112-9d29-1a36fa4efe71	geo-mapping	uploads/1754874991126-Screenshot-2025-08-08-at-4.43.14-PM.png	\N	2025-08-11 01:16:31.889822+00	2025-08-11 01:16:31.889822+00	2025-08-11 01:16:31.889822+00	{"eTag": "\\"09b40ff64a60c17d69fdd25e1eb89145\\"", "size": 50, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T01:16:32.000Z", "contentLength": 50, "httpStatusCode": 200}	27428611-829f-4fbb-8321-404623f8a110	\N	{}	2
c75c7ad0-01e5-4700-b3aa-c08a71f7a331	geo-mapping	uploads/1755356494584-rice-field.jpg	\N	2025-08-16 15:01:34.771014+00	2025-08-16 15:01:34.771014+00	2025-08-16 15:01:34.771014+00	{"eTag": "\\"2f1db2e1c3e726c73fb0712b2d0ccc2c\\"", "size": 95977, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-16T15:01:35.000Z", "contentLength": 95977, "httpStatusCode": 200}	6c0fd3ef-e992-461f-ab10-e5160f427cba	\N	{}	2
7ccdc6b4-c656-4c51-809f-3899e3583d0a	geo-mapping	uploads/1754876433873-Screenshot-2025-08-07-at-11.48.44-AM.png	\N	2025-08-11 01:40:35.255081+00	2025-08-11 01:40:35.255081+00	2025-08-11 01:40:35.255081+00	{"eTag": "\\"ce086d6c7da6c7379989e6ab62c1e448\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T01:40:36.000Z", "contentLength": 51, "httpStatusCode": 200}	0c50bb8e-430b-4f48-b625-19d04fcf77fe	\N	{}	2
66ea7953-e0dd-4812-94db-355bd112d597	geo-mapping	uploads/1754876637372-Screenshot-2025-08-07-at-11.39.28-AM.png	\N	2025-08-11 01:43:58.279286+00	2025-08-11 01:43:58.279286+00	2025-08-11 01:43:58.279286+00	{"eTag": "\\"98194fbf68730e93bd0b7680a434cb12\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T01:43:59.000Z", "contentLength": 51, "httpStatusCode": 200}	ab91cb7a-5fe2-43ac-b5b6-190df37e8489	\N	{}	2
7057fcdc-d38b-4065-bd49-e1e7109b48f8	geo-mapping	uploads/1754876637371-Screenshot-2025-08-07-at-11.48.44-AM.png	\N	2025-08-11 01:43:58.280898+00	2025-08-11 01:43:58.280898+00	2025-08-11 01:43:58.280898+00	{"eTag": "\\"ce086d6c7da6c7379989e6ab62c1e448\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T01:43:59.000Z", "contentLength": 51, "httpStatusCode": 200}	bd6f7bdc-8cf1-4803-aa8c-cdeae18a1df4	\N	{}	2
679d0044-5856-4729-b939-e9bc9b9053cc	geo-mapping	uploads/1759486328292-aerial-view-rice-terrace-ban-pa-bong-piang-chiang-mai-thailand.jpg	\N	2025-10-03 10:12:16.528798+00	2025-10-03 10:12:16.528798+00	2025-10-03 10:12:16.528798+00	{"eTag": "\\"add6fe844691f00d7cfecfabe2dde0d2-4\\"", "size": 16634913, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-10-03T10:12:17.000Z", "contentLength": 16634913, "httpStatusCode": 200}	cc539317-4dd3-48c8-81e8-5a58d3982746	\N	{}	2
0254b0d8-874a-475d-badf-f54f3640f4b1	geo-mapping	uploads/1754877605693-Screenshot-2025-08-07-at-11.48.44-AM.png	\N	2025-08-11 02:00:06.683344+00	2025-08-11 02:00:06.683344+00	2025-08-11 02:00:06.683344+00	{"eTag": "\\"ce086d6c7da6c7379989e6ab62c1e448\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:00:07.000Z", "contentLength": 51, "httpStatusCode": 200}	92b3230f-f7fe-428f-b4d9-bf8af6d7148b	\N	{}	2
4b94d91c-5434-4679-afcc-7db6f2a266fd	geo-mapping	uploads/1754877605696-Screenshot-2025-08-07-at-11.39.28-AM.png	\N	2025-08-11 02:00:06.686917+00	2025-08-11 02:00:06.686917+00	2025-08-11 02:00:06.686917+00	{"eTag": "\\"98194fbf68730e93bd0b7680a434cb12\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:00:07.000Z", "contentLength": 51, "httpStatusCode": 200}	57b78b13-1923-4d69-9431-01ebd7415003	\N	{}	2
defa0e20-27e2-4748-8b87-0591a5860ded	geo-mapping	uploads/1754877791342-Screenshot-2025-08-07-at-11.34.51-AM.png	\N	2025-08-11 02:03:12.594162+00	2025-08-11 02:03:12.594162+00	2025-08-11 02:03:12.594162+00	{"eTag": "\\"337171c843807b62a0e8694cdfecd985\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:03:13.000Z", "contentLength": 51, "httpStatusCode": 200}	e362540d-3dbb-4ee5-9125-26e0d01e5ffa	\N	{}	2
1f9d616d-db04-44c6-b8c8-dcafc71c46ba	geo-mapping	uploads/1754877960348-Screenshot-2025-08-08-at-4.43.14-PM.png	\N	2025-08-11 02:06:01.287761+00	2025-08-11 02:06:01.287761+00	2025-08-11 02:06:01.287761+00	{"eTag": "\\"09b40ff64a60c17d69fdd25e1eb89145\\"", "size": 50, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:06:02.000Z", "contentLength": 50, "httpStatusCode": 200}	01f5dafc-e647-489b-a7f2-ca1bf0d99b14	\N	{}	2
fe69b7e4-580a-4e77-8f06-cd76fadf1606	geo-mapping	uploads/1754877982156-Screenshot-2025-08-08-at-4.43.14-PM.png	\N	2025-08-11 02:06:22.641305+00	2025-08-11 02:06:22.641305+00	2025-08-11 02:06:22.641305+00	{"eTag": "\\"09b40ff64a60c17d69fdd25e1eb89145\\"", "size": 50, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:06:23.000Z", "contentLength": 50, "httpStatusCode": 200}	b8595d68-8864-4b1e-8df0-d4a0dcf89b0a	\N	{}	2
9624b0eb-2e0e-4d14-a183-6fff2f962958	geo-mapping	uploads/1754878005677-Screenshot-2025-08-08-at-4.43.14-PM.png	\N	2025-08-11 02:06:46.134908+00	2025-08-11 02:06:46.134908+00	2025-08-11 02:06:46.134908+00	{"eTag": "\\"09b40ff64a60c17d69fdd25e1eb89145\\"", "size": 50, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:06:47.000Z", "contentLength": 50, "httpStatusCode": 200}	0385da0d-0cad-4f9f-8073-dfdcab4f0183	\N	{}	2
ecb26094-c036-45f8-8f3e-ff27fa4a704f	geo-mapping	uploads/1754878022410-Screenshot-2025-08-08-at-4.43.14-PM.png	\N	2025-08-11 02:07:02.882062+00	2025-08-11 02:07:02.882062+00	2025-08-11 02:07:02.882062+00	{"eTag": "\\"09b40ff64a60c17d69fdd25e1eb89145\\"", "size": 50, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:07:03.000Z", "contentLength": 50, "httpStatusCode": 200}	9e035c6d-bbca-4d8f-be7e-a3d9b8b15761	\N	{}	2
5c98f15c-9254-40e7-90f2-304faf0c817e	geo-mapping	uploads/1754995786930-bg.png	\N	2025-08-12 10:49:48.424002+00	2025-08-12 10:49:48.508241+00	2025-08-12 10:49:48.424002+00	{"eTag": "\\"cd9c3da1587940a33c8b651b0d45b569\\"", "size": 254248, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-08-12T10:49:49.000Z", "contentLength": 254248, "httpStatusCode": 200}	d176c5fe-9274-4a5a-84cc-2fb69fbf2f8a	\N	{}	2
6e8314a0-ac84-4f0f-867d-7b8ae224f0a9	geo-mapping	uploads/1754878035105-Screenshot-2025-08-08-at-4.43.14-PM.png	\N	2025-08-11 02:07:15.560505+00	2025-08-11 02:07:15.560505+00	2025-08-11 02:07:15.560505+00	{"eTag": "\\"09b40ff64a60c17d69fdd25e1eb89145\\"", "size": 50, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:07:16.000Z", "contentLength": 50, "httpStatusCode": 200}	3174f838-2fb7-492e-aabd-5fb2471d4fd5	\N	{}	2
c4d16620-4f79-4087-b080-495746bf78fa	geo-mapping	uploads/1754878047443-Screenshot-2025-08-08-at-4.43.14-PM.png	\N	2025-08-11 02:07:27.909709+00	2025-08-11 02:07:27.909709+00	2025-08-11 02:07:27.909709+00	{"eTag": "\\"09b40ff64a60c17d69fdd25e1eb89145\\"", "size": 50, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:07:28.000Z", "contentLength": 50, "httpStatusCode": 200}	53c34803-fd78-4e0a-9cbf-3e7d9873f5c9	\N	{}	2
e9afc11d-5442-4085-8cf7-65d945d95413	geo-mapping	uploads/1754878210214-Screenshot-2025-08-07-at-11.34.51-AM.png	\N	2025-08-11 02:10:11.063083+00	2025-08-11 02:10:11.063083+00	2025-08-11 02:10:11.063083+00	{"eTag": "\\"337171c843807b62a0e8694cdfecd985\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:10:12.000Z", "contentLength": 51, "httpStatusCode": 200}	2076a201-ac61-4951-9043-e94bc800ed88	\N	{}	2
a7886a39-55f9-4b34-8ff1-6b34a0746cda	geo-mapping	uploads/1754995786931-rice-bg.jpg	\N	2025-08-12 10:49:58.015909+00	2025-08-12 10:49:58.043131+00	2025-08-12 10:49:58.015909+00	{"eTag": "\\"add6fe844691f00d7cfecfabe2dde0d2-4\\"", "size": 16634913, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-12T10:49:58.000Z", "contentLength": 16634913, "httpStatusCode": 200}	5d0c05f0-ebce-4ef7-9b51-3e773152e473	\N	{}	2
6cd1f0b1-6afa-4524-8920-cceca8214694	geo-mapping	uploads/1754878976191-Screenshot-2025-08-07-at-11.41.52-AM.png	\N	2025-08-11 02:22:57.193172+00	2025-08-11 02:22:57.193172+00	2025-08-11 02:22:57.193172+00	{"eTag": "\\"a7543b9ed74c105b0f7915e9205dde9a\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:22:58.000Z", "contentLength": 51, "httpStatusCode": 200}	3422169c-aa48-470c-9894-c8df7915b4a5	\N	{}	2
998779fb-76cc-4a45-9f4b-ea36063dfffa	geo-mapping	uploads/1754878976190-Screenshot-2025-08-07-at-11.34.51-AM.png	\N	2025-08-11 02:22:57.211589+00	2025-08-11 02:22:57.211589+00	2025-08-11 02:22:57.211589+00	{"eTag": "\\"337171c843807b62a0e8694cdfecd985\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:22:58.000Z", "contentLength": 51, "httpStatusCode": 200}	f330bc2b-d49b-4ed1-a214-d79c9fc2765b	\N	{}	2
24bbea0e-e605-44f4-b22b-fb2fc7f71e93	geo-mapping	uploads/1754878976191-Screenshot-2025-08-08-at-4.43.14-PM.png	\N	2025-08-11 02:22:57.216468+00	2025-08-11 02:22:57.216468+00	2025-08-11 02:22:57.216468+00	{"eTag": "\\"09b40ff64a60c17d69fdd25e1eb89145\\"", "size": 50, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:22:58.000Z", "contentLength": 50, "httpStatusCode": 200}	1223c15c-8a5b-48fd-88b7-3aa58474c46f	\N	{}	2
7cad09e6-4d71-4e9e-87cd-49e4ae89acdf	geo-mapping	uploads/1754995786930-rice-bg.jpg	\N	2025-08-12 10:49:57.930268+00	2025-08-12 10:49:59.112926+00	2025-08-12 10:49:57.930268+00	{"eTag": "\\"add6fe844691f00d7cfecfabe2dde0d2-4\\"", "size": 16634913, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-12T10:49:56.000Z", "contentLength": 16634913, "httpStatusCode": 200}	470abcdf-2eb4-4ac6-810a-c0cdb61cb771	\N	{}	2
44aa5531-7551-4015-80fd-fedd4c25f8df	geo-mapping	uploads/1754878984392-Screenshot-2025-08-07-at-11.41.52-AM.png	\N	2025-08-11 02:23:04.770659+00	2025-08-11 02:23:04.770659+00	2025-08-11 02:23:04.770659+00	{"eTag": "\\"a7543b9ed74c105b0f7915e9205dde9a\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:23:05.000Z", "contentLength": 51, "httpStatusCode": 200}	d4dad313-f0a7-4451-b9fa-692893dcaec2	\N	{}	2
b288d62f-96e7-4694-8015-86d6bffcf293	geo-mapping	uploads/1754995786931-bg.png	\N	2025-08-12 10:49:48.445943+00	2025-08-12 10:49:48.445943+00	2025-08-12 10:49:48.445943+00	{"eTag": "\\"cd9c3da1587940a33c8b651b0d45b569\\"", "size": 254248, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-08-12T10:49:49.000Z", "contentLength": 254248, "httpStatusCode": 200}	4264a464-f2d5-4c8a-be89-15ffb5da524a	\N	{}	2
785481b5-661c-4c47-8358-80ce4bfb8c31	geo-mapping	uploads/1754879529786-Screenshot-2025-08-07-at-11.48.44-AM.png	\N	2025-08-11 02:32:10.625114+00	2025-08-11 02:32:10.625114+00	2025-08-11 02:32:10.625114+00	{"eTag": "\\"ce086d6c7da6c7379989e6ab62c1e448\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:32:11.000Z", "contentLength": 51, "httpStatusCode": 200}	91df4599-3c3b-4227-b951-5c1fc7b246ad	\N	{}	2
37676024-c050-4e04-b856-cf7f4bd06858	geo-mapping	uploads/1756826274165-537259809_1286501440153836_7531963170668484001_n.jpg	\N	2025-09-02 15:17:55.17752+00	2025-09-02 15:17:55.17752+00	2025-09-02 15:17:55.17752+00	{"eTag": "\\"57d69b624d5293bccb2d4aa97c208fd5\\"", "size": 133773, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-09-02T15:17:56.000Z", "contentLength": 133773, "httpStatusCode": 200}	0c8a480d-8206-45c6-8855-4ca6d3adf319	\N	{}	2
afde0647-da3b-42ab-a37c-b75229713e8f	geo-mapping	uploads/1758721948717-Shanghai-Tour-22-1.png	\N	2025-09-24 13:52:34.080797+00	2025-09-24 13:52:34.080797+00	2025-09-24 13:52:34.080797+00	{"eTag": "\\"92ef04a9ef49674a9ed7ebe54e73f3a1\\"", "size": 5119423, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-09-24T13:52:34.000Z", "contentLength": 5119423, "httpStatusCode": 200}	81902870-6c16-4913-89a3-ba1909e70467	\N	{}	2
6a0a2594-ab94-48ee-9cf9-b0b2b1b6ddf3	geo-mapping	uploads/1758721948718-Shanghai-Tour-22.png	\N	2025-09-24 13:52:34.908341+00	2025-09-24 13:52:34.908341+00	2025-09-24 13:52:34.908341+00	{"eTag": "\\"92ef04a9ef49674a9ed7ebe54e73f3a1\\"", "size": 5119423, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-09-24T13:52:35.000Z", "contentLength": 5119423, "httpStatusCode": 200}	cbfb4aef-c1e5-4e6e-93a2-fe9bf824d35c	\N	{}	2
c052371f-ae6e-478d-8b72-2c970a61c214	geo-mapping	uploads/1759486363782-aerial-view-rice-terrace-ban-pa-bong-piang-chiang-mai-thailand.jpg	\N	2025-10-03 10:13:09.307767+00	2025-10-03 10:13:09.307767+00	2025-10-03 10:13:09.307767+00	{"eTag": "\\"add6fe844691f00d7cfecfabe2dde0d2-4\\"", "size": 16634913, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-10-03T10:13:09.000Z", "contentLength": 16634913, "httpStatusCode": 200}	053af81d-79f2-479d-9efd-10cf2f4c9b2c	\N	{}	2
e2be33d3-49f6-41d2-bc06-f05cd34cdc9e	geo-mapping	uploads/1754878984392-Screenshot-2025-08-08-at-4.43.14-PM.png	\N	2025-08-11 02:23:04.764439+00	2025-08-11 02:23:04.764439+00	2025-08-11 02:23:04.764439+00	{"eTag": "\\"09b40ff64a60c17d69fdd25e1eb89145\\"", "size": 50, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:23:05.000Z", "contentLength": 50, "httpStatusCode": 200}	a7f7b041-2a12-4c2b-b398-36222a201ac7	\N	{}	2
ff82b662-ddf2-40a0-a4f1-da55a6fa807a	geo-mapping	uploads/1756826274165-534883154_1039117631433158_6231278270513614217_n.jpg	\N	2025-09-02 15:17:55.201253+00	2025-09-02 15:17:55.201253+00	2025-09-02 15:17:55.201253+00	{"eTag": "\\"fd4dccf22445a2b3794275082f8d515a\\"", "size": 157797, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-09-02T15:17:56.000Z", "contentLength": 157797, "httpStatusCode": 200}	90c33af4-4919-48c8-acb0-7f2360153931	\N	{}	2
21687df3-e36b-4d1d-af72-ed53f1e89c67	geo-mapping	uploads/1754879529787-Screenshot-2025-08-07-at-11.48.31-AM.png	\N	2025-08-11 02:32:10.634891+00	2025-08-11 02:32:10.634891+00	2025-08-11 02:32:10.634891+00	{"eTag": "\\"764d120b3a15d4f3d5be98e4b425bedc\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:32:11.000Z", "contentLength": 51, "httpStatusCode": 200}	cc308963-0513-4834-ab4f-417a8641ec9a	\N	{}	2
013807a3-5389-45ab-a607-79daecda6bd1	geo-mapping	uploads/1758721948718-Shanghai-Travels-Tours-1.png	\N	2025-09-24 13:52:41.705944+00	2025-09-24 13:52:41.705944+00	2025-09-24 13:52:41.705944+00	{"eTag": "\\"7095be38e51e66a98d1e3c88fd6010ba-6\\"", "size": 27498469, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-09-24T13:52:42.000Z", "contentLength": 27498469, "httpStatusCode": 200}	f5d115aa-6d6c-4906-a239-054a9855ca16	\N	{}	2
7c4d2dc6-0a4a-496e-9057-f508b1bcc3b4	geo-mapping	uploads/1758722383065-Shanghai-Tour-22-1.png	\N	2025-09-24 13:59:44.991385+00	2025-09-24 13:59:44.991385+00	2025-09-24 13:59:44.991385+00	{"eTag": "\\"92ef04a9ef49674a9ed7ebe54e73f3a1\\"", "size": 5119423, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-09-24T13:59:45.000Z", "contentLength": 5119423, "httpStatusCode": 200}	891a1268-f8a6-4ce2-8c7d-50fd957ac7ae	\N	{}	2
bb2a3cea-e6eb-47ca-a0a4-14c8ac68e6f1	geo-mapping	uploads/1758722476793-Shanghai-Tour-22.png	\N	2025-09-24 14:01:23.024419+00	2025-09-24 14:01:23.024419+00	2025-09-24 14:01:23.024419+00	{"eTag": "\\"92ef04a9ef49674a9ed7ebe54e73f3a1\\"", "size": 5119423, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-09-24T14:01:23.000Z", "contentLength": 5119423, "httpStatusCode": 200}	27f9e16a-deb4-47a2-b9e1-ada4afc125a5	\N	{}	2
fcbbbe73-33b0-495b-bcd1-020ca24478a2	geo-mapping	uploads/1758722476792-Shanghai-Tour-22-1.png	\N	2025-09-24 14:01:23.377905+00	2025-09-24 14:01:23.377905+00	2025-09-24 14:01:23.377905+00	{"eTag": "\\"92ef04a9ef49674a9ed7ebe54e73f3a1\\"", "size": 5119423, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-09-24T14:01:24.000Z", "contentLength": 5119423, "httpStatusCode": 200}	041285e8-fb99-4c54-89c1-5c371990542f	\N	{}	2
a9014291-748f-46bf-9683-67b7e773bc94	geo-mapping	uploads/1758722476793-Shanghai-Travels-Tours.png	\N	2025-09-24 14:01:38.477154+00	2025-09-24 14:01:38.477154+00	2025-09-24 14:01:38.477154+00	{"eTag": "\\"7095be38e51e66a98d1e3c88fd6010ba-6\\"", "size": 27498469, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-09-24T14:01:38.000Z", "contentLength": 27498469, "httpStatusCode": 200}	51d7af8f-a59e-431b-8170-ff2e874b8e41	\N	{}	2
80317046-abc7-4eb6-a54e-f47b54f2c0bb	geo-mapping	uploads/1758722476793-Shanghai-Travels-Tours-1.png	\N	2025-09-24 14:01:38.836268+00	2025-09-24 14:01:38.836268+00	2025-09-24 14:01:38.836268+00	{"eTag": "\\"7095be38e51e66a98d1e3c88fd6010ba-6\\"", "size": 27498469, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-09-24T14:01:38.000Z", "contentLength": 27498469, "httpStatusCode": 200}	6be3686a-69b3-4fbc-94c3-fcfe8517a181	\N	{}	2
1ff5dc72-dcc2-496d-8d6f-2fcc710d1d60	geo-mapping	uploads/1758722566332-rice-field.jpg	\N	2025-09-24 14:02:46.956435+00	2025-09-24 14:02:46.956435+00	2025-09-24 14:02:46.956435+00	{"eTag": "\\"c818606c192a162d8a4b734c2ee6a7de\\"", "size": 76516, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-09-24T14:02:47.000Z", "contentLength": 76516, "httpStatusCode": 200}	a1817dab-e717-4961-a5df-50d5e6c6159f	\N	{}	2
2248d270-287a-4a64-ba44-3b667b193fac	geo-mapping	uploads/1760337191190-4073d4378fad895860ee2285fedf3a74.jpg	\N	2025-10-13 06:33:05.460959+00	2025-10-13 06:33:05.460959+00	2025-10-13 06:33:05.460959+00	{"eTag": "\\"df972586bbb37d1e318ae2f52d1d384d\\"", "size": 337430, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-10-13T06:33:06.000Z", "contentLength": 337430, "httpStatusCode": 200}	126f7f79-e8d2-4414-97b8-e9fd350cee71	\N	{}	2
f6514cf7-76e3-434f-83b1-e67c66622769	geo-mapping	uploads/1754878984391-Screenshot-2025-08-07-at-11.34.51-AM.png	\N	2025-08-11 02:23:04.787344+00	2025-08-11 02:23:04.787344+00	2025-08-11 02:23:04.787344+00	{"eTag": "\\"337171c843807b62a0e8694cdfecd985\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:23:05.000Z", "contentLength": 51, "httpStatusCode": 200}	07e04366-f3d4-4450-963c-10c2230fb318	\N	{}	2
ed8982ba-c342-46da-a5d1-c990e75f6dcd	geo-mapping	uploads/1754901139547-Screenshot-2025-08-07-at-11.34.51-AM.png	\N	2025-08-11 08:32:20.691579+00	2025-08-11 08:32:20.691579+00	2025-08-11 08:32:20.691579+00	{"eTag": "\\"337171c843807b62a0e8694cdfecd985\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T08:32:21.000Z", "contentLength": 51, "httpStatusCode": 200}	b73db288-3486-4b33-a54b-f258c376a9c1	\N	{}	2
2b935af6-6f9e-4320-bb6f-7ef4d2c19fe2	geo-mapping	uploads/1754901139547-Screenshot-2025-08-07-at-11.39.28-AM.png	\N	2025-08-11 08:32:20.710511+00	2025-08-11 08:32:20.710511+00	2025-08-11 08:32:20.710511+00	{"eTag": "\\"98194fbf68730e93bd0b7680a434cb12\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T08:32:21.000Z", "contentLength": 51, "httpStatusCode": 200}	7d4b9cc4-41e4-48af-be44-b9277073ef0f	\N	{}	2
c415175e-efc0-4bb8-9d46-780132b2cb24	geo-mapping	uploads/1754995786928-aerial-view-rice-terrace-ban-pa-bong-piang-chiang-mai-thailand.jpg	\N	2025-08-12 10:49:57.904193+00	2025-08-12 10:49:57.904193+00	2025-08-12 10:49:57.904193+00	{"eTag": "\\"add6fe844691f00d7cfecfabe2dde0d2-4\\"", "size": 16634913, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-12T10:49:57.000Z", "contentLength": 16634913, "httpStatusCode": 200}	e18809d5-01d8-45d1-9cab-fdae51a3454d	\N	{}	2
2c2a30d9-1199-471a-ba8f-1eb3825d22a6	geo-mapping	uploads/1754901147613-Screenshot-2025-08-07-at-11.34.51-AM.png	\N	2025-08-11 08:32:27.932666+00	2025-08-11 08:32:27.932666+00	2025-08-11 08:32:27.932666+00	{"eTag": "\\"337171c843807b62a0e8694cdfecd985\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T08:32:28.000Z", "contentLength": 51, "httpStatusCode": 200}	1c383e9e-21db-4e44-8150-ecbe4db64dbd	\N	{}	2
241fab5c-9724-4d3a-9a84-136d78386e15	geo-mapping	uploads/1756826274165-537857036_1894232341125499_8516411709057571220_n.jpg	\N	2025-09-02 15:17:55.202869+00	2025-09-02 15:17:55.202869+00	2025-09-02 15:17:55.202869+00	{"eTag": "\\"8f656857ccbab874e1b64c3e2ed52a06\\"", "size": 171884, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-09-02T15:17:56.000Z", "contentLength": 171884, "httpStatusCode": 200}	995509cb-c048-495d-b001-0cfa1cd0a9b1	\N	{}	2
4aff1b12-7eff-4261-9d46-500795e4da50	geo-mapping	uploads/1754901147613-Screenshot-2025-08-07-at-11.39.28-AM.png	\N	2025-08-11 08:32:28.023345+00	2025-08-11 08:32:28.023345+00	2025-08-11 08:32:28.023345+00	{"eTag": "\\"98194fbf68730e93bd0b7680a434cb12\\"", "size": 51, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T08:32:28.000Z", "contentLength": 51, "httpStatusCode": 200}	83bdb450-9fd4-4a00-9e1f-1e9c0bf9bb5d	\N	{}	2
31f57e6d-9741-4033-a408-9be2fa28875a	geo-mapping	uploads/1754926579971-favicon-removebg-preview.png	\N	2025-08-11 15:36:20.578977+00	2025-08-11 15:36:20.578977+00	2025-08-11 15:36:20.578977+00	{"eTag": "\\"fc915c1cb95940cf323e9b90b41d38e6\\"", "size": 39, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:36:21.000Z", "contentLength": 39, "httpStatusCode": 200}	0b1de563-8b02-419c-9fd5-09bec47210e4	\N	{}	2
a35f2b86-17e6-4850-8724-319a27eb18ad	geo-mapping	uploads/1754926579970-aerial-view-rice-terrace-ban-pa-bong-piang-chiang-mai-thailand.jpg	\N	2025-08-11 15:36:20.618371+00	2025-08-11 15:36:20.618371+00	2025-08-11 15:36:20.618371+00	{"eTag": "\\"f78bbcc2d42de8da53a0db7e91f47cc4\\"", "size": 77, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:36:21.000Z", "contentLength": 77, "httpStatusCode": 200}	4c7eb683-d900-49f1-b4b3-aae4492b574b	\N	{}	2
c46d469a-8344-4a01-b4d4-a5b4b9d2ea3c	geo-mapping	uploads/1754926579971-ChatGPT-Image-Jun-13-2025-04_25_18-PM.png	\N	2025-08-11 15:36:20.627013+00	2025-08-11 15:36:20.627013+00	2025-08-11 15:36:20.627013+00	{"eTag": "\\"f61f7ced085f8253efb6186d52228613\\"", "size": 52, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:36:21.000Z", "contentLength": 52, "httpStatusCode": 200}	ce897324-8895-4dea-aa4c-0c10f28547c8	\N	{}	2
5bc06562-ff41-499f-b0c8-5f996b418ef2	geo-mapping	uploads/1754926579971-452750072_995369289044849_4320460078136743717_n.png	\N	2025-08-11 15:36:20.772679+00	2025-08-11 15:36:20.772679+00	2025-08-11 15:36:20.772679+00	{"eTag": "\\"66b608c6787ecff07f4dabd7dd3ec9f7\\"", "size": 62, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:36:21.000Z", "contentLength": 62, "httpStatusCode": 200}	81bf0094-a54a-4765-9c1d-74a119150d35	\N	{}	2
fd7a8cf4-6d02-4817-9606-92deeff4377c	geo-mapping	uploads/1754926589360-favicon-removebg-preview.png	\N	2025-08-11 15:36:29.591694+00	2025-08-11 15:36:29.591694+00	2025-08-11 15:36:29.591694+00	{"eTag": "\\"fc915c1cb95940cf323e9b90b41d38e6\\"", "size": 39, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:36:30.000Z", "contentLength": 39, "httpStatusCode": 200}	26292004-ef73-4d43-9300-a5a7e243f96f	\N	{}	2
7eb550f6-4adb-4d94-86e1-39d9af3e0b61	geo-mapping	uploads/1754926589360-aerial-view-rice-terrace-ban-pa-bong-piang-chiang-mai-thailand.jpg	\N	2025-08-11 15:36:29.619086+00	2025-08-11 15:36:29.619086+00	2025-08-11 15:36:29.619086+00	{"eTag": "\\"f78bbcc2d42de8da53a0db7e91f47cc4\\"", "size": 77, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:36:30.000Z", "contentLength": 77, "httpStatusCode": 200}	e07573e1-4f1b-4376-ad8c-72c26eae8401	\N	{}	2
5a88655e-46e0-4bb4-b94f-0e64a5a54bdb	geo-mapping	uploads/1754926589360-ChatGPT-Image-Jun-13-2025-04_25_18-PM.png	\N	2025-08-11 15:36:29.675808+00	2025-08-11 15:36:29.675808+00	2025-08-11 15:36:29.675808+00	{"eTag": "\\"f61f7ced085f8253efb6186d52228613\\"", "size": 52, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:36:30.000Z", "contentLength": 52, "httpStatusCode": 200}	b80c489e-eba4-4b5d-992c-512e2e2a1244	\N	{}	2
25516f6e-775a-41da-b49c-fe831d0430d0	geo-mapping	uploads/1754926711473-AvatarMaker.png	\N	2025-08-11 15:38:31.838346+00	2025-08-11 15:38:31.838346+00	2025-08-11 15:38:31.838346+00	{"eTag": "\\"518a4f9fa8261a991e28d1a0b9102dae\\"", "size": 26232, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:38:32.000Z", "contentLength": 26232, "httpStatusCode": 200}	428036b2-71c4-4f3a-a411-ab4caeb3d3c5	\N	{}	2
7061e6ac-d089-4093-9cc1-4dd7d9e09cfc	geo-mapping	uploads/1755139686926-aerial-view-rice-terrace-ban-pa-bong-piang-chiang-mai-thailand.jpg	\N	2025-08-14 02:48:10.639291+00	2025-08-14 02:48:10.639291+00	2025-08-14 02:48:10.639291+00	{"eTag": "\\"add6fe844691f00d7cfecfabe2dde0d2-4\\"", "size": 16634913, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-14T02:48:11.000Z", "contentLength": 16634913, "httpStatusCode": 200}	bef41e41-f0ae-49a0-ab11-282455963c79	\N	{}	2
437c1889-6c47-4e80-ba70-4b5f144ab36d	geo-mapping	uploads/1754926978361-AvatarMaker-1.svg	\N	2025-08-11 15:42:59.384531+00	2025-08-11 15:42:59.384531+00	2025-08-11 15:42:59.384531+00	{"eTag": "\\"1a38a72200695c44e1251cbc9ba1d771\\"", "size": 32285, "mimetype": "image/svg+xml", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:43:00.000Z", "contentLength": 32285, "httpStatusCode": 200}	e8d8b03b-18e0-4ace-a50c-8f2431823a56	\N	{}	2
9c0012dc-4caf-4027-9c78-0a95ea23b579	geo-mapping	uploads/1756826283635-537857036_1894232341125499_8516411709057571220_n.jpg	\N	2025-09-02 15:18:04.075462+00	2025-09-02 15:18:04.075462+00	2025-09-02 15:18:04.075462+00	{"eTag": "\\"8f656857ccbab874e1b64c3e2ed52a06\\"", "size": 171884, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-09-02T15:18:05.000Z", "contentLength": 171884, "httpStatusCode": 200}	22ee947a-2ca6-4750-bf2f-e46a4bf1384b	\N	{}	2
b357f18f-12fb-4a35-8eec-e09b1460d6a6	geo-mapping	uploads/1756826283635-537259809_1286501440153836_7531963170668484001_n.jpg	\N	2025-09-02 15:18:04.114852+00	2025-09-02 15:18:04.114852+00	2025-09-02 15:18:04.114852+00	{"eTag": "\\"57d69b624d5293bccb2d4aa97c208fd5\\"", "size": 133773, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-09-02T15:18:04.000Z", "contentLength": 133773, "httpStatusCode": 200}	84f67c36-87eb-43fb-8c56-9f9428c9e9d7	\N	{}	2
c542dede-dbe4-47b8-b57b-a7c00496e5c3	geo-mapping	uploads/1756826283635-534883154_1039117631433158_6231278270513614217_n.jpg	\N	2025-09-02 15:18:04.224153+00	2025-09-02 15:18:04.224153+00	2025-09-02 15:18:04.224153+00	{"eTag": "\\"fd4dccf22445a2b3794275082f8d515a\\"", "size": 157797, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-09-02T15:18:05.000Z", "contentLength": 157797, "httpStatusCode": 200}	5eeec490-954e-48fd-bde9-651c55e4b079	\N	{}	2
f0c9e7f9-9313-4773-b787-cb007e85e2b5	geo-mapping	uploads/1758723946726-rice-field.jpg	\N	2025-09-24 14:25:47.534487+00	2025-09-24 14:25:47.534487+00	2025-09-24 14:25:47.534487+00	{"eTag": "\\"c818606c192a162d8a4b734c2ee6a7de\\"", "size": 76516, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-09-24T14:25:48.000Z", "contentLength": 76516, "httpStatusCode": 200}	aa3c5edc-e7d0-42bc-8f59-2c73cfd49515	\N	{}	2
0784470b-de0c-46ba-a1cb-8c94840b2d0b	geo-mapping	uploads/1760338252698-land.jpg	\N	2025-10-13 06:50:45.922469+00	2025-10-13 06:50:45.922469+00	2025-10-13 06:50:45.922469+00	{"eTag": "\\"1b96cd29ff9bb4e9993a3a50e68f3848\\"", "size": 182058, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-10-13T06:50:46.000Z", "contentLength": 182058, "httpStatusCode": 200}	f290828d-5220-4931-a740-f96455039d79	\N	{}	2
6608be10-928a-449e-896b-838d92d2f0b1	geo-mapping	uploads/1754926589360-452750072_995369289044849_4320460078136743717_n.png	\N	2025-08-11 15:36:29.679324+00	2025-08-11 15:36:29.679324+00	2025-08-11 15:36:29.679324+00	{"eTag": "\\"66b608c6787ecff07f4dabd7dd3ec9f7\\"", "size": 62, "mimetype": "application/json, text/plain;charset=UTF-8", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:36:30.000Z", "contentLength": 62, "httpStatusCode": 200}	c405a0ce-23ee-41f9-a578-754959448027	\N	{}	2
d1584fd4-cec3-4ad1-9918-c3183dd1ae4a	geo-mapping	uploads/1755350669120-land.jpg	\N	2025-08-16 13:24:29.819634+00	2025-08-16 13:24:29.819634+00	2025-08-16 13:24:29.819634+00	{"eTag": "\\"1b96cd29ff9bb4e9993a3a50e68f3848\\"", "size": 182058, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-16T13:24:30.000Z", "contentLength": 182058, "httpStatusCode": 200}	a48b7b56-ea1d-48c6-8d02-73f8b110f9e6	\N	{}	2
a7e0bf48-6f08-4867-99c8-4054b359fd2c	geo-mapping	uploads/1754926711473-AvatarMaker.svg	\N	2025-08-11 15:38:31.743432+00	2025-08-11 15:38:31.743432+00	2025-08-11 15:38:31.743432+00	{"eTag": "\\"dada5b58b9deb04d4815d97b02ccf331\\"", "size": 42123, "mimetype": "image/svg+xml", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:38:32.000Z", "contentLength": 42123, "httpStatusCode": 200}	fea4826c-013c-4d08-bebf-9e005d0585e8	\N	{}	2
42a6b684-419d-468a-958a-11f420a30a53	geo-mapping	uploads/1754926711472-AvatarMaker (2).svg	\N	2025-08-11 15:38:31.841773+00	2025-08-11 15:38:31.841773+00	2025-08-11 15:38:31.841773+00	{"eTag": "\\"7a2c7344c6fbff64974e895307955433\\"", "size": 38817, "mimetype": "image/svg+xml", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:38:32.000Z", "contentLength": 38817, "httpStatusCode": 200}	23d5f73c-86b6-4ca5-996f-5c5ea76a96c9	\N	{}	2
a5489e77-a772-43c1-93fa-da483b0dff45	geo-mapping	uploads/1754926978362-AvatarMaker.svg	\N	2025-08-11 15:42:59.39197+00	2025-08-11 15:42:59.39197+00	2025-08-11 15:42:59.39197+00	{"eTag": "\\"dada5b58b9deb04d4815d97b02ccf331\\"", "size": 42123, "mimetype": "image/svg+xml", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:43:00.000Z", "contentLength": 42123, "httpStatusCode": 200}	18407d22-b94f-4968-b266-f2765784826b	\N	{}	2
c47ef2f2-896e-4ebe-990a-a9374a713aa3	geo-mapping	uploads/1754926978360-aerial-view-rice-terrace-ban-pa-bong-piang-chiang-mai-thailand.jpg	\N	2025-08-11 15:43:01.934294+00	2025-08-11 15:43:01.934294+00	2025-08-11 15:43:01.934294+00	{"eTag": "\\"add6fe844691f00d7cfecfabe2dde0d2-4\\"", "size": 16634913, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:43:01.000Z", "contentLength": 16634913, "httpStatusCode": 200}	ec90b56c-6382-4cad-8af7-ea23f44f605b	\N	{}	2
1a55228a-44ea-429a-9a86-46f2653f0641	geo-mapping	uploads/1754926986778-AvatarMaker-1.svg	\N	2025-08-11 15:43:07.004297+00	2025-08-11 15:43:07.004297+00	2025-08-11 15:43:07.004297+00	{"eTag": "\\"1a38a72200695c44e1251cbc9ba1d771\\"", "size": 32285, "mimetype": "image/svg+xml", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:43:07.000Z", "contentLength": 32285, "httpStatusCode": 200}	1788a0ad-c63e-429e-936c-9aac2a76853f	\N	{}	2
2535b121-37cf-44ea-93ca-f83c3dc0482a	geo-mapping	uploads/1754926986778-AvatarMaker.svg	\N	2025-08-11 15:43:07.170828+00	2025-08-11 15:43:07.170828+00	2025-08-11 15:43:07.170828+00	{"eTag": "\\"dada5b58b9deb04d4815d97b02ccf331\\"", "size": 42123, "mimetype": "image/svg+xml", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:43:08.000Z", "contentLength": 42123, "httpStatusCode": 200}	f286b09a-274f-4843-a68d-250178db9c56	\N	{}	2
c730a793-0296-4b5f-bdd5-cc36a930b3da	geo-mapping	uploads/1754926986778-aerial-view-rice-terrace-ban-pa-bong-piang-chiang-mai-thailand.jpg	\N	2025-08-11 15:43:09.034796+00	2025-08-11 15:43:09.034796+00	2025-08-11 15:43:09.034796+00	{"eTag": "\\"add6fe844691f00d7cfecfabe2dde0d2-4\\"", "size": 16634913, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T15:43:09.000Z", "contentLength": 16634913, "httpStatusCode": 200}	b1514bf4-0df5-4f6e-ab01-460322591ab2	\N	{}	2
94cad2da-986a-4f67-a4ce-190a07de23bc	geo-mapping	uploads/1754929781725-bg.png	\N	2025-08-11 16:29:47.188273+00	2025-08-11 16:29:47.190684+00	2025-08-11 16:29:47.188273+00	{"eTag": "\\"cd9c3da1587940a33c8b651b0d45b569\\"", "size": 254248, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T16:29:48.000Z", "contentLength": 254248, "httpStatusCode": 200}	7abcfacb-09e2-44d8-a61f-14ed514845e5	\N	{}	2
b370bb4f-8c48-4a1c-8a89-8bb1a9d4db33	geo-mapping	uploads/1754929781726-rice-bg.jpg	\N	2025-08-11 16:29:50.673613+00	2025-08-11 16:29:50.673613+00	2025-08-11 16:29:50.673613+00	{"eTag": "\\"add6fe844691f00d7cfecfabe2dde0d2-4\\"", "size": 16634913, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T16:29:50.000Z", "contentLength": 16634913, "httpStatusCode": 200}	3dee2188-6c99-4b87-9063-59f94a4247ce	\N	{}	2
ab0be8f9-937d-4c35-8f28-cb8351fc2226	geo-mapping	uploads/1754929781725-aerial-view-rice-terrace-ban-pa-bong-piang-chiang-mai-thailand.jpg	\N	2025-08-11 16:29:50.711375+00	2025-08-11 16:29:50.711375+00	2025-08-11 16:29:50.711375+00	{"eTag": "\\"add6fe844691f00d7cfecfabe2dde0d2-4\\"", "size": 16634913, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T16:29:50.000Z", "contentLength": 16634913, "httpStatusCode": 200}	775a82bd-e697-4746-9b68-7eab2b4f879d	\N	{}	2
8799724f-dc5f-4c3c-a4ac-40ff1f86c65c	geo-mapping	uploads/1754929791769-bg.png	\N	2025-08-11 16:29:56.454813+00	2025-08-11 16:29:56.487997+00	2025-08-11 16:29:56.454813+00	{"eTag": "\\"cd9c3da1587940a33c8b651b0d45b569\\"", "size": 254248, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T16:29:57.000Z", "contentLength": 254248, "httpStatusCode": 200}	569b14a2-d58f-4847-8924-88602e418243	\N	{}	2
2c8627c7-6561-4976-989a-bd4e1351b02e	geo-mapping	uploads/1754929791769-aerial-view-rice-terrace-ban-pa-bong-piang-chiang-mai-thailand.jpg	\N	2025-08-11 16:29:59.965576+00	2025-08-11 16:29:59.965576+00	2025-08-11 16:29:59.965576+00	{"eTag": "\\"add6fe844691f00d7cfecfabe2dde0d2-4\\"", "size": 16634913, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T16:30:00.000Z", "contentLength": 16634913, "httpStatusCode": 200}	679333c5-d149-4081-8d62-4dc2a8127c35	\N	{}	2
526c01cf-0db6-4800-a6c2-01571d9b7fe7	geo-mapping	uploads/1754929791769-rice-bg.jpg	\N	2025-08-11 16:30:00.648663+00	2025-08-11 16:30:00.648663+00	2025-08-11 16:30:00.648663+00	{"eTag": "\\"add6fe844691f00d7cfecfabe2dde0d2-4\\"", "size": 16634913, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T16:30:00.000Z", "contentLength": 16634913, "httpStatusCode": 200}	e0dd9144-a541-453c-985c-da4f18492e30	\N	{}	2
\.


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.prefixes (bucket_id, name, created_at, updated_at) FROM stdin;
geo-mapping	uploads	2025-08-11 01:15:11.731402+00	2025-08-11 01:15:11.731402+00
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: -
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: -
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: CropDistribution_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."CropDistribution_id_seq"', 22, true);


--
-- Name: DistributionBatch_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."DistributionBatch_id_seq"', 37, true);


--
-- Name: Farm_index_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Farm_index_seq"', 25, true);


--
-- Name: FertilizerDistribution_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."FertilizerDistribution_id_seq"', 1, true);


--
-- Name: News_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."News_id_seq"', 3, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: -
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

