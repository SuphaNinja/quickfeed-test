/*
  Warnings:

  - Added the required column `email` to the `ProjectRoomUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `ProjectRoomUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `ProjectRoomUser` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectRoomUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "projectRoomId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProjectRoomUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProjectRoomUser_projectRoomId_fkey" FOREIGN KEY ("projectRoomId") REFERENCES "ProjectRoom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProjectRoomUser" ("createdAt", "id", "projectRoomId", "role", "userId") SELECT "createdAt", "id", "projectRoomId", "role", "userId" FROM "ProjectRoomUser";
DROP TABLE "ProjectRoomUser";
ALTER TABLE "new_ProjectRoomUser" RENAME TO "ProjectRoomUser";
CREATE UNIQUE INDEX "ProjectRoomUser_userId_projectRoomId_key" ON "ProjectRoomUser"("userId", "projectRoomId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
