-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectRoom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inviteUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProjectRoom_id_fkey" FOREIGN KEY ("id") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProjectRoom" ("createdAt", "id", "inviteUrl", "updatedAt") SELECT "createdAt", "id", "inviteUrl", "updatedAt" FROM "ProjectRoom";
DROP TABLE "ProjectRoom";
ALTER TABLE "new_ProjectRoom" RENAME TO "ProjectRoom";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
