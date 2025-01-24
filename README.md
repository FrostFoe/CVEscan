# Cloud Function For AI Plugin

## Introduction

This is a template that provides a clear and concise programming paradigm for cloud functions and can be quickly published as an AI Plugin, such as [actions in GPTs](https://platform.openai.com/docs/actions/introduction).

Cloud functions are part of the serverless architecture paradigm, which allows developers to build and run applications and services without having to manage infrastructure. This paradigm enables developers to focus more on their application logic and less on server management, provisioning, and scaling.

We also provide some easy-to-use capabilities for AI Plugin based on cloud function.

Let’s first take a look at the common process of developing an AI Plugin:

1. Choose a programming language and framework, write code, and test it locally.
2. Choose a cloud service provider and deploy the code.
3. Write OpenAPI Schema description for the code. The schema will be used to create and register the code as an AI Plugin.

As above, the whole process is very heavy. Can we only focus on certain key steps?

- To write the necessary function logic only
- To help automatically generate OpenAPI Schema without having to write it manually

That's what this template does.

## Write a cloud function

To write a cloud function, you need to create a new file under the **api** directory, and the file should export the `handler` function, accepting the `Args` object as the parameter, and return the `Output` object.

Then you need to define the `Input` and `Output` interfaces, which help LLM to understand how to call the cloud function, especially the JSDoc comment in the interface.

The definitions of the `Input` and `Output` interfaces and the JSDoc comment will be parsed as an OpenAPI Schema and be used to register the definition of the AI plugin interface. They will also be used by the API Test plugin to generate test data.

```ts
// api/sayhi/hello.ts
import { Args } from '@/runtime';

export interface Input {
  // The name of the user
  name?: string;
}

export interface Output {
  // Reply to greet the user
  message: string;
}

/**
 * Say hello to the user when they introduce themselves
 */
export async function handler({ input, logger }: Args<Input>): Promise<Output> {
  const name = input.name || 'world';

  logger.info(`user name is ${name}`);

  return {
    message: `hello ${name}`
  };
}
```

> For a more complex showcase, you can refer to the **/api/todo** directory, which primarily provides API services for the addition, deletion, modification, and query of todo. It also demonstrates how to use the storage service.

## Manage dependencies

[PNPM](https://pnpm.io/) is recommended for managing dependencies.

```
// install a dependency, for example: axios
pnpm add axios
```

## OpenAPI Schema

Writing an OpenAPI Schema is time-consuming. So MarsCode has provided schema generation tools, which can analyze the interface type descriptions of `Input` and `Output` and Comment from the code, and actively generate the corresponding Schema description.

When building and deploying, this stage will genrate `metadata.json` file and then the file will be parsed to the final OpenAPI Schema.

![gui-metadata](https://lf-cdn.marscode.com/obj/eden-sg/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/6a7bb0d45e3826780749b19626dc67986c720e60/images/cloud_function_baas_nodejs/metadata.jpeg)

## API Test

MarsCode provides the API Test tool to help you test APIs.

![gui-apitest](https://lf-cdn.marscode.com/obj/eden-sg/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/6a7bb0d45e3826780749b19626dc67986c720e60/images/cloud_function_baas_nodejs/gui_apitest.png)

- Click the **API Test** button on the top to open the API Test panel. The test input data is automatically generated based on the JSON Schema file.
- Click the **Send** button to send the request, and the response will be displayed in the output panel.

## Deployment

MarsCode provides integrated cloud function hosting capabilities that you can use to quickly deploy cloud functions by clicking the **Deploy** button at the top.

![gui-deployments](https://lf-cdn.marscode.com/obj/eden-sg/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/6a7bb0d45e3826780749b19626dc67986c720e60/images/cloud_function_baas_nodejs/gui_deployments.png)

After deployment, you can get deployment details from the **Service Details** window.

![gui-servicedetail](https://lf-cdn.marscode.com/obj/eden-sg/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/6a7bb0d45e3826780749b19626dc67986c720e60/images/cloud_function_baas_nodejs/gui_servicedetail.png)

You can copy the schema, then paste it to [ChatGPT](https://chat.openai.com/gpts) to register an GPTs action.

## Register as AI Plugin

1. Go to [ChatGPT](https://chat.openai.com/gpts)

2. Click the **Create** button.

   ![create gpts action](https://lf-cdn.marscode.com/obj/eden-sg/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/6a7bb0d45e3826780749b19626dc67986c720e60/images/cloud_function_baas_nodejs/gpt_create_action.jpeg)

3. Fill in action information.

   ![gpts action info](https://lf-cdn.marscode.com/obj/eden-sg/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/6a7bb0d45e3826780749b19626dc67986c720e60/images/cloud_function_baas_nodejs/gpt_action_info.jpeg)

4. Add actions.

   - Authentication

     ![gpt_authentication](https://lf-cdn.marscode.com/obj/eden-sg/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/6a7bb0d45e3826780749b19626dc67986c720e60/images/cloud_function_baas_nodejs/gpt_authentication.jpeg)

     - Authentication type: fill in **API key**.
     - API key: value can be obtained from the **Service Details** window, click **Token** to copy it.
     - Auth type: fill in **Bearer**.

   - Schema

     - Obtain from the **Service Details** window, click **Schema** to copy it.

       ![gpt action schema copy](https://lf-cdn.marscode.com/obj/eden-sg/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/6a7bb0d45e3826780749b19626dc67986c720e60/images/cloud_function_baas_nodejs/gpt_action_schema_copy.jpeg)

       ![gpt action schema](https://lf-cdn.marscode.com/obj/eden-sg/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/6a7bb0d45e3826780749b19626dc67986c720e60/images/cloud_function_baas_nodejs/gpt_action_schema.jpeg)

     - Import from URL.

       ![gpt schema url copy](https://lf-cdn.marscode.com/obj/eden-sg/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/6a7bb0d45e3826780749b19626dc67986c720e60/images/cloud_function_baas_nodejs/gpt_schema_url_copy.jpeg)

       ![gpt schema url](https://lf-cdn.marscode.com/obj/eden-sg/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/6a7bb0d45e3826780749b19626dc67986c720e60/images/cloud_function_baas_nodejs/gpt_schema_url.jpeg)

5. Click the **Save** button to save the action.

## Help

If you need help, you might be able to find an answer in our [docs](https://docs.marscode.com/). Feel free to report bugs and give us feedback [here](https://discord.gg/qtVMXEDbRw).
