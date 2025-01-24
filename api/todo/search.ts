import { baas } from '@marscode/baas-sdk';
import { Args } from '@/runtime';
import { TODOListKey } from './consts';
import { TODO } from './types';

export interface Input {
  // state of todo
  state?: number;
}

export interface Output {
  // status code of response
  code: number;

  // this is the data of response
  data: Array<TODO>;

  // this is the message of response
  message: string;
}

/**
 * Search todos
 * @summary Each file needs to export a function named `handler`. This function is the entrance to the API.
 * @param {Object} args - parameters of the entry function
 * @param {Object} args.logger - logger instance used to print logs, injected by runtime
 * @param {Object} args.input - parameters of http api, which can be parameters passed in query/body mode
 * @returns {*} function response data
 */
export async function handler({ input, logger }: Args<Input>): Promise<Output> {
  const { state } = input;
  const result = await baas.redis.hgetall(TODOListKey);
  const data = Object.values(result ?? {}).map((todo: string) => JSON.parse(todo));
  // Filter todo items based on status field
  if (!state) {
    // Return the body of api response
    return {
      code: 0,
      message: 'ok',
      data
    };
  }

  // Return the body of api response
  return {
    code: 0,
    message: 'ok',
    data: data.filter((todo: TODO) => todo.state === state)
  };
}
