/*
  Warnings:

  - You are about to drop the `ProjectRoomAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectRoomToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProjectRoomAdmin";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProjectRoomToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ProjectRoomUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "projectRoomId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    CONSTRAINT "ProjectRoomUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProjectRoomUser_projectRoomId_fkey" FOREIGN KEY ("projectRoomId") REFERENCES "ProjectRoom" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectRoomUser_userId_projectRoomId_key" ON "ProjectRoomUser"("userId", "projectRoomId");
