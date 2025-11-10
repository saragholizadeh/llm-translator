import { Migration } from '@mikro-orm/migrations';

export class Migration20251110070118 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "llmrequest" alter column "response_status" drop default;`);
    this.addSql(`alter table "llmrequest" alter column "response_status" type text using ("response_status"::text);`);
    this.addSql(`alter table "llmrequest" add constraint "llmrequest_response_status_check" check("response_status" in ('pending', 'in_progress', 'completed', 'failed'));`);

    this.addSql(`alter table "llmresponse" alter column "status" drop default;`);
    this.addSql(`alter table "llmresponse" alter column "status" type text using ("status"::text);`);
    this.addSql(`alter table "llmresponse" add constraint "llmresponse_status_check" check("status" in ('pending', 'in_progress', 'completed', 'failed'));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "llmrequest" drop constraint if exists "llmrequest_response_status_check";`);

    this.addSql(`alter table "llmresponse" drop constraint if exists "llmresponse_status_check";`);

    this.addSql(`alter table "llmrequest" alter column "response_status" type smallint using ("response_status"::smallint);`);
    this.addSql(`alter table "llmrequest" alter column "response_status" set default 'pending';`);

    this.addSql(`alter table "llmresponse" alter column "status" type smallint using ("status"::smallint);`);
    this.addSql(`alter table "llmresponse" alter column "status" set default 'pending';`);
  }

}
