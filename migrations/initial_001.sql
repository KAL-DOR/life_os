CREATE TYPE transaction_type AS ENUM ('expense', 'earning');
CREATE TYPE status AS ENUM ('done', 'in progress', 'cancelled', 'late');
CREATE TYPE investment_type AS ENUM ('fixed', 'variable', 'crypto', 'stocks');

CREATE TABLE pinsAndUsers (
username text NOT NULL,
email text,
enc_pin text NOT NULL,
created_at timestamp,
updated_at timestamp,
user_id uuid NOT NULL,
PRIMARY KEY (user_id)
);
CREATE TABLE goals (
user_id uuid NOT NULL,
name text NOT NULL,
description text NOT NULL,
target_date timestamp NOT NULL,
created_at timestamp,
updated_at timestamp,
goal_id uuid NOT NULL,
PRIMARY KEY (goal_id),
FOREIGN KEY (user_id) REFERENCES pinsAndUsers(user_id)
);
CREATE TABLE milestones (
user_id uuid NOT NULL,
goal_id uuid NOT NULL,
name text,
status status NOT NULL,
created_at timestamp,
updated_at timestamp,
milestone_id uuid NOT NULL,
PRIMARY KEY (milestone_id),
FOREIGN KEY (user_id) REFERENCES pinsAndUsers(user_id),
FOREIGN KEY (goal_id) REFERENCES goals(goal_id)
);
CREATE TABLE bankAccounts (
user_id uuid NOT NULL,
institution text NOT NULL,
name text NOT NULL,
initial_balance bigint NOT NULL,
computed_balance bigint,
created_at timestamp,
updated_at timestamp,
bank_id uuid NOT NULL,
PRIMARY KEY (bank_id),
FOREIGN KEY (user_id) REFERENCES pinsAndUsers(user_id)
);
CREATE TABLE investments (
user_id uuid NOT NULL,
institution text NOT NULL,
name text NOT NULL,
type investment_type NOT NULL,
yield int NOT NULL,
initial_balance bigint NOT NULL,
computed_balance bigint,
created_at timestamp,
updated_at timestamp,
investment_id uuid NOT NULL,
PRIMARY KEY (investment_id),
FOREIGN KEY (user_id) REFERENCES pinsAndUsers(user_id)
);
CREATE TABLE transactions (
user_id uuid NOT NULL,
title text NOT NULL,
bank_id uuid NOT NULL,
amount bigint,
type transaction_type,
created_at timestamp,
updated_at timestamp,
transaction_id uuid NOT NULL,
PRIMARY KEY (transaction_id),
FOREIGN KEY (user_id) REFERENCES pinsAndUsers(user_id),
FOREIGN KEY (bank_id) REFERENCES bankAccounts(bank_id)
);
CREATE TABLE reminder (
user_id uuid NOT NULL,
title text NOT NULL,
target_date timestamp NOT NULL,
last_triggered timestamp,
is_progressive boolean,
created_at timestamp,
updated_at timestamp,
reminder_id uuid NOT NULL,
is_repeated boolean NOT NULL,
repeat_schedule text,
PRIMARY KEY (reminder_id),
FOREIGN KEY (user_id) REFERENCES pinsAndUsers(user_id),
 CHECK (NOT (is_progressive = true AND is_repeated = true))
);