import { Module, forwardRef } from '@nestjs/common';
import { DocsController } from './docs.controller';
import { DocsService } from './docs.services';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user_information/user.module';
import { Docs, docsSchema } from './docs.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Docs.name, schema: docsSchema }]),
    forwardRef(() => UserModule),
  ],
  controllers: [DocsController],
  providers: [DocsService],
  exports: [DocsService],
})
export class DocsModule {}
