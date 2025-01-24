import { baas } from '@marscode/baas-sdk';
import { Args } from '@/runtime';
import { TODOListKey } from './consts';

export interface Input {
  // name of todo
  name: string;
}

export interface Data {
  [property: string]: any;
}
export interface Output {
  //  status code of response
  code: number;

  // this is the data of response
  data?: Data;

  // this is the message of response
  message: string;
}

/**
 * Delete a todo
 * @summary Each file needs to export a function named `handler`. This function is the entrance to the API.
 * @param {Object} args - parameters of the entry function
 * @param {Object} args.logger - logger instance used to print logs, injected by runtime
 * @param {Object} args.input - parameters of http api, which can be parameters passed in query/body mode
 * @returns {*} function response data
 */
export async function handler({ input, logger }: Args<Input>): Promise<Output> {
  const { name } = input;
  // Check if the todo name is provided
  if (!name) {
    return {
      code: 1001,
      message: 'input invalid,todo name is required',
      data: null
    };
  }

  // Log the todo name
  logger.info('todo name is %s', name);
  // Delete the todo from Redis
  await baas.redis.hdel(TODOListKey, name);

  // Return the body of api response
  return { code: 0, message: 'ok', data: null };
}
