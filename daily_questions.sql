-- Delete all existing questions
DELETE FROM questions;

-- Insert new questions
INSERT INTO questions (question, option_a, option_b, option_c, option_d) 
VALUES 
('New question 1?', 'Option A', 'Option B', 'Option C', 'Option D'),
('New question 2?', 'Option A', 'Option B', 'Option C', 'Option D');
