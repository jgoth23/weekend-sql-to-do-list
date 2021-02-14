DROP TABLE "tasks";

CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR(1024),	
	"importance" VARCHAR(1024),
	"rank" INTEGER,
	"notes" VARCHAR(1024),
	"completed" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks"
    ("todo", "importance", "rank", "notes", "completed")
VALUES 
    ('do dishes', 'not very', '3' , 'do when convenient', 'FALSE'),
    ('homework', 'very', '1', 'start right away', 'TRUE'),
    ('feed the fish', 'very', '2', 'same time everyday', 'TRUE'),
    ('take out the trash', 'not very', '4', 'do when convenient', 'FALSE')

    
    
    