import { baas } from '@marscode/baas-sdk';
import { Args } from '@/runtime';
import { TODOState } from './types';
import { TODOListKey } from './consts';

export interface Input {
  // name of todo
  name: string;
}
export interface Data {
  [property: string]: any;
}

export interface Output {
  // status code of response
  code: number;

  // this is the data of response
  data?: Data;

  // this is the message of response
  message: string;
}

/**
 * Create a todo
 * @summary Each file needs to export a function named `handler`. This function is the entrance to the API.
 * @param {Object} args - parameters of the entry function
 * @param {Object} args.logger - logger instance used to print logs, injected by runtime
 * @param {Object} args.input - parameters of http api, which can be parameters passed in query/body mode
 * @returns {*} function response data
 */
export async function handler({ input, logger }: Args<Input>): Promise<Output> {
  // check the parameters
  if (!input.name) {
    return {
      code: 1001,
      message: 'input invalid,todo name is required',
      data: null
    };
  }

  logger.info('todo name is %s', input.name);
  const result = await baas.redis.hset(
    TODOListKey,
    input.name,
    JSON.stringify({ name: input.name, state: TODOState.Active })
  );

  // Return the body of api response
  return result === 1
    ? { code: 0, message: 'ok', data: null }
    : {
        code: 1002,
        message: `todo '${input.name}' already exists`,
        data: null
      };
}
