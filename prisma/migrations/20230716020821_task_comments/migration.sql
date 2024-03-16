-- CreateTable
CREATE TABLE "TaskComments" (
    "id" TEXT NOT NULL,
    "taskID" TEXT NOT NULL,
    "employeeID" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskComments" ADD CONSTRAINT "TaskComments_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "TeamTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskComments" ADD CONSTRAINT "TaskComments_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
