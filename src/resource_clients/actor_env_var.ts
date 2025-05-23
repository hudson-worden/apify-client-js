import ow from 'ow';

import type { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
import type { ActorEnvironmentVariable } from './actor_version';

export class ActorEnvVarClient extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions) {
        super({
            resourcePath: 'env-vars',
            ...options,
        });
    }

    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-object/get-environment-variable
     */
    async get(): Promise<ActorEnvironmentVariable | undefined> {
        return this._get();
    }

    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-object/update-environment-variable
     */
    async update(actorEnvVar: ActorEnvironmentVariable): Promise<ActorEnvironmentVariable> {
        ow(actorEnvVar, ow.object);
        return this._update(actorEnvVar);
    }

    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-object/delete-environment-variable
     */
    async delete(): Promise<void> {
        return this._delete();
    }
}
