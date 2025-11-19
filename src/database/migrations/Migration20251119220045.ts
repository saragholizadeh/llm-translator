import { Migration } from '@mikro-orm/migrations';

export class Migration20251119220045 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "llmrequest" ("id" varchar(255) not null, "prompt_text" varchar(255) not null, "source_language" varchar(255) not null, "response_status" smallint not null, "background_task_status" smallint not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "llmrequest_pkey" primary key ("id"));`);

    this.addSql(`create table "llmresponse" ("id" varchar(255) not null, "request_id" varchar(255) not null, "language" varchar(255) not null, "result" text null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "llmresponse_pkey" primary key ("id"));`);

    this.addSql(`alter table "llmresponse" add constraint "llmresponse_request_id_foreign" foreign key ("request_id") references "llmrequest" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "llmresponse" drop constraint "llmresponse_request_id_foreign";`);

    this.addSql(`drop table if exists "llmrequest" cascade;`);

    this.addSql(`drop table if exists "llmresponse" cascade;`);
  }

}
