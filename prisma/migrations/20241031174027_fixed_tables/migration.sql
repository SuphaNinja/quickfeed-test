/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `projectId` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `projectRoomId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `ProjectRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `ProjectRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `ProjectRoom` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Project";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectRoomId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Feedback_projectRoomId_fkey" FOREIGN KEY ("projectRoomId") REFERENCES "ProjectRoom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Feedback" ("createdAt", "id", "isRead", "message", "name", "rating", "updatedAt") SELECT "createdAt", "id", "isRead", "message", "name", "rating", "updatedAt" FROM "Feedback";
DROP TABLE "Feedback";
ALTER TABLE "new_Feedback" RENAME TO "Feedback";
CREATE INDEX "Feedback_projectRoomId_idx" ON "Feedback"("projectRoomId");
CREATE TABLE "new_ProjectRoom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "inviteUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ProjectRoom" ("createdAt", "id", "inviteUrl", "updatedAt") SELECT "createdAt", "id", "inviteUrl", "updatedAt" FROM "ProjectRoom";
DROP TABLE "ProjectRoom";
ALTER TABLE "new_ProjectRoom" RENAME TO "ProjectRoom";
CREATE TABLE "new_ProjectRoomUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "projectRoomId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProjectRoomUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProjectRoomUser_projectRoomId_fkey" FOREIGN KEY ("projectRoomId") REFERENCES "ProjectRoom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProjectRoomUser" ("id", "projectRoomId", "role", "userId") SELECT "id", "projectRoomId", "role", "userId" FROM "ProjectRoomUser";
DROP TABLE "ProjectRoomUser";
ALTER TABLE "new_ProjectRoomUser" RENAME TO "ProjectRoomUser";
CREATE UNIQUE INDEX "ProjectRoomUser_userId_projectRoomId_key" ON "ProjectRoomUser"("userId", "projectRoomId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
