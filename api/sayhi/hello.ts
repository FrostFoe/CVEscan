import { Args } from '@/runtime';

export interface Input {
  // name of user
  name?: string;
}

export interface Output {
  // reply to greet the user
  message: string;
}

/**
 * Say hello to the user when he introduces himself
 */
export async function handler({ input, logger }: Args<Input>): Promise<Output> {
  const name = input.name || 'world';

  logger.info(`user name is ${name}`);

  return {
    message: `hello ${name}`
  };
}
