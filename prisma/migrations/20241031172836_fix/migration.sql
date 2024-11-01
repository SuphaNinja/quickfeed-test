-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deadline" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "priority" TEXT NOT NULL,
    "assigneeId" TEXT NOT NULL,
    "assignorId" TEXT NOT NULL,
    "projectRoomId" TEXT NOT NULL,
    CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "ProjectRoomUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "ProjectRoomUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_projectRoomId_fkey" FOREIGN KEY ("projectRoomId") REFERENCES "ProjectRoom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
