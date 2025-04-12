/*
  Warnings:

  - You are about to drop the column `shopId` on the `Settings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shop]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shop` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Settings_shop_fkey" FOREIGN KEY ("shop") REFERENCES "Session" ("shop") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Settings" ("createdAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "description", "id", "name", "updatedAt" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Session_shop_key" ON "Session"("shop");
