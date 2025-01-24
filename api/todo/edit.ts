import { baas } from '@marscode/baas-sdk';
import { Args } from '@/runtime';
import { TODOState } from './types';
import { TODOListKey } from './consts';

export interface Input {
  // name of todo
  name: string;
  // state of todo,1: active, 2: completed,
  state: number;
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
 * Edit a todo
 * @summary Each file needs to export a function named `handler`. This function is the entrance to the API.
 * @param {Object} args - parameters of the entry function
 * @param {Object} args.logger - logger instance used to print logs, injected by runtime
 * @param {Object} args.input - parameters of http api, which can be parameters passed in query/body mode
 * @returns {*} function response data
 */
export async function handler({ input, logger }: Args<Input>): Promise<Output> {
  // Extract parameters
  const { name, state } = input;
  // Check if the parameters are valid
  if (!name) {
    return {
      code: 1001,
      message: 'input invalid,todo name is required',
      data: null
    };
  }

  if (!state) {
    return {
      code: 1001,
      message: 'input invalid,todo state is required',
      data: null
    };
  }

  if (state !== TODOState.Active && state !== TODOState.Completed) {
    return {
      code: 1001,
      message: 'input invalid,todo state value isinvalid',
      data: null
    };
  }
  //  Log the todo name
  logger.info('todo name is %s ,state is %s', name, state);
  await baas.redis.hset(TODOListKey, name, JSON.stringify({ name, state: state }));

  // Return the body of api response
  return { code: 0, message: 'ok', data: null };
}
