-- Run this inside Supabase SQL Editor if you connect a persistent PostgreSQL database
create table public.profiles (
  id uuid references auth.users primary key,
  username text unique not null,
  full_name text not null,
  stream text not null default 'Engineering',
  xp integer not null default 0,
  level integer not null default 1,
  streak integer not null default 1,
  show_on_leaderboard boolean default true,
  created_at timestamptz default now()
);

create table public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  subject text not null,
  topic text not null,
  duration numeric not null,
  difficulty text not null,
  priority text not null,
  completed boolean default false,
  created_at timestamptz default now()
);

create table public.peer_teaching_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete cascade,
  stream text not null,
  expertise text not null,
  bio text not null,
  schedule text not null,
  upvotes integer default 0,
  created_at timestamptz default now()
);

create table public.misbehavior_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.profiles(id) on delete set null,
  offender_username text not null,
  reason text not null,
  proof_url text not null,
  status text default 'Under Review',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.study_sessions enable row level security;