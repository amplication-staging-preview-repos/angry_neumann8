import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { grpcClientOptions } from "./grpc.client.options";
import supertokens from "supertokens-node";
import { generateSupertokensOptions } from "./auth/supertokens/generateSupertokensOptions";
import { STAuthFilter } from "./auth/supertokens/auth.filter";
import { MicroserviceOptions } from "@nestjs/microservices";

export async function connectMicroservices(app: INestApplication) {
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  app.enableCors({
    origin: [generateSupertokensOptions(configService).appInfo.websiteDomain],
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true
  });

  app.useGlobalFilters(new STAuthFilter());
}
