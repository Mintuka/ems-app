-- DropForeignKey
ALTER TABLE "TeamTask" DROP CONSTRAINT "TeamTask_teamID_fkey";

-- AddForeignKey
ALTER TABLE "TeamTask" ADD CONSTRAINT "TeamTask_teamID_fkey" FOREIGN KEY ("teamID") REFERENCES "Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
