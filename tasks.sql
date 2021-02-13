DROP TABLE "tasks";

CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR(1024),	
	"importance" VARCHAR(1024),
	"rank" INTEGER,
	"notes" VARCHAR(1024)
);

INSERT INTO "tasks"
    ("todo", "importance", "rank", "notes")
VALUES 
    ('do dishes', 'not very', '3' , 'do when convenient'),
    ('homework', 'very', '1', 'start right away'),
    ('feed the fish', 'very', '2', 'same time everyday')
    
    