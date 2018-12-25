import { getMetadataArgsStorage, createExpressServer } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { UserController } from "./controllers/UserController";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { MetadataStorage, getFromContainer } from "class-validator";

createExpressServer({
  controllers: [UserController]
});

const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas;
const schemas = validationMetadatasToSchemas(metadatas);
const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage);

spec.components.schemas = schemas;
console.log(JSON.stringify(spec));