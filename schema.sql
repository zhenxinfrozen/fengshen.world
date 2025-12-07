DROP TABLE IF EXISTS guestbook;
CREATE TABLE guestbook (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  content TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO guestbook (name, content) VALUES ('姜子牙', '愿天下太平，百姓安居乐业。');