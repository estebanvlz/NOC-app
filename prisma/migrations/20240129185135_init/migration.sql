
BEGIN;
CREATE TYPE "SeverityLevel_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "LogModel" ALTER COLUMN "level" TYPE "SeverityLevel_new" USING ("level"::text::"SeverityLevel_new");
ALTER TYPE "SeverityLevel" RENAME TO "SeverityLevel_old";
ALTER TYPE "SeverityLevel_new" RENAME TO "SeverityLevel";
DROP TYPE "SeverityLevel_old";
COMMIT;
