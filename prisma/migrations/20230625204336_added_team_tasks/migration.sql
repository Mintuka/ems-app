-- CreateTable
CREATE TABLE "TeamTask" (
    "id" TEXT NOT NULL,
    "teamID" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "task" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeamTask" ADD CONSTRAINT "TeamTask_teamID_fkey" FOREIGN KEY ("teamID") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
