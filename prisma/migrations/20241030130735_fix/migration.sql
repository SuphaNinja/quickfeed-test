-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Feedback_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Feedback" ("createdAt", "id", "message", "name", "projectId", "rating", "updatedAt") SELECT "createdAt", "id", "message", "name", "projectId", "rating", "updatedAt" FROM "Feedback";
DROP TABLE "Feedback";
ALTER TABLE "new_Feedback" RENAME TO "Feedback";
CREATE INDEX "Feedback_projectId_idx" ON "Feedback"("projectId");
CREATE TABLE "new_ProjectRoom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inviteUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProjectRoom_id_fkey" FOREIGN KEY ("id") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProjectRoom" ("createdAt", "id", "inviteUrl", "updatedAt") SELECT "createdAt", "id", "inviteUrl", "updatedAt" FROM "ProjectRoom";
DROP TABLE "ProjectRoom";
ALTER TABLE "new_ProjectRoom" RENAME TO "ProjectRoom";
CREATE UNIQUE INDEX "ProjectRoom_inviteUrl_key" ON "ProjectRoom"("inviteUrl");
CREATE TABLE "new_ProjectRoomAdmin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "projectRoomId" TEXT NOT NULL,
    CONSTRAINT "ProjectRoomAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProjectRoomAdmin_projectRoomId_fkey" FOREIGN KEY ("projectRoomId") REFERENCES "ProjectRoom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProjectRoomAdmin" ("id", "projectRoomId", "userId") SELECT "id", "projectRoomId", "userId" FROM "ProjectRoomAdmin";
DROP TABLE "ProjectRoomAdmin";
ALTER TABLE "new_ProjectRoomAdmin" RENAME TO "ProjectRoomAdmin";
CREATE UNIQUE INDEX "ProjectRoomAdmin_userId_projectRoomId_key" ON "ProjectRoomAdmin"("userId", "projectRoomId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
