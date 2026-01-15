# Database Fundamentals - Learning Resources

## Interactive (Start Here)

1. **SQLBolt** — https://sqlbolt.com/
   - Interactive SQL exercises in the browser
   - Covers JOINs, relationships, and queries
   - Estimated time: a few hours

2. **PostgreSQL Tutorial** — https://www.postgresqltutorial.com/
   - Practical, PostgreSQL-specific
   - Good sections on table relationships and foreign keys

## Foundational Concepts

3. **Database Normalization (1NF, 2NF, 3NF)**
   - Search: "database normalization 1NF 2NF 3NF"
   - Explains *why* we structure tables the way we do
   - Key concepts: avoid redundancy, atomic values, proper relationships
   - YouTube: CMU Database Course (excellent but dense)

4. **Entity-Relationship (ER) Diagrams**
   - Visual way to model data before writing SQL
   - Formalizes relationships between tables

## Reference

5. **PostgreSQL Official Docs** — https://www.postgresql.org/docs/current/
   - Dense but authoritative
   - Use when you need exact behavior

## Books (Optional)

6. **"Learning SQL" by Alan Beaulieu**
   - Beginner-friendly
   - Covers relational thinking well

---

## Key Concepts Learned

### One-to-Many Relationships
The "many" side holds the foreign key to the "one" side.

Example: One goal has many milestones
- `milestones` table has `goal_id` column (FK to goals)
- `goals` table does NOT need a `milestones_id` array

```sql
-- Get all milestones for a goal
SELECT * FROM milestones WHERE goal_id = 'some-goal-uuid';

-- Get goal with its milestones
SELECT g.*, m.*
FROM goals g
LEFT JOIN milestones m ON m.goal_id = g.goal_id
WHERE g.goal_id = 'some-goal-uuid';
```
