import type { Account } from "../data";
import { db } from "../drizzle";
import { AccountSchema } from "../schema";

class AccountRepo {
  async getAccounts(): Promise<Account[]> {
    const data = await db.select().from(AccountSchema);

    return data.map(
      (account) =>
        ({
          ...account,
          stage: account.stage as Account["stage"],
          id: account.id.toString(),
        } satisfies Account)
    );
  }
}

export const AccountRepository = new AccountRepo();
